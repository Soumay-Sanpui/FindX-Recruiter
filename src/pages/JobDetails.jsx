import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { useJobDetails, useUpdateApplicationStatus, useUpdateJobStatus } from '../hooks/useJobs';
import DHeader from '../components/dashboard/DHeader';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Award, Users, CheckCircle, XCircle, AlertCircle, Calendar, Ban, MessageCircle, Globe, Edit, ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../services/api';

const JobDetails = () => {
    const { jobId } = useParams();
    const { employer, isAuthenticated } = useEmployerStore();
    const navigate = useNavigate();
    
    // Use React Query hooks
    const { data: job, isLoading: loading, error } = useJobDetails(jobId);
    const updateApplicationStatusMutation = useUpdateApplicationStatus();
    const updateJobStatusMutation = useUpdateJobStatus();
    
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [interviewDetails, setInterviewDetails] = useState({
        date: '',
        time: '',
        location: '',
        notes: ''
    });
    const [rejectionReason, setRejectionReason] = useState('');
    const [blockReason, setBlockReason] = useState('');
    
    // Application Questions dropdown states
    const [showApplicationQuestions, setShowApplicationQuestions] = useState(false);
    const [expandedQuestions, setExpandedQuestions] = useState({});
    
    // Application Response dropdown states for each applicant
    const [expandedApplicantResponses, setExpandedApplicantResponses] = useState({});
    
    // Applicants section dropdown state
    const [showApplicantsSection, setShowApplicantsSection] = useState(false);

    // Toggle individual question expansion
    const toggleQuestionExpansion = (questionIndex) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionIndex]: !prev[questionIndex]
        }));
    };

    // Toggle individual applicant response expansion
    const toggleApplicantResponseExpansion = (applicantId) => {
        setExpandedApplicantResponses(prev => ({
            ...prev,
            [applicantId]: !prev[applicantId]
        }));
    };

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        navigate('/employer-login');
        return null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };
    
    const formatCurrency = (amount) => {
        if (!amount) return '0';
        return new Intl.NumberFormat('en-US').format(amount);
    };

    const handleOpenInterviewModal = (applicant) => {
        setSelectedApplicant(applicant);
        setInterviewDetails({
            date: '',
            time: '',
            location: '',
            notes: ''
        });
        setShowInterviewModal(true);
    };

    const handleCloseInterviewModal = () => {
        setShowInterviewModal(false);
        setSelectedApplicant(null);
    };

    const handleOpenRejectModal = (applicant) => {
        setSelectedApplicant(applicant);
        setRejectionReason('');
        setShowRejectModal(true);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
        setSelectedApplicant(null);
    };

    const handleOpenBlockModal = (applicant) => {
        setSelectedApplicant(applicant);
        setBlockReason('');
        setShowBlockModal(true);
    };

    const handleCloseBlockModal = () => {
        setShowBlockModal(false);
        setSelectedApplicant(null);
    };

    const updateApplicationStatus = async (applicationId, status, additionalData = {}) => {
        if (!job) return;
        
        try {
            await updateApplicationStatusMutation.mutateAsync({
                jobId: job._id,
                applicationId,
                status,
                additionalData
            });
            
            // Close any open modals
            setShowInterviewModal(false);
            setShowRejectModal(false);
            setShowBlockModal(false);
            setSelectedApplicant(null);
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    const handleScheduleInterview = () => {
        if (!selectedApplicant || !interviewDetails.date || !interviewDetails.time) {
            alert('Please fill in the required fields');
            return;
        }
        
        // Use the new interview invitation API
        const invitationData = {
            jobId: job._id,
            applicantId: selectedApplicant.user._id || selectedApplicant.user,
            applicationId: selectedApplicant._id,
            interviewDetails: {
                date: interviewDetails.date,
                time: interviewDetails.time,
                location: interviewDetails.location || 'TBD',
                notes: interviewDetails.notes,
                interviewType: 'video-call', // Default to video call
                duration: 60 // Default duration
            }
        };
        
        // Call the new interview invitation API
        api.post('/interviews/send-invitation', invitationData)
        .then(response => {
            if (response.data.success) {
                toast.success('Interview invitation sent successfully!');
                // Also update the application status using the existing mutation
                updateApplicationStatus(
                    selectedApplicant._id, 
                    'Interview',
                    { interviewDetails }
                );
            } else {
                toast.error(response.data.message || 'Failed to send interview invitation');
            }
        })
        .catch(error => {
            console.error('Error sending interview invitation:', error);
            toast.error('Failed to send interview invitation');
        });
    };

    const handleRejectCandidate = () => {
        if (!selectedApplicant || !rejectionReason) {
            alert('Please provide a reason for rejection');
            return;
        }
        
        updateApplicationStatus(
            selectedApplicant._id, 
            'Rejected',
            { rejectionReason }
        );
    };

    const handleBlockCandidate = () => {
        if (!selectedApplicant || !blockReason) {
            alert('Please provide a reason for blocking');
            return;
        }
        
        updateApplicationStatus(
            selectedApplicant._id, 
            'Blocked',
            { blockReason }
        );
    };

    const handleJobStatusToggle = async () => {
        const newStatus = job.status === 'Open' ? 'Closed' : 'Open';
        
        try {
            await updateJobStatusMutation.mutateAsync({
                jobId: job._id,
                status: newStatus
            });
        } catch (error) {
            console.error('Error updating job status:', error);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Reviewed':
                return 'bg-blue-100 text-blue-800';
            case 'Shortlisted':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Blocked':
                return 'bg-gray-800 text-white';
            case 'Interview':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Loading state
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

    // Error state
    if (error || !job) {
        return (
            <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white">
                <DHeader employer={employer} />
                <div className="container mx-auto px-8 py-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>{error?.message || 'Job not found'}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white pb-[10vh]">
            <DHeader employer={employer} />
            <div className="container mx-auto px-8 py-8">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <button 
                        onClick={() => navigate('/my-jobs')}
                        className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
                    >
                        <ArrowLeft size={20} className="mr-1" />
                        Back to My Jobs
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Job Details</h1>
                </div>

                {/* Job Header Card */}
                <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start">
                        <div className="flex-1">
                            {/* Company Logo and Title Section */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    {/* Company Logo */}
                                    {(job.companyLogo || job.postedBy?.companyLogo) && (
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={job.companyLogo || job.postedBy?.companyLogo} 
                                                alt={job.postedBy?.companyName || 'Company Logo'}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    
                                    {/* Job Title and Company Info */}
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>
                                        {job.postedBy?.companyName && (
                                            <p className="text-lg text-gray-600 mb-1">{job.postedBy.companyName}</p>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Posted on {formatDate(job.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Status and Actions */}
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {job.status}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600">
                                            {job.status === 'Open' ? 'Job is Open' : 'Job is Closed'}
                                        </span>
                                        {job.status === 'Open' && (
                                        <button
                                            onClick={handleJobStatusToggle}
                                            disabled={updateJobStatusMutation.isPending}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm transition"
                                        >
                                            {updateJobStatusMutation.isPending ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <ToggleRight size={16} />
                                            )}
                                            Close Job
                                        </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <MapPin size={18} className="mr-3 text-blue-600" />
                                    <span>{job.jobLocation}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Globe size={18} className="mr-3 text-blue-600" />
                                    <span>{job.workspaceOption}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Briefcase size={18} className="mr-3 text-blue-600" />
                                    <span>{job.workType}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Award size={18} className="mr-3 text-blue-600" />
                                    <span>{job.category}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <DollarSign size={18} className="mr-3 text-blue-600" />
                                    <span>
                                        {job.currency} {formatCurrency(job.from)} - {formatCurrency(job.to)} {job.jobSalaryType}
                                    </span>
                                </div>

                            </div>

                            {job.jobBanner && (
                                <div className="mb-6">
                                    <img src={job.jobBanner} alt={job.jobTitle} className="w-full h-64 object-cover rounded border border-gray-200" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Description */}
                <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
                    <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{job.jobDescription}</p>
                    </div>
                </div>

                {/* Job Summary */}
               <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                   <h3 className="text-xl font-bold text-gray-800 mb-4">Job Summary</h3>
                   <div className="prose max-w-none">
                       <p className="text-gray-700 whitespace-pre-line">{job.jobSummary}</p>
                   </div>
               </div>

                {/* Job Keywords */}
                {job.jobKeywords && job.jobKeywords.length > 0 && (
                    <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Job Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.jobKeywords.map((keyword, index) => (
                                <span 
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                            These keywords help candidates find this job posting through search.
                        </p>
                    </div>
                )}

                {/* Application Questions */}
                {((job.jobQuestions && job.jobQuestions.length > 0) || (job.applicationQuestions && job.applicationQuestions.length > 0)) && (
                    <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                        {/* Main Section Header with Dropdown Toggle */}
                        <div 
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded transition-colors"
                            onClick={() => setShowApplicationQuestions(!showApplicationQuestions)}
                        >
                            <h3 className="text-xl font-bold text-gray-800">
                                Application Questions ({(job.jobQuestions?.length || 0) + (job.applicationQuestions?.length || 0)})
                            </h3>
                            <div className="flex items-center text-gray-600">
                                <span className="text-sm mr-2">
                                    {showApplicationQuestions ? 'Collapse' : 'Expand'}
                                </span>
                                {showApplicationQuestions ? 
                                    <ChevronUp size={20} /> : 
                                    <ChevronDown size={20} />
                                }
                            </div>
                        </div>

                        {/* Collapsible Content */}
                        {showApplicationQuestions && (
                            <div className="mt-6">
                                <div className="space-y-4">
                                    {/* Simple Questions */}
                                    {job.jobQuestions && job.jobQuestions.map((question, index) => {
                                        const questionKey = `simple-${index}`;
                                        const isExpanded = expandedQuestions[questionKey];
                                        
                                        return (
                                            <div key={questionKey} className="border border-gray-200 rounded-lg overflow-hidden">
                                                {/* Question Header */}
                                                <div 
                                                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
                                                    onClick={() => toggleQuestionExpansion(questionKey)}
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-gray-800 font-medium">
                                                            <span className="text-blue-600 mr-2">Q{index + 1}:</span>
                                                            {question.length > 80 && !isExpanded ? 
                                                                `${question.substring(0, 80)}...` : 
                                                                question
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">Type: Text Response</p>
                                                    </div>
                                                    <div className="ml-4 text-gray-600">
                                                        {isExpanded ? 
                                                            <ChevronUp size={16} /> : 
                                                            <ChevronDown size={16} />
                                                        }
                                                    </div>
                                                </div>
                                                
                                                {/* Question Details */}
                                                {isExpanded && (
                                                    <div className="p-4 bg-white border-t border-gray-200">
                                                        <p className="text-gray-800">{question}</p>
                                                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                                            <p className="text-sm text-blue-700">
                                                                This is a text response question. Applicants can provide a detailed written answer.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    
                                    {/* Structured Questions with Options */}
                                    {job.applicationQuestions && job.applicationQuestions.map((questionObj, index) => {
                                        const questionKey = `structured-${index}`;
                                        const isExpanded = expandedQuestions[questionKey];
                                        const questionNumber = (job.jobQuestions?.length || 0) + index + 1;
                                        
                                        return (
                                            <div key={questionKey} className="border border-gray-200 rounded-lg overflow-hidden">
                                                {/* Question Header */}
                                                <div 
                                                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
                                                    onClick={() => toggleQuestionExpansion(questionKey)}
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-gray-800 font-medium">
                                                            <span className="text-blue-600 mr-2">Q{questionNumber}:</span>
                                                            {questionObj.question.length > 80 && !isExpanded ? 
                                                                `${questionObj.question.substring(0, 80)}...` : 
                                                                questionObj.question
                                                            }
                                                            {questionObj.required && <span className="text-red-500 ml-1">*</span>}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Type: Multiple Choice {questionObj.required ? '(Required)' : '(Optional)'} 
                                                            • {questionObj.options?.length || 0} options
                                                        </p>
                                                    </div>
                                                    <div className="ml-4 text-gray-600">
                                                        {isExpanded ? 
                                                            <ChevronUp size={16} /> : 
                                                            <ChevronDown size={16} />
                                                        }
                                                    </div>
                                                </div>
                                                
                                                {/* Question Details */}
                                                {isExpanded && (
                                                    <div className="p-4 bg-white border-t border-gray-200">
                                                        <p className="text-gray-800 mb-4">{questionObj.question}</p>
                                                        <div className="ml-4">
                                                            <p className="text-sm text-gray-600 mb-3 font-medium">Available Options:</p>
                                                            <ul className="space-y-2">
                                                                {questionObj.options && questionObj.options.map((option, optIndex) => (
                                                                    <li key={optIndex} className="text-sm text-gray-700 flex items-center p-2 bg-gray-50 rounded">
                                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                                                        {option}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded">
                                                            <p className="text-sm text-purple-700">
                                                                This is a multiple choice question. Applicants must select one of the provided options.
                                                                {questionObj.required && (
                                                                    <span className="block mt-1 font-medium">⚠️ This question is required - applicants must answer to submit their application.</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                {/* Summary */}
                                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-blue-700 font-medium">
                                                📊 Question Summary
                                            </p>
                                            <p className="text-sm text-blue-600 mt-1">
                                                Total Questions: <strong>{(job.jobQuestions?.length || 0) + (job.applicationQuestions?.length || 0)}</strong>
                                                {job.jobQuestions?.length > 0 && (
                                                    <span className="ml-4">Text Response: <strong>{job.jobQuestions.length}</strong></span>
                                                )}
                                                {job.applicationQuestions?.length > 0 && (
                                                    <span className="ml-4">Multiple Choice: <strong>{job.applicationQuestions.length}</strong></span>
                                                )}
                                            </p>
                                        </div>
                                        {job.applicationQuestions && job.applicationQuestions.some(q => q.required) && (
                                            <div className="text-right">
                                                <p className="text-sm text-red-600 font-medium">
                                                    <span className="text-red-500">*</span> Required Questions
                                                </p>
                                                <p className="text-xs text-red-500 mt-1">
                                                    Applicants must answer these
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Applicants Section */}
                <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                    {/* Main Section Header with Dropdown Toggle */}
                    <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded transition-colors mb-6"
                        onClick={() => setShowApplicantsSection(!showApplicantsSection)}
                    >
                        <div className="flex items-center">
                            <Users size={20} className="mr-3 text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-800">
                                Applicants ({job.applicants?.length || 0})
                            </h3>
                        </div>
                        <div className="flex items-center gap-4">
                            {employer?.messagesAllowed ? (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent dropdown toggle
                                        navigate(`/messages/${job._id}`);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition flex items-center"
                                >
                                    <MessageCircle className="mr-2" size={16} /> 
                                    View Messages
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent dropdown toggle
                                        navigate('/settings');
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-600 transition flex items-center"
                                    title="Enable messaging in settings to view messages"
                                >
                                    <MessageCircle className="mr-2" size={16} /> 
                                    Enable Messaging
                                </button>
                            )}
                            <div className="flex items-center text-gray-600">
                                <span className="text-sm mr-2">
                                    {showApplicantsSection ? 'Collapse' : 'Expand'}
                                </span>
                                {showApplicantsSection ? 
                                    <ChevronUp size={20} /> : 
                                    <ChevronDown size={20} />
                                }
                            </div>
                        </div>
                    </div>

                    {/* Collapsible Applicants Content */}
                    {showApplicantsSection && (
                        <>
                            {job.applicants && job.applicants.length > 0 ? (
                                <div className="space-y-4">
                                    {job.applicants.map((applicant) => (
                                <div key={applicant._id} className="border-2 border-gray-200 hover:border-blue-300 p-4 rounded-lg transition-colors">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 text-lg">
                                                {applicant.user?.name || 'Applicant Name'}
                                            </h4>
                                            <p className="text-gray-600">{applicant.user?.email || 'Email not available'}</p>
                                            <p className="text-gray-500 text-sm mb-3">
                                                Applied on: {formatDate(applicant.appliedOn || applicant.appliedAt)}
                                            </p>
                                            
                                            {/* Status-specific details */}
                                            {applicant.status === 'Interview' && applicant.interviewDetails && (
                                                <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded">
                                                    <h5 className="font-medium text-purple-700 text-sm">Interview Details</h5>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Date:</span> {new Date(applicant.interviewDetails.date).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        <span className="font-medium">Time:</span> {applicant.interviewDetails.time}
                                                    </p>
                                                    {applicant.interviewDetails.location && (
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Location:</span> {applicant.interviewDetails.location}
                                                        </p>
                                                    )}
                                                    {applicant.interviewDetails.notes && (
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Notes:</span> {applicant.interviewDetails.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            
                                            {applicant.status === 'Rejected' && applicant.rejectionReason && (
                                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                                                    <h5 className="font-medium text-red-700 text-sm">Rejection Reason</h5>
                                                    <p className="text-sm text-gray-600">{applicant.rejectionReason}</p>
                                                </div>
                                            )}
                                            
                                            {applicant.isBlocked && applicant.blockReason && (
                                                <div className="mt-3 p-3 bg-gray-100 border border-gray-300 rounded">
                                                    <h5 className="font-medium text-gray-700 text-sm">Block Reason</h5>
                                                    <p className="text-sm text-gray-600">{applicant.blockReason}</p>
                                                </div>
                                            )}
                                            
                                            {/* Debug: Show applicant data structure */}
                                            {(window.location.search.includes('debug=true')) && (
                                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                                    <h5 className="font-medium text-yellow-700 text-sm mb-2">Debug: Applicant Data</h5>
                                                    <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
                                                        {JSON.stringify({
                                                            applicantId: applicant._id,
                                                            userId: applicant.user?._id,
                                                            userName: applicant.user?.name,
                                                            questionResponses: applicant.questionResponses,
                                                            questionResponsesType: typeof applicant.questionResponses,
                                                            isArray: Array.isArray(applicant.questionResponses),
                                                            hasQuestionResponses: !!applicant.questionResponses,
                                                            questionResponsesLength: applicant.questionResponses?.length || 0,
                                                            jobHasApplicationQuestions: !!(job.applicationQuestions && job.applicationQuestions.length > 0),
                                                            applicationQuestionsCount: job.applicationQuestions?.length || 0,
                                                            appliedOn: applicant.appliedOn,
                                                            status: applicant.status,
                                                            hasValidResponses: applicant.questionResponses && Array.isArray(applicant.questionResponses) && applicant.questionResponses.length > 0
                                                        }, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                            
                            {/* Application Question Responses */}
                            {applicant.questionResponses && Array.isArray(applicant.questionResponses) && applicant.questionResponses.length > 0 ? (
                                <div className="mt-3 bg-blue-50 border border-blue-200 rounded overflow-hidden">
                                    {/* Response Header with Dropdown Toggle */}
                                    <div 
                                        className="p-3 cursor-pointer hover:bg-blue-100 transition-colors flex items-center justify-between"
                                        onClick={() => toggleApplicantResponseExpansion(applicant._id)}
                                    >
                                        <div className="flex items-center">
                                            <h5 className="font-medium text-blue-700 text-sm">
                                                Application Question Responses ({applicant.questionResponses.length})
                                            </h5>
                                        </div>
                                        <div className="flex items-center text-blue-600">
                                            <span className="text-xs mr-2">
                                                {expandedApplicantResponses[applicant._id] ? 'Collapse' : 'Expand'}
                                            </span>
                                            {expandedApplicantResponses[applicant._id] ? 
                                                <ChevronUp size={16} /> : 
                                                <ChevronDown size={16} />
                                            }
                                        </div>
                                    </div>
                                    
                                    {/* Collapsible Response Content */}
                                    {expandedApplicantResponses[applicant._id] && (
                                        <div className="p-3 bg-white border-t border-blue-200">
                                            <div className="space-y-3">
                                                {applicant.questionResponses.map((response, index) => (
                                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                                        <div className="p-3 bg-gray-50">
                                                            <p className="font-medium text-gray-700 text-sm">
                                                                <span className="text-blue-600 mr-2">Q{index + 1}:</span>
                                                                {response.question}
                                                            </p>
                                                        </div>
                                                        <div className="p-3 bg-white">
                                                            <div className="flex items-center">
                                                                <span className="text-xs text-gray-500 mr-2">Answer:</span>
                                                                <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
                                                                    {response.selectedOption}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Response Summary */}
                                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs text-blue-700 font-medium">
                                                            📋 Response Summary
                                                        </p>
                                                        <p className="text-xs text-blue-600 mt-1">
                                                            Completed: <strong>{applicant.questionResponses.length}</strong> of <strong>{job.applicationQuestions?.length || 0}</strong> questions
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs text-green-600 font-medium">
                                                            ✓ All Answered
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                                // Show when applicant applied but no question responses are found
                                                job.applicationQuestions && job.applicationQuestions.length > 0 && (
                                                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded">
                                                        <h5 className="font-medium text-orange-700 text-sm mb-2">⚠️ Missing Application Question Responses</h5>
                                                        <p className="text-sm text-orange-600 mb-2">
                                                            This job has {job.applicationQuestions.length} application questions, but the applicant's responses were not saved or are empty.
                                                        </p>
                                                        <div className="text-xs text-orange-500 space-y-1">
                                                            <p><strong>Possible causes:</strong></p>
                                                            <ul className="list-disc list-inside pl-2 space-y-1">
                                                                <li>Applicant submitted without filling out required questions</li>
                                                                <li>Questions were added after the application was submitted</li>
                                                                <li>Technical issue during submission</li>
                                                            </ul>
                                                            <p className="mt-2">
                                                                <strong>Troubleshooting:</strong> Add ?debug=true to URL to see raw data.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        
                                        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-start lg:items-end">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium mb-3 ${getStatusBadgeClass(applicant.status)}`}>
                                                {applicant.status}
                                            </span>
                                            
                                            {!applicant.isBlocked && (
                                                <div className="flex flex-wrap gap-2">
                                                    {applicant.status !== 'Shortlisted' && (
                                                        <button
                                                            onClick={() => updateApplicationStatus(applicant._id, 'Shortlisted')}
                                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded flex items-center"
                                                        >
                                                            <CheckCircle size={14} className="mr-1" /> Shortlist
                                                        </button>
                                                    )}
                                                    
                                                    {applicant.status !== 'Reviewed' && applicant.status !== 'Shortlisted' && (
                                                        <button
                                                            onClick={() => updateApplicationStatus(applicant._id, 'Reviewed')}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded flex items-center"
                                                        >
                                                            <AlertCircle size={14} className="mr-1" /> Mark as Reviewed
                                                        </button>
                                                    )}
                                                    
                                                    {applicant.status !== 'Interview' && (
                                                        <button
                                                            onClick={() => handleOpenInterviewModal(applicant)}
                                                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-sm rounded flex items-center"
                                                        >
                                                            <Calendar size={14} className="mr-1" /> Schedule Interview
                                                        </button>
                                                    )}
                                                    
                                                    {applicant.status !== 'Rejected' && (
                                                        <button
                                                            onClick={() => handleOpenRejectModal(applicant)}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded flex items-center"
                                                        >
                                                            <XCircle size={14} className="mr-1" /> Reject
                                                        </button>
                                                    )}
                                                    
                                                    <button
                                                        onClick={() => handleOpenBlockModal(applicant)}
                                                        className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 text-sm rounded flex items-center"
                                                    >
                                                        <Ban size={14} className="mr-1" /> Block
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users size={48} className="mx-auto text-gray-400 mb-4" />
                                    <h4 className="text-lg font-medium text-gray-900">No applicants yet</h4>
                                    <p className="text-gray-500 mt-2">
                                        When candidates apply for this job, they'll appear here
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Summary when collapsed */}
                    {!showApplicantsSection && job.applicants && job.applicants.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        📊 Applicants Summary
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Total Applications: <strong>{job.applicants.length}</strong>
                                        <span className="ml-4">Pending: <strong>{job.applicants.filter(a => a.status === 'Pending').length}</strong></span>
                                        <span className="ml-4">Shortlisted: <strong>{job.applicants.filter(a => a.status === 'Shortlisted').length}</strong></span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-blue-600 font-medium">
                                        Click above to view all applicants
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals (Interview, Reject, Block) - Same as in MyJobs but simplified */}
            {/* Interview Modal */}
            {showInterviewModal && selectedApplicant && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                    <div className="bg-white border-2 border-blue-800 shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-blue-800">Schedule Interview</h2>
                                <button onClick={handleCloseInterviewModal} className="text-gray-500 hover:text-gray-700">
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Candidate</p>
                                <p className="font-medium">{selectedApplicant.user?.name || 'Applicant'}</p>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="date" 
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={interviewDetails.date}
                                    onChange={(e) => setInterviewDetails({...interviewDetails, date: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="time" 
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={interviewDetails.time}
                                    onChange={(e) => setInterviewDetails({...interviewDetails, time: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={interviewDetails.location}
                                    onChange={(e) => setInterviewDetails({...interviewDetails, location: e.target.value})}
                                    placeholder="Office address or virtual meeting link"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={interviewDetails.notes}
                                    onChange={(e) => setInterviewDetails({...interviewDetails, notes: e.target.value})}
                                    placeholder="Additional details about the interview"
                                    rows={3}
                                />
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-2">
                            <button
                                onClick={handleCloseInterviewModal}
                                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleScheduleInterview}
                                className="px-4 py-2 bg-blue-600 text-white shadow-sm text-sm font-medium hover:bg-blue-700 flex items-center"
                            >
                                <Calendar size={16} className="mr-1" /> Schedule Interview
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && selectedApplicant && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                    <div className="bg-white shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-blue-800">Reject Candidate</h2>
                                <button onClick={handleCloseRejectModal} className="text-gray-500 hover:text-gray-700">
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Candidate</p>
                                <p className="font-medium">{selectedApplicant.user?.name || 'Applicant'}</p>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for rejection <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Provide a reason for rejecting this candidate"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-2">
                            <button
                                onClick={handleCloseRejectModal}
                                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRejectCandidate}
                                className="px-4 py-2 bg-red-600 text-white shadow-sm text-sm font-medium hover:bg-red-700 flex items-center"
                            >
                                <XCircle size={16} className="mr-1" /> Reject Candidate
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block Modal */}
            {showBlockModal && selectedApplicant && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                    <div className="bg-white shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-blue-800">Block Candidate</h2>
                                <button onClick={handleCloseBlockModal} className="text-gray-500 hover:text-gray-700">
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Candidate</p>
                                <p className="font-medium">{selectedApplicant.user?.name || 'Applicant'}</p>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for blocking <span className="text-red-500">*</span>
                                </label>
                                <textarea 
                                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={blockReason}
                                    onChange={(e) => setBlockReason(e.target.value)}
                                    placeholder="Provide a reason for blocking this candidate"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-2">
                            <button
                                onClick={handleCloseBlockModal}
                                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBlockCandidate}
                                className="px-4 py-2 bg-gray-800 text-white shadow-sm text-sm font-medium hover:bg-gray-900 flex items-center"
                            >
                                <Ban size={16} className="mr-1" /> Block Candidate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails; 