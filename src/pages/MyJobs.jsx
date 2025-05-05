import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { jobAPI } from '../services/api';
import DHeader from '../components/dashboard/DHeader';
import { Plus, Briefcase, MapPin, DollarSign, Clock, Award, Users } from 'lucide-react';

const MyJobs = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!employer || !employer._id) {
                setLoading(false);
                setError('Please log in to view your posted jobs');
                return;
            }

            try {
                setLoading(true);
                console.log("Fetching jobs for employer ID:", employer._id);
                
                const response = await jobAPI.getMyPostedJobs(employer._id);
                console.log("API response:", response);
                
                if (response && response.jobs) {
                    setJobs(response.jobs);
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
    }, [employer]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
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
                                                <span>${job.jobSalary.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Award size={16} className="mr-2 text-blue-600" />
                                                <span>{job.jobExperience} Level</span>
                                            </div>
                                        </div>
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
                                                <span className="text-gray-600 text-sm">{job.applicants?.length || 0} Applicants</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                                ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <button 
                                                onClick={() => navigate(`/jobs/${job._id}`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-4 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                View Details
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/jobs/${job._id}/applicants`)}
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1 px-4 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            >
                                                View Applicants
                                            </button>
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