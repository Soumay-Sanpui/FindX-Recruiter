import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import DHeader from '../components/dashboard/DHeader';
import { Send, ArrowLeft, Search, User, Calendar } from 'lucide-react';
import api from '../services/api';
import socketService from '../services/socketService';

const Messages = () => {
    const { employer, isAuthenticated } = useEmployerStore();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);
    const messageContainerRef = useRef(null);

    // Initialize socket connection
    useEffect(() => {
        if (employer && employer._id) {
            // Initialize socket
            socketService.init();
            
            // Join as employer
            socketService.joinUser(employer._id, 'Employer');
            
            // Set up socket event listeners
            const onReceiveMessage = (message) => {
                if (selectedApplicant && 
                    ((message.from === employer._id && message.to === selectedApplicant.user._id) || 
                     (message.to === employer._id && message.from === selectedApplicant.user._id))) {
                    setMessages(prev => [...prev, message]);
                    // Mark message as read
                    socketService.markAsRead(message._id);
                    // Scroll to bottom
                    setTimeout(scrollToBottom, 100);
                }
            };
            
            const onConversationHistory = (messagesData) => {
                setMessages(messagesData);
                setLoading(false);
                // Scroll to bottom after loading messages
                setTimeout(scrollToBottom, 100);
            };
            
            // Register socket event listeners
            const unsubscribeReceiveMessage = socketService.onReceiveMessage(onReceiveMessage);
            const unsubscribeConversationHistory = socketService.onConversationHistory(onConversationHistory);
            const unsubscribeMessageSent = socketService.onMessageSent((message) => {
                if (!selectedApplicant) return;
                
                if (message.from === employer._id && message.to === selectedApplicant.user._id) {
                    setMessages(prev => [...prev, message]);
                    setTimeout(scrollToBottom, 100);
                }
            });
            
            // Clean up on unmount
            return () => {
                unsubscribeReceiveMessage();
                unsubscribeConversationHistory();
                unsubscribeMessageSent();
            };
        }
    }, [employer, selectedApplicant]);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

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

        // Fetch job details and applicants
        const fetchJobData = async () => {
            try {
                setLoading(true);
                
                if (jobId) {
                    // Fetch specific job
                    const response = await api.get(`/jobs/${jobId}`);
                    if (response.data && response.data.success) {
                        setJobDetails(response.data.job);
                        setApplicants(response.data.job.applicants || []);
                    } else {
                        setError('Failed to load job details');
                    }
                } else {
                    // Fetch all jobs posted by the employer
                    const response = await api.get('/jobs/my/posted');
                    if (response.data && response.data.success) {
                        const allApplicants = [];
                        const jobs = response.data.jobs || [];
                        
                        // Collect all applicants from all jobs
                        jobs.forEach(job => {
                            if (job.applicants && job.applicants.length > 0) {
                                job.applicants.forEach(applicant => {
                                    allApplicants.push({
                                        ...applicant,
                                        jobTitle: job.jobTitle,
                                        jobId: job._id
                                    });
                                });
                            }
                        });
                        
                        setApplicants(allApplicants);
                    } else {
                        setError('Failed to load jobs');
                    }
                }
            } catch (err) {
                console.error('Error fetching job data:', err);
                setError('An error occurred while loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [isAuthenticated, navigate, employer, jobId]);

    useEffect(() => {
        // Fetch messages when an applicant is selected
        if (!selectedApplicant || !employer) return;
        
        setLoading(true);
        
        // Request conversation history from socket
        socketService.getConversation(employer._id, selectedApplicant.user._id);
        
    }, [selectedApplicant, employer]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            
            // Send via socket
            socketService.sendMessage(messageData);
            
            // Clear the input
            setNewMessage('');
            
            // We'll get the message back from the socket
        } catch (err) {
            console.error('Error sending message:', err);
            alert('Failed to send message');
        } finally {
            setSendingMessage(false);
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
    const filteredApplicants = applicants.filter(applicant => {
        const name = applicant.user?.name || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white">
                <DHeader employer={employer} />
                <div className="container mx-auto px-8 py-8 flex justify-center items-center h-[70vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white">
            <DHeader employer={employer} />
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex items-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {jobId && jobDetails ? `Messages for ${jobDetails.jobTitle}` : 'All Messages'}
                    </h1>
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[75vh]">
                    {/* Applicants List - Left Side */}
                    <div className="border-r border-gray-200 h-full flex flex-col overflow-hidden">
                        {/* Search Header - Fixed */}
                        <div className="p-4 border-b bg-white sticky top-0 z-10">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search applicants..."
                                    className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        {/* Applicant List - Scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredApplicants.length === 0 ? (
                                <div className="p-6 text-center text-gray-500">
                                    No applicants found
                                </div>
                            ) : (
                                filteredApplicants.map((applicant) => (
                                    <div 
                                        key={applicant._id}
                                        onClick={() => setSelectedApplicant(applicant)}
                                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedApplicant?._id === applicant._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                                    >
                                        <div className="flex items-start">
                                            <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                                                <User size={18} className="text-gray-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">
                                                    {applicant.user?.name || 'Applicant'}
                                                </h3>
                                                {!jobId && applicant.jobTitle && (
                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Applied for: {applicant.jobTitle}
                                                    </p>
                                                )}
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Calendar size={12} className="mr-1" />
                                                    {formatDate(applicant.appliedOn || applicant.appliedAt)}
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${applicant.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {applicant.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    
                    {/* Message Area - Right Side */}
                    <div className="col-span-2 flex flex-col h-full overflow-hidden">
                        {!selectedApplicant ? (
                            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                                <div className="text-center">
                                    <User size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500">Select an applicant to view messages</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Message Header - Fixed */}
                                <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                                            <User size={18} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">
                                                {selectedApplicant.user?.name || 'Applicant'}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {selectedApplicant.user?.email || 'Email not available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Message Content - Scrollable */}
                                <div 
                                    ref={messageContainerRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                                >
                                    {messages.length === 0 ? (
                                        <div className="text-center py-6">
                                            <p className="text-gray-500">No messages yet. Start the conversation!</p>
                                        </div>
                                    ) : (
                                        messages.map((msg) => (
                                            <div 
                                                key={msg._id}
                                                className={`max-w-[80%] p-3 rounded-lg ${msg.fromModel === 'Employer' ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-white border'}`}
                                            >
                                                <p>{msg.content}</p>
                                                <div className={`text-xs mt-1 text-right ${msg.fromModel === 'Employer' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                    {formatTime(msg.createdAt)}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                                
                                {/* Message Input - Fixed */}
                                <div className="p-4 border-t bg-white sticky bottom-0 z-10">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim() || sendingMessage}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                                        >
                                            {sendingMessage ? (
                                                <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mx-auto"></div>
                                            ) : (
                                                <Send size={18} />
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