import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { useJobDetails } from '../hooks/useJobs';
import DHeader from '../components/dashboard/DHeader';
import { Send, ArrowLeft, Search, User, Calendar, RefreshCw } from 'lucide-react';
import api from '../services/api';

const Messages = () => {
    const { employer, isAuthenticated } = useEmployerStore();
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
    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null);
    const pollingInterval = useRef(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Set up polling for messages when applicant is selected
    useEffect(() => {
        if (selectedApplicant && employer) {
            // Load initial messages
            loadConversationHistory();
            
            // Set up polling for new messages every 3 seconds
            pollingInterval.current = setInterval(() => {
                loadConversationHistory(false); // Silent refresh
            }, 3000);
        } else {
            // Clear polling when no applicant selected
            if (pollingInterval.current) {
                clearInterval(pollingInterval.current);
                pollingInterval.current = null;
            }
        }

        return () => {
            if (pollingInterval.current) {
                clearInterval(pollingInterval.current);
                pollingInterval.current = null;
            }
        };
    }, [selectedApplicant, employer]);

    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated) {
            navigate('/employer-login');
            return;
        }

        // Check if messaging is enabled
        if (!employer?.messagesAllowed) {
            navigate('/settings', { state: { activeTab: 'messaging' } });
            return;
        }

        const fetchJobData = async () => {
            if (!jobId || !employer) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Fetch job details if not already loaded
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
                
                // Extract applicants with user details
                const applicantsWithDetails = job.applicants.map(applicant => ({
                    ...applicant,
                    jobId: job._id,
                    jobTitle: job.jobTitle
                }));
                
                setApplicants(applicantsWithDetails);
                
            } catch (err) {
                console.error('Error fetching job data:', err);
                setError('Failed to load job data');
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [isAuthenticated, navigate, employer, jobId, jobDetails]);

    // Load conversation history between employer and selected applicant
    const loadConversationHistory = async (showLoading = true) => {
        if (!selectedApplicant || !employer) return;
        
        if (showLoading) setLoading(true);
        
        try {
            const jobIdToUse = selectedApplicant.jobId || jobId;
            const response = await api.get(`/messages/conversation/${employer._id}/${selectedApplicant.user._id}/${jobIdToUse}`);
            
            if (response.data && response.data.messages) {
                setMessages(response.data.messages);
                
                // Scroll to bottom after loading messages
                setTimeout(scrollToBottom, 100);
            }
        } catch (err) {
            console.error('Error loading conversation:', err);
            if (showLoading) {
                setError('Failed to load conversation');
            }
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedApplicant || !employer) return;
        
        setSendingMessage(true);
        
        try {
            // Create message data
            const messageData = {
                from: employer._id,
                to: selectedApplicant.user._id,
                content: newMessage,
                fromModel: 'Employer',
                toModel: 'User',
                jobId: selectedApplicant.jobId || jobId
            };
            
            // Send via HTTP API
            const response = await api.post('/messages/employer/send', messageData);
            
            if (response.data && response.data.success) {
                // Clear the input
                setNewMessage('');
                
                // Refresh conversation to show the new message
                loadConversationHistory(false);
            } else {
                throw new Error(response.data?.message || 'Failed to send message');
            }
            
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message');
        } finally {
            setSendingMessage(false);
        }
    };

    // Manual refresh function
    const handleRefresh = async () => {
        setRefreshing(true);
        if (selectedApplicant) {
            await loadConversationHistory(false);
        }
        setRefreshing(false);
    };

    // Handle key press in message input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    // Filter applicants based on search term
    const filteredApplicants = applicants.filter(applicant => 
        applicant.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
                            <p className="text-gray-600">{jobDetails?.job?.jobTitle}</p>
                        </div>
                    </div>
                    
                    {selectedApplicant && (
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400"
                        >
                            <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    )}
                </div>

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
                            {filteredApplicants.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    {applicants.length === 0 ? 'No applicants yet' : 'No applicants found'}
                                </div>
                            ) : (
                                filteredApplicants.map((applicant) => (
                                    <div 
                                        key={applicant._id}
                                        onClick={() => setSelectedApplicant(applicant)}
                                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${selectedApplicant?._id === applicant._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <User size={20} className="text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {applicant.user?.name || 'Applicant'}
                                                </p>
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
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                            <User size={20} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {selectedApplicant.user?.name || 'Applicant'}
                                            </h3>
                                            <p className="text-sm text-gray-500">{selectedApplicant.user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Messages */}
                                <div 
                                    ref={messageContainerRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-4"
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center h-32">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No messages yet. Start the conversation!</p>
                                        </div>
                                    ) : (
                                        messages.map((message) => (
                                            <div
                                                key={message._id}
                                                className={`flex ${message.fromModel === 'Employer' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                                        message.fromModel === 'Employer'
                                                            ? 'bg-blue-600 text-white'
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
                                        ))
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