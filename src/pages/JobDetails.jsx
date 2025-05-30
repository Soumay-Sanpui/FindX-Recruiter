import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { useJobDetails, useUpdateApplicationStatus, useUpdateJobStatus } from '../hooks/useJobs';
import DHeader from '../components/dashboard/DHeader';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Award, Users, CheckCircle, XCircle, AlertCircle, Calendar, Ban, MessageCircle, Globe, Edit, ToggleLeft, ToggleRight } from 'lucide-react';

const JobDetails = () => {
    const { jobId } = useParams();
    const { employer, isAuthenticated } = useEmployerStore();
    const navigate = useNavigate();
    
    // Use React Query hooks
    const { data: job, isLoading: loading, error } = useJobDetails(jobId);
    const updateApplicationStatusMutation = useUpdateApplicationStatus();
    const updateJobStatusMutation = useUpdateJobStatus();
    
    const [showApplicants, setShowApplicants] = useState(false);
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
        
        updateApplicationStatus(
            selectedApplicant._id, 
            'Interview',
            { interviewDetails }
        );
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
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h2>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {job.status}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600">
                                            {job.status === 'Open' ? 'Job is Open' : 'Job is Closed'}
                                        </span>
                                        <button
                                            onClick={handleJobStatusToggle}
                                            disabled={updateJobStatusMutation.isPending}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded text-sm transition"
                                        >
                                            {updateJobStatusMutation.isPending ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : job.status === 'Open' ? (
                                                <ToggleRight size={16} />
                                            ) : (
                                                <ToggleLeft size={16} />
                                            )}
                                            {job.status === 'Open' ? 'Close Job' : 'Reopen Job'}
                                        </button>
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
                                <div className="flex items-center text-gray-600">
                                    <Clock size={18} className="mr-3 text-blue-600" />
                                    <span>Posted on {formatDate(job.createdAt)}</span>
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

                {/* Skills & Requirements */}
                <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.jobSkills && job.jobSkills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Applicants Section */}
                <div className="bg-white p-8 shadow-lg border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            Applicants ({job.applicants?.length || 0})
                        </h3>
                        <div className="flex gap-4">
                            {employer?.messagesAllowed && (
                                <button
                                    onClick={() => navigate(`/messages`)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition flex items-center"
                                >
                                    <MessageCircle className="mr-2" size={16} /> 
                                    View Messages
                                </button>
                            )}
                        </div>
                    </div>

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