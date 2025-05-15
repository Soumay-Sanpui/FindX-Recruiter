import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { jobAPI } from '../services/api';
import DHeader from '../components/dashboard/DHeader';
import { Plus, Briefcase, MapPin, DollarSign, Clock, Award, Users, CheckCircle, XCircle, AlertCircle, Calendar, Ban, Send } from 'lucide-react';

const MyJobs = () => {
    const { employer, isAuthenticated } = useEmployerStore();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
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

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/employer-login');
            return;
        }
        
        const fetchJobs = async () => {
            try {
                setLoading(true);
                
                const response = await jobAPI.getMyPostedJobs();
                
                if (response && response.success) {
                    setJobs(response.jobs || []);
                } else {
                    setJobs([]);
                    console.warn("No jobs data in response:", response);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(typeof error === 'string' ? error : (error.message || 'Failed to fetch jobs'));
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isAuthenticated, navigate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const handleViewApplicants = (job) => {
        setSelectedJob(job);
        setShowApplicants(true);
    };

    const handleCloseApplicants = () => {
        setShowApplicants(false);
        setSelectedJob(null);
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
        if (!selectedJob) return;
        
        try {
            const response = await jobAPI.updateApplicationStatus(
                selectedJob._id, 
                applicationId, 
                status,
                additionalData
            );
            
            if (response && response.success) {
                // Update the job in the local state
                const updatedJobs = jobs.map(job => {
                    if (job._id === selectedJob._id) {
                        const updatedApplicants = job.applicants.map(applicant => {
                            if (applicant._id === applicationId) {
                                return { 
                                    ...applicant, 
                                    status,
                                    ...(additionalData.interviewDetails && { interviewDetails: additionalData.interviewDetails }),
                                    ...(additionalData.rejectionReason && { rejectionReason: additionalData.rejectionReason }),
                                    ...(additionalData.blockReason && { 
                                        blockReason: additionalData.blockReason,
                                        isBlocked: true 
                                    })
                                };
                            }
                            return applicant;
                        });
                        
                        return { ...job, applicants: updatedApplicants };
                    }
                    return job;
                });
                
                setJobs(updatedJobs);
                
                // Update the selected job
                const updatedJob = updatedJobs.find(job => job._id === selectedJob._id);
                if (updatedJob) {
                    setSelectedJob(updatedJob);
                }
                
                // Close any open modals
                setShowInterviewModal(false);
                setShowRejectModal(false);
                setShowBlockModal(false);
                setSelectedApplicant(null);
                
                alert(`Application status updated to ${status}`);
            } else {
                alert('Failed to update application status');
            }
        } catch (error) {
            console.error('Error updating application status:', error);
            alert('Failed to update application status');
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
    
    // Function to get status badge colors
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

    // Applicant modal component
    const ApplicantsModal = () => {
        if (!selectedJob) return null;
        
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                <div className="bg-white shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                Applicants for {selectedJob.jobTitle}
                            </h2>
                            <button 
                                onClick={handleCloseApplicants}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-6 overflow-y-auto max-h-[70vh]">
                        {selectedJob.applicants && selectedJob.applicants.length > 0 ? (
                            <div className="space-y-6">
                                {selectedJob.applicants.map((applicant) => (
                                    <div 
                                        key={applicant._id} 
                                        className={`p-4 border-2 hover:border-blue-800 ${applicant.isBlocked ? 'border' : 'bg-gray-50'}`}
                                    >
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-800">
                                                    {applicant.user.name || 'Applicant Name'}
                                                </h3>
                                                <p className="text-gray-600">{applicant.user.email || 'Email not available'}</p>
                                                <p className="text-gray-500 text-sm mb-2">
                                                    Applied on: {formatDate(applicant.appliedOn || applicant.appliedAt)}
                                                </p>
                                                
                                                {/* Show interview details if status is Interview */}
                                                {applicant.status === 'Interview' && applicant.interviewDetails && (
                                                    <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded">
                                                        <h4 className="font-medium text-purple-700 text-sm">Interview Details</h4>
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
                                                
                                                {/* Show rejection reason if status is Rejected */}
                                                {applicant.status === 'Rejected' && applicant.rejectionReason && (
                                                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                                        <h4 className="font-medium text-red-700 text-sm">Rejection Reason</h4>
                                                        <p className="text-sm text-gray-600">{applicant.rejectionReason}</p>
                                                    </div>
                                                )}
                                                
                                                {/* Show block reason if applicant is blocked */}
                                                {applicant.isBlocked && applicant.blockReason && (
                                                    <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                                                        <h4 className="font-medium text-gray-700 text-sm">Block Reason</h4>
                                                        <p className="text-sm text-gray-600">{applicant.blockReason}</p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusBadgeClass(applicant.status)}`}>
                                                    {applicant.status}
                                                </span>
                                                
                                                {!applicant.isBlocked && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {applicant.status !== 'Shortlisted' && (
                                                            <button
                                                                onClick={() => updateApplicationStatus(applicant._id, 'Shortlisted')}
                                                                className="bg-gray-400 hover:bg-blue-500 text-white px-3 py-1 text-xs flex items-center"
                                                            >
                                                                <CheckCircle size={12} className="mr-1" /> Shortlist
                                                            </button>
                                                        )}
                                                        
                                                        {applicant.status !== 'Reviewed' && applicant.status !== 'Shortlisted' && (
                                                            <button
                                                                onClick={() => updateApplicationStatus(applicant._id, 'Reviewed')}
                                                                className="bg-gray-400 hover:bg-blue-500 text-white px-3 py-1 text-xs flex items-center"
                                                            >
                                                                <AlertCircle size={12} className="mr-1" /> Mark as Reviewed
                                                            </button>
                                                        )}
                                                        
                                                        {applicant.status !== 'Interview' && (
                                                            <button
                                                                onClick={() => handleOpenInterviewModal(applicant)}
                                                                className="bg-gray-400 hover:bg-blue-500 text-white px-3 py-1 text-xs flex items-center"
                                                            >
                                                                <Calendar size={12} className="mr-1" /> Schedule Interview
                                                            </button>
                                                        )}
                                                        
                                                        {applicant.status !== 'Rejected' && (
                                                            <button
                                                                onClick={() => handleOpenRejectModal(applicant)}
                                                                className="bg-gray-400 hover:bg-blue-500 text-white px-3 py-1 text-xs flex items-center"
                                                            >
                                                                <XCircle size={12} className="mr-1" /> Reject
                                                            </button>
                                                        )}
                                                        
                                                        <button
                                                            onClick={() => handleOpenBlockModal(applicant)}
                                                            className="bg-gray-400 hover:bg-blue-500 text-white px-3 py-1 text-xs flex items-center"
                                                        >
                                                            <Ban size={12} className="mr-1" /> Block
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="mx-auto w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mb-4">
                                    <Users size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No applicants yet</h3>
                                <p className="text-gray-500 mt-2">
                                    When candidates apply for this job, they'll appear here
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={handleCloseApplicants}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Interview scheduling modal
    const InterviewModal = () => {
        if (!showInterviewModal || !selectedApplicant) return null;
        
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                <div className="bg-white border-2 font-poppins border-blue-800 shadow-xl max-w-md w-full overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-800">
                                Schedule Interview
                            </h2>
                            <button 
                                onClick={handleCloseInterviewModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Candidate</p>
                            <p className="font-medium">{selectedApplicant.user.name || 'Applicant'}</p>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input 
                                type="text" 
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={interviewDetails.location}
                                onChange={(e) => setInterviewDetails({...interviewDetails, location: e.target.value})}
                                placeholder="Office address or virtual meeting link"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea 
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="px-4 py-2 border border-gray-300  shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleScheduleInterview}
                            className="px-4 py-2 bg-blue-600 text-white  shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                        >
                            <Calendar size={16} className="mr-1" /> Schedule Interview
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Rejection modal
    const RejectModal = () => {
        if (!showRejectModal || !selectedApplicant) return null;
        
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                <div className="bg-white shadow-xl max-w-md w-full overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-800">
                                Reject Candidate
                            </h2>
                            <button 
                                onClick={handleCloseRejectModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Candidate</p>
                            <p className="font-medium">{selectedApplicant.user.name || 'Applicant'}</p>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reason for rejection <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="px-4 py-2 border border-gray-300  shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRejectCandidate}
                            className="px-4 py-2 bg-red-600 text-white  shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center"
                        >
                            <XCircle size={16} className="mr-1" /> Reject Candidate
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Block modal
    const BlockModal = () => {
        if (!showBlockModal || !selectedApplicant) return null;
        
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 px-4">
                <div className="bg-white shadow-xl max-w-md w-full overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-blue-800">
                                Block Candidate
                            </h2>
                            <button 
                                onClick={handleCloseBlockModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Candidate</p>
                            <p className="font-medium">{selectedApplicant.user.name || 'Applicant'}</p>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reason for blocking <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                className="w-full p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="px-4 py-2 border border-gray-300  shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleBlockCandidate}
                            className="px-4 py-2 bg-gray-800 text-white shadow-sm text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center"
                        >
                            <Ban size={16} className="mr-1" /> Block Candidate
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white pb-[10vh]">
            <DHeader employer={employer} />
            <div className="container mx-auto px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Posted Jobs</h1>
                        <p className="text-gray-500">Manage and track all your job postings</p>
                    </div>
                    <button 
                        onClick={() => navigate('/post-job')}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Plus className="mr-2" size={20} /> Post New Job
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>{error}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white p-16 shadow-lg border-2 border-blue-800 text-center">
                        <Briefcase className="mx-auto mb-4 text-blue-600" size={64} />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Posted Yet</h2>
                        <p className="text-gray-500 mb-8">You haven't posted any jobs yet. Create your first job posting now!</p>
                        <button 
                            onClick={() => navigate('/post-job')}
                            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Plus className="mr-2" size={20} /> Post a Job
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-white p-6 shadow-lg border border-gray-200 hover:border-blue-500 transition-all">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin size={16} className="mr-2 text-blue-600" />
                                                <span>{job.jobLocation}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Briefcase size={16} className="mr-2 text-blue-600" />
                                                <span>{job.jobType}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <DollarSign size={16} className="mr-2 text-blue-600" />
                                                <span>${job.jobSalary.toLocaleString()} {job.jobSalaryType || 'Per Month'}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Award size={16} className="mr-2 text-blue-600" />
                                                <span>{job.jobExperience} Level</span>
                                            </div>
                                        </div>
                                        {job.jobBanner && (
                                            <div className="mb-4 mt-2">
                                                <img src={job.jobBanner} alt={job.jobTitle} className="w-full h-32 object-cover border border-gray-200" />
                                            </div>
                                        )}
                                        <div className="mb-4">
                                            <p className="text-gray-600 line-clamp-2">{job.jobDescription}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {job.jobSkills.map((skill, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:ml-8 flex flex-col md:items-end justify-between pt-4 md:pt-0">
                                        <div className="flex flex-col items-start md:items-end">
                                            <div className="flex items-center mb-2">
                                                <Clock size={16} className="mr-2 text-blue-600" />
                                                <span className="text-secondary text-sm text-semibold">Posted on {formatDate(job.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center mb-4">
                                                <Users size={16} className="mr-2 text-blue-600" />
                                                <span className="text-gray-600 text-sm font-medium">
                                                    {job.applicants?.length || 0} Applicant{job.applicants?.length !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                                ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <button
                                                onClick={() => handleViewApplicants(job)}
                                                className="bg-blue-700 text-white rounded-sm text-sm font-medium py-1 px-4 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                                            >
                                                <Users className="mr-1" size={16} /> 
                                                View Applicants {job.applicants?.length > 0 && `(${job.applicants.length})`}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Applicants Modal */}
            {showApplicants && <ApplicantsModal />}
            
            {/* Interview Modal */}
            {showInterviewModal && <InterviewModal />}
            
            {/* Reject Modal */}
            {showRejectModal && <RejectModal />}
            
            {/* Block Modal */}
            {showBlockModal && <BlockModal />}
        </div>
    );
};

export default MyJobs; 