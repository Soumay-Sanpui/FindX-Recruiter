import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { useJobDetails } from '../hooks/useJobs';
import DHeader from '../components/dashboard/DHeader';
import { Send, ArrowLeft, Search, User, Calendar, RefreshCw, Bell, MessageCircle } from 'lucide-react';
import api, { messageAPI } from '../services/api';

const Messages = () => {
    const { employer, isAuthenticated, setEmployer } = useEmployerStore();
    const navigate = useNavigate();
    const { jobId } = useParams();
    
    // Use React Query for job data
    const { data: jobDetails, isLoading: jobLoading, error: jobError } = useJobDetails(jobId);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [totalUnreadCount, setTotalUnreadCount] = useState(0);
    const [applicantUnreadCounts, setApplicantUnreadCounts] = useState({});
    const [unreadMessageIds, setUnreadMessageIds] = useState(new Set());
    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null);

    // Cache for conversations to avoid repeated API calls
    const [conversationCache, setConversationCache] = useState(new Map());
    const [lastDataFetch, setLastDataFetch] = useState(0);

    // Scroll to bottom of messages
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Load unread message counts for all applicants
    const loadUnreadCounts = useCallback(async () => {
        if (!employer?._id || applicants.length === 0) return;
        
        try {
            const response = await messageAPI.getUnreadMessageCount(employer._id);
            if (response.success) {
                setTotalUnreadCount(response.unreadCount || 0);
                
                // Load individual unread counts for each applicant
                const unreadCounts = {};
                for (const applicant of applicants) {
                    try {
                        const conversationResponse = await messageAPI.getConversationHistory(
                            employer._id, 
                            applicant.user._id, 
                            applicant.jobId || jobId
                        );
                        
                        if (conversationResponse.success) {
                            const unreadMessages = conversationResponse.messages?.filter(msg => 
                                !msg.read && msg.fromModel === 'User'
                            ) || [];
                            unreadCounts[applicant.user._id] = unreadMessages.length;
                        }
                    } catch (error) {
                        console.error(`Error loading unread count for applicant ${applicant.user._id}:`, error);
                    }
                }
                
                setApplicantUnreadCounts(unreadCounts);
            }
        } catch (error) {
            console.error('Error loading unread counts:', error);
        }
    }, [employer, applicants, jobId]);

    // Load unread counts when applicants change
    useEffect(() => {
        if (applicants.length > 0) {
            loadUnreadCounts();
        }
    }, [applicants, loadUnreadCounts]);

    // Optimized applicant filtering with useMemo
    const filteredApplicants = useMemo(() => {
        if (!searchTerm) return applicants;
        
        const term = searchTerm.toLowerCase();
        return applicants.filter(applicant => 
            applicant.user?.name?.toLowerCase().includes(term) ||
            applicant.user?.email?.toLowerCase().includes(term)
        );
    }, [applicants, searchTerm]);

    // Load conversation history with caching and unread detection
    const loadConversationHistory = useCallback(async (applicant, showLoading = true) => {
        if (!applicant || !employer) return;
        
        const cacheKey = `${employer._id}-${applicant.user._id}-${applicant.jobId || jobId}`;
        const now = Date.now();
        const CACHE_DURATION = 30 * 1000; // 30 seconds cache
        
        // Check cache first
        if (conversationCache.has(cacheKey)) {
            const cached = conversationCache.get(cacheKey);
            if (now - cached.timestamp < CACHE_DURATION) {
                setMessages(cached.messages);
                setUnreadMessageIds(cached.unreadMessageIds);
                setTimeout(scrollToBottom, 100);
                return;
            }
        }
        
        if (showLoading) setLoadingMessages(true);
        setError(null);
        
        try {
            const jobIdToUse = applicant.jobId || jobId;
            
            // Load conversation first to get unread messages
            const conversationResponse = await api.get(`/messages/employer/conversation/${employer._id}/${applicant.user._id}/${jobIdToUse}`);
            
            if (conversationResponse.data?.success) {
                const newMessages = conversationResponse.data.messages || [];
                
                // Identify unread messages (messages from User that are unread)
                const unreadIds = new Set();
                newMessages.forEach(msg => {
                    if (!msg.read && msg.fromModel === 'User') {
                        unreadIds.add(msg._id);
                    }
                });
                
                setMessages(newMessages);
                setUnreadMessageIds(unreadIds);
                
                // Update cache
                setConversationCache(prev => new Map(prev).set(cacheKey, {
                    messages: newMessages,
                    unreadMessageIds: unreadIds,
                    timestamp: now
                }));
                
                // Update unread counts
                setApplicantUnreadCounts(prev => ({
                    ...prev,
                    [applicant.user._id]: unreadIds.size
                }));
                
                // Mark messages as read AFTER displaying them (in background)
                if (unreadIds.size > 0) {
                    setTimeout(() => {
                        api.put('/messages/employer/mark-read', {
                            userId: employer._id,
                            partnerId: applicant.user._id,
                            jobId: jobIdToUse
                        }).catch(console.error);
                    }, 2000); // 2 second delay to show unread status
                }
                
                // Scroll to bottom after loading messages
                setTimeout(scrollToBottom, 100);
            } else {
                console.log('No messages found or invalid response');
                setMessages([]);
                setUnreadMessageIds(new Set());
            }
        } catch (err) {
            console.error('Error loading conversation:', err);
            if (err.response?.status === 401) {
                setError('Authentication failed. Please log in again.');
            } else if (err.response?.status === 403) {
                setError('You do not have permission to view these messages.');
            } else {
                setError('Failed to load conversation. Please try again.');
            }
        } finally {
            if (showLoading) setLoadingMessages(false);
        }
    }, [employer, jobId, conversationCache, scrollToBottom]);

    // Load initial messages when applicant is selected
    useEffect(() => {
        if (selectedApplicant && employer) {
            loadConversationHistory(selectedApplicant);
        }
    }, [selectedApplicant, employer, loadConversationHistory]);

    // Main data loading effect with optimizations
    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated) {
            navigate('/employer-login');
            return;
        }

        // Check if messaging is enabled for this employer
        if (!employer?.messagesAllowed) {
            setError('Messaging is not enabled for your account. Please enable messaging in your settings to use this feature.');
            setLoading(false);
            return;
        }

        const fetchJobData = async () => {
            if (!jobId || !employer) return;
            
            const now = Date.now();
            const CACHE_DURATION = 60 * 1000; // 1 minute cache
            
            // Check if we need to refetch data
            if (applicants.length > 0 && (now - lastDataFetch) < CACHE_DURATION) {
                return; // Use cached data
            }
            
            setLoading(true);
            setError(null);
            
            try {
                // Use job details from React Query if available, otherwise fetch
                let job = jobDetails?.job;
                
                if (!job) {
                    const response = await api.get(`/jobs/${jobId}`);
                    job = response.data.job;
                }
                
                if (!job) {
                    setError('Job not found');
                    return;
                }
                
                // Check if the employer owns this job
                if (job.postedBy._id !== employer._id && job.postedBy !== employer._id) {
                    setError('You do not have permission to view messages for this job');
                    return;
                }
                
                // Process applicants with user details
                const applicantsWithDetails = job.applicants
                    .filter(applicant => applicant.user && applicant.user._id) // Filter out invalid applicants
                    .map(applicant => ({
                    ...applicant,
                    jobId: job._id,
                    jobTitle: job.jobTitle
                }));
                
                setApplicants(applicantsWithDetails);
                setLastDataFetch(now);
                
            } catch (err) {
                console.error('Error fetching job data:', err);
                setError('Failed to load job data');
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [isAuthenticated, navigate, employer, jobId, jobDetails, applicants.length, lastDataFetch]);
                
    // Optimized message sending with better error handling
    const handleSendMessage = useCallback(async () => {
        if (!newMessage.trim() || !selectedApplicant || !employer) return;
        
        setSendingMessage(true);
        setError(null);
        
        try {
            const messageData = {
                from: employer._id,
                to: selectedApplicant.user._id,
                content: newMessage,
                fromModel: 'Employer',
                toModel: 'User',
                jobId: selectedApplicant.jobId || jobId
            };
            
            const response = await api.post('/messages/employer/send', messageData);
            
            if (response.data && response.data.success) {
                // Clear the input
                setNewMessage('');
                
                // Add message to local state immediately for better UX
                const newMsg = {
                    _id: Date.now().toString(), // Temporary ID
                    ...messageData,
                    createdAt: new Date().toISOString(),
                    timestamp: new Date().toISOString(),
                    read: false
                };
                
                setMessages(prev => [...prev, newMsg]);
                
                // Update cache
                const cacheKey = `${employer._id}-${selectedApplicant.user._id}-${selectedApplicant.jobId || jobId}`;
                setConversationCache(prev => {
                    const newCache = new Map(prev);
                    const cached = newCache.get(cacheKey);
                    if (cached) {
                        newCache.set(cacheKey, {
                            messages: [...cached.messages, newMsg],
                            unreadMessageIds: cached.unreadMessageIds,
                            timestamp: Date.now()
                        });
                    }
                    return newCache;
                });
                
                // Scroll to bottom
                setTimeout(scrollToBottom, 100);
                
                // Refresh conversation in background to get the actual message ID
                setTimeout(() => {
                    loadConversationHistory(selectedApplicant, false);
                }, 1000);
            } else {
                throw new Error(response.data?.message || 'Failed to send message');
            }
            
        } catch (err) {
            console.error('Error sending message:', err);
            if (err.response?.status === 401) {
                setError('Authentication failed. Please log in again.');
            } else if (err.response?.status === 403) {
                setError('You do not have permission to send messages.');
            } else {
                setError(err.response?.data?.message || 'Failed to send message. Please try again.');
            }
        } finally {
            setSendingMessage(false);
        }
    }, [newMessage, selectedApplicant, employer, jobId, loadConversationHistory, scrollToBottom]);

    // Manual refresh function with cache invalidation
    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        setError(null);
        
        // Clear cache for current conversation
        if (selectedApplicant && employer) {
            const cacheKey = `${employer._id}-${selectedApplicant.user._id}-${selectedApplicant.jobId || jobId}`;
            setConversationCache(prev => {
                const newCache = new Map(prev);
                newCache.delete(cacheKey);
                return newCache;
            });
            
            await loadConversationHistory(selectedApplicant, false);
        }
        
        // Refresh unread counts
        await loadUnreadCounts();
        
        setRefreshing(false);
    }, [selectedApplicant, employer, jobId, loadConversationHistory, loadUnreadCounts]);

    // Handle key press in message input
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Optimized date formatting with memoization
    const formatTime = useCallback((dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }, []);

    // Optimized applicant selection
    const handleApplicantSelect = useCallback((applicant) => {
        setSelectedApplicant(applicant);
        setMessages([]); // Clear messages immediately for better UX
        setUnreadMessageIds(new Set());
    }, []);

    // Mark all messages as read
    const handleMarkAllAsRead = useCallback(async () => {
        if (!employer?._id) return;
        
        try {
            await messageAPI.markAllMessagesAsRead(employer._id);
            setTotalUnreadCount(0);
            setApplicantUnreadCounts({});
            setUnreadMessageIds(new Set());
            
            // Refresh current conversation if any
            if (selectedApplicant) {
                await loadConversationHistory(selectedApplicant, false);
            }
        } catch (error) {
            console.error('Error marking all messages as read:', error);
        }
    }, [employer, selectedApplicant, loadConversationHistory]);

    // Mark current conversation as read
    const handleMarkAsRead = useCallback(async () => {
        if (!selectedApplicant || !employer || unreadMessageIds.size === 0) return;
        
        try {
            const jobIdToUse = selectedApplicant.jobId || jobId;
            
            await api.put('/messages/employer/mark-read', {
                userId: employer._id,
                partnerId: selectedApplicant.user._id,
                jobId: jobIdToUse
            });
            
            // Clear unread messages
            setUnreadMessageIds(new Set());
            
            // Update applicant unread counts
            setApplicantUnreadCounts(prev => ({
                ...prev,
                [selectedApplicant.user._id]: 0
            }));
            
            // Update total unread count
            setTotalUnreadCount(prev => Math.max(0, prev - unreadMessageIds.size));
            
            // Clear cache to force refresh
            const cacheKey = `${employer._id}-${selectedApplicant.user._id}-${jobIdToUse}`;
            setConversationCache(prev => {
                const newCache = new Map(prev);
                newCache.delete(cacheKey);
                return newCache;
            });
            
        } catch (error) {
            console.error('Error marking messages as read:', error);
        }
    }, [selectedApplicant, employer, jobId, unreadMessageIds.size]);

    if (jobLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DHeader employer={employer} />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading job details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (jobError || error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DHeader employer={employer} />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <div className="text-red-500 text-xl mb-4">⚠️</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
                        <p className="text-gray-600 mb-4">{error || jobError?.message || 'Something went wrong'}</p>
                        <button
                            onClick={() => navigate('/my-jobs')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Back to My Jobs
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DHeader employer={employer} />
            
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate(`/job-details/${jobId}`)}
                            className="mr-4 p-2 hover:bg-gray-200 rounded-full transition"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                Messages
                                {totalUnreadCount > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {totalUnreadCount}
                                    </span>
                                )}
                            </h1>
                            <p className="text-gray-600">{jobDetails?.job?.jobTitle}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        {totalUnreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                <MessageCircle size={16} className="mr-2" />
                                Mark All Read
                            </button>
                        )}
                    
                    {selectedApplicant && (
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400"
                        >
                            <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                {totalUnreadCount > 0 ? 'Reload' : 'Refresh'}
                        </button>
                    )}
                    </div>
                </div>

                {/* Unread Messages Alert */}
                {totalUnreadCount > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <Bell className="text-blue-600 mr-2" size={20} />
                            <div>
                                <p className="text-blue-800 font-medium">
                                    You have {totalUnreadCount} unread message{totalUnreadCount !== 1 ? 's' : ''}
                                </p>
                                <p className="text-blue-600 text-sm">
                                    Select an applicant to view their messages or click "Mark All Read" to clear all notifications.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-red-700">{error}</p>
                        {error.includes('Messaging is not enabled') && (
                            <div className="mt-3">
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                                >
                                    Go to Settings to Enable Messaging
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                    {/* Applicants List - Left Side */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4 border-b bg-gray-50">
                            <h3 className="font-semibold text-gray-800 mb-3">
                                Applicants ({filteredApplicants.length})
                            </h3>
                            
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search applicants..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto">
                            {loading ? (
                                <div className="p-6 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-3 text-gray-600">Loading applicants...</p>
                                </div>
                            ) : filteredApplicants.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    {applicants.length === 0 ? 'No applicants yet' : 'No applicants found'}
                                </div>
                            ) : (
                                filteredApplicants.map((applicant) => (
                                        <div 
                                            key={applicant._id}
                                        onClick={() => handleApplicantSelect(applicant)}
                                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${selectedApplicant?._id === applicant._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                                        >
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                    <User size={20} className="text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {applicant.user?.name || 'Applicant'}
                                                    </p>
                                                    {applicantUnreadCounts[applicant.user._id] > 0 && (
                                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                            {applicantUnreadCounts[applicant.user._id]}
                                                        </span>
                                                    )}
                                                </div>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {applicant.user?.email || ''}
                                                    </p>
                                                    <div className="flex items-center mt-1">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            applicant.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            applicant.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                                                            applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                                                            applicant.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                                                            applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {applicant.status}
                                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    
                    {/* Message Area - Right Side */}
                    <div className="col-span-2 flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                        {!selectedApplicant ? (
                            <div className="flex-1 flex items-center justify-center p-6 text-center">
                                <div>
                                    <User size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg">Select an applicant to view messages</p>
                                    <p className="text-gray-400 text-sm mt-2">Choose from the list on the left to start messaging</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <User size={20} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 flex items-center">
                                                    {selectedApplicant.user?.name || 'Applicant'}
                                                    {applicantUnreadCounts[selectedApplicant.user._id] > 0 && (
                                                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                            {applicantUnreadCounts[selectedApplicant.user._id]} unread
                                                        </span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-500">{selectedApplicant.user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-xs text-gray-500">
                                                {messages.length} message{messages.length !== 1 ? 's' : ''}
                                            </div>
                                            {unreadMessageIds.size > 0 && (
                                                <button
                                                    onClick={handleMarkAsRead}
                                                    className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors"
                                                    title="Mark all as read"
                                                >
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button
                                                onClick={handleRefresh}
                                                disabled={refreshing}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                                                title="Refresh messages"
                                            >
                                                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Messages */}
                                <div 
                                    ref={messageContainerRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-4"
                                >
                                    {loadingMessages ? (
                                        <div className="flex justify-center items-center h-32">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No messages yet. Start the conversation!</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Unread Messages Banner */}
                                            {unreadMessageIds.size > 0 && (
                                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <Bell className="text-yellow-600 mr-2" size={16} />
                                                        <p className="text-yellow-800 font-medium text-sm">
                                                            Unread Messages ({unreadMessageIds.size})
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {messages.map((message) => (
                                            <div
                                                key={message._id}
                                                className={`flex ${message.fromModel === 'Employer' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className="max-w-xs lg:max-w-md">
                                                    <p className={`text-xs mb-1 ${
                                                        message.fromModel === 'Employer' ? 'text-right text-blue-600' : 'text-left text-gray-600'
                                                    }`}>
                                                        {message.fromModel === 'Employer' ? 'You' : (selectedApplicant.user?.name || 'User')}
                                                            {unreadMessageIds.has(message._id) && (
                                                                <span className="ml-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                                                                    NEW
                                                                </span>
                                                            )}
                                                    </p>
                                                    
                                                    <div
                                                        className={`px-4 py-2 rounded-lg ${
                                                            message.fromModel === 'Employer'
                                                                ? 'bg-blue-600 text-white'
                                                                    : unreadMessageIds.has(message._id)
                                                                        ? 'bg-yellow-100 text-gray-900 border-2 border-yellow-300'
                                                                : 'bg-gray-200 text-gray-900'
                                                        }`}
                                                    >
                                                        <p className="text-sm">{message.content}</p>
                                                        <p className={`text-xs mt-1 ${
                                                            message.fromModel === 'Employer' ? 'text-blue-100' : 'text-gray-500'
                                                        }`}>
                                                            {formatTime(message.timestamp || message.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                                
                                {/* Message Input */}
                                <div className="p-4 border-t bg-gray-50">
                                    <div className="flex space-x-2">
                                        <textarea
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Type your message..."
                                            rows={3}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={sendingMessage}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim() || sendingMessage}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {sendingMessage ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            ) : (
                                                <Send size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages; 