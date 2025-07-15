import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { useMyPostedJobs } from '../hooks/useJobs';
import DHeader from '../components/dashboard/DHeader';
import { Plus, Briefcase, MapPin, DollarSign, Clock, Users, MessageCircle, Calendar } from 'lucide-react';

const MyJobs = () => {
    const { employer, isAuthenticated } = useEmployerStore();
    const navigate = useNavigate();

    // Use React Query hooks instead of manual state management
    const { data: jobs = [], isLoading: loading, error } = useMyPostedJobs();

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/employer-login');
        return null;
                }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatCurrency = (amount) => {
        if (!amount) return '0';
        return new Intl.NumberFormat('en-US').format(amount);
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
                    <div className="flex gap-3">
                        <button 
                            onClick={() => navigate('/interview-management')}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            <Calendar className="mr-2" size={20} /> View Interviews
                        </button>
                        <button 
                            onClick={() => navigate('/post-job')}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Plus className="mr-2" size={20} /> Post a New Job
                        </button>
                    </div>
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
                            <Plus className="mr-2" size={20} /> Post a New Job
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-white p-6 shadow-lg border border-gray-200 hover:border-blue-500 transition-all">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-3">
                                            {/* Company Logo */}
                                            {(job.companyLogo || employer?.companyLogo) && (
                                                <div className="flex-shrink-0">
                                                    <img 
                                                        src={job.companyLogo || employer?.companyLogo} 
                                                        alt={employer?.companyName || 'Company Logo'}
                                                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            
                                            {/* Job Title */}
                                            <div className="flex-1">
                                                <h2 className="text-xl font-bold text-gray-800">{job.jobTitle}</h2>
                                                {employer?.companyName && (
                                                    <p className="text-sm text-gray-600 mt-1">{employer.companyName}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin size={16} className="mr-2 text-blue-600" />
                                                <span className="text-sm">{job.jobLocation}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Briefcase size={16} className="mr-2 text-blue-600" />
                                                <span className="text-sm">{job.workType}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <DollarSign size={16} className="mr-2 text-blue-600" />
                                                <span className="text-sm">
                                                    {job.currency} {formatCurrency(job.from)} - {formatCurrency(job.to)}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users size={16} className="mr-2 text-blue-600" />
                                                <span className="text-sm">
                                                    {job.applicants?.length || 0} Applicant{job.applicants?.length !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center text-gray-500 text-sm mb-3">
                                            <Clock size={14} className="mr-2" />
                                            <span>Posted on {formatDate(job.createdAt)}</span>
                                        </div>
                                        
                                        {/* Show few skills as tags */}
                                        {job.jobSkills && job.jobSkills.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {job.jobSkills.slice(0, 3).map((skill, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                                {job.jobSkills.length > 3 && (
                                                    <span className="text-xs text-gray-500 px-2 py-1">
                                                        +{job.jobSkills.length - 3} more
                                                    </span>
                                                )}
                                        </div>
                                        )}
                                    </div>
                                    
                                    <div className="md:ml-8 flex flex-col md:items-end justify-between pt-4 md:pt-0">
                                        <div className="flex flex-col items-start md:items-end mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium mb-2 
                                                ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => navigate(`/job-details/${job._id}`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                                            >
                                                <Briefcase className="mr-1" size={16} /> 
                                                View Details
                                            </button>

                                            <button
                                                // TODO: Implement boost functionality
                                                onClick={()=> alert('Boosting feature coming soon!')}
                                                className="bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                                            >
                                                Boost Job
                                            </button>
                                            
                                            {job.applicants?.length > 0 && (
                                                <button
                                                    onClick={() => navigate(`/job-details/${job._id}`)}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                                                >
                                                    <Users className="mr-1" size={16} /> 
                                                    {job.applicants.length} Applicant{job.applicants.length !== 1 ? 's' : ''}
                                                </button>
                                            )}
                                            
                                            {/* View Messages button - show for all jobs with applicants */}
                                            {job.applicants?.length > 0 && (
                                                <button
                                                    onClick={() => navigate(`/messages/${job._id}`)}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium py-2 px-4 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center"
                                                >
                                                    <MessageCircle className="mr-1" size={16} /> 
                                                    Messages
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobs; 