import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { Plus, Users, SquarePen, ChartBar, Briefcase, Calendar, CreditCard, TrendingUp, MapPin, Clock } from 'lucide-react';
import DHeader from '../components/dashboard/DHeader';
import { useMyPostedJobs, useJobStatistics } from '../hooks/useJobs';

const EmployerDashboard = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();
    
    // Use optimized query functions for dashboard data
    const { data: myJobs = [], isLoading: jobsLoading, error: jobsError } = useMyPostedJobs();
    const { data: statistics, isLoading: statsLoading, error: statsError } = useJobStatistics();

    // Redirect to login if no employer data
    useEffect(() => {
        if (!employer) {
            navigate('/employer-login');
        }
    }, [employer, navigate]);

    if (!employer) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* Header */}
            <DHeader employer={employer} />

            {/* Main Content */}
            <main className="py-8 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Company Profile Card */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                    <Briefcase className="w-4 h-4 text-white" />
                                </div>
                                Company Profile
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-20 text-sm font-medium text-gray-500">Industry:</div>
                                    <div className="flex-1 text-sm text-gray-800 font-medium">
                                        {employer.companyIndustry || 'Not specified'}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-20 text-sm font-medium text-gray-500">Size:</div>
                                    <div className="flex-1 text-sm text-gray-800">
                                        {employer.companySize ? `${employer.companySize} employees` : 'Not specified'}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-20 text-sm font-medium text-gray-500">Location:</div>
                                    <div className="flex-1 text-sm text-gray-800">
                                        {employer.companyLocation || 'Not specified'}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-20 text-sm font-medium text-gray-500">Website:</div>
                                    <div className="flex-1 text-sm">
                                        {employer.companyWebsite ? (
                                            <a 
                                                href={employer.companyWebsite} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                                            >
                                                {employer.companyWebsite.replace(/^https?:\/\//, '')}
                                            </a>
                                        ) : (
                                            <span className="text-gray-500">Not specified</span>
                                        )}
                                    </div>
                                </div>
                                {employer.companyDescription && (
                                    <div className="pt-2 border-t border-gray-100">
                                        <div className="text-sm font-medium text-gray-500 mb-2">Description:</div>
                                        <div className="text-sm text-gray-700 leading-relaxed">
                                            {employer.companyDescription}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Card */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                                    <Users className="w-4 h-4 text-white" />
                                </div>
                                Contact Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-600 font-bold text-lg">
                                            {employer?.EmployerName?.charAt(0) || 'E'}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">
                                            {employer.EmployerName || 'Not specified'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {employer.EmployerDesignation || 'Employer'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-16 text-sm font-medium text-gray-500">Email:</div>
                                    <div className="flex-1 text-sm text-gray-800">
                                        {employer.email || employer.EmployerEmail || 'Not specified'}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-16 text-sm font-medium text-gray-500">Phone:</div> 
                                    <div className="flex-1 text-sm text-gray-800">
                                        {employer.EmployerPhone || 'Not specified'}
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-16 text-sm font-medium text-gray-500">ID:</div>
                                    <div className="flex-1 text-sm text-gray-600 font-mono">
                                        {employer.companyEmployerId || employer._id || 'Not specified'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Stats Card */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                                    <ChartBar className="w-4 h-4 text-white" />
                                </div>
                                Quick Stats
                            </h2>
                        </div>
                        <div className="p-6">
                            {statsLoading ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg text-center border border-gray-200 animate-pulse">
                                            <div className="h-8 bg-gray-200 rounded mb-1"></div>
                                            <div className="h-4 bg-gray-200 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : statsError ? (
                                <div className="text-center py-4">
                                    <p className="text-red-500 text-sm">Failed to load statistics</p>
                                    <button 
                                        onClick={() => window.location.reload()} 
                                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-700 mb-1">
                                            {myJobs.filter(job => job.status === 'Open').length}
                                        </div>
                                        <div className="text-xs text-blue-600 font-medium">Active Jobs</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center border border-green-200">
                                        <div className="text-2xl font-bold text-green-700 mb-1">
                                            {myJobs.reduce((total, job) => total + (job.applicants?.length || 0), 0)}
                                        </div>
                                        <div className="text-xs text-green-600 font-medium">Total Applications</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center border border-purple-200">
                                        <div className="text-2xl font-bold text-purple-700 mb-1">
                                            {myJobs.reduce((total, job) => {
                                                const shortlisted = job.applicants?.filter(app => app.status === 'Shortlisted').length || 0;
                                                return total + shortlisted;
                                            }, 0)}
                                        </div>
                                        <div className="text-xs text-purple-600 font-medium">Shortlisted</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center border border-orange-200">
                                        <div className="text-2xl font-bold text-orange-700 mb-1">
                                            {myJobs.reduce((total, job) => {
                                                const interviews = job.applicants?.filter(app => app.status === 'Interview').length || 0;
                                                return total + interviews;
                                            }, 0)}
                                        </div>
                                        <div className="text-xs text-orange-600 font-medium">Interviews</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Market Insights Section */}
                {statistics && (
                    <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                Market Insights
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">Current job market trends and statistics</p>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Total Jobs in Market */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-blue-700">
                                                {statistics.totalJobs?.toLocaleString() || '0'}
                                            </div>
                                            <div className="text-sm text-blue-600 font-medium">Total Jobs</div>
                                        </div>
                                        <Briefcase className="w-8 h-8 text-blue-600" />
                                    </div>
                                </div>

                                {/* Recent Jobs */}
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-green-700">
                                                {statistics.recentJobs?.toLocaleString() || '0'}
                                            </div>
                                            <div className="text-sm text-green-600 font-medium">New This Week</div>
                                        </div>
                                        <Clock className="w-8 h-8 text-green-600" />
                                    </div>
                                </div>

                                {/* Top Categories */}
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-purple-700">
                                                {statistics.jobsByCategory?.length || '0'}
                                            </div>
                                            <div className="text-sm text-purple-600 font-medium">Job Categories</div>
                                        </div>
                                        <ChartBar className="w-8 h-8 text-purple-600" />
                                    </div>
                                </div>

                                {/* Top Locations */}
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-2xl font-bold text-orange-700">
                                                {statistics.jobsByLocation?.length || '0'}
                                            </div>
                                            <div className="text-sm text-orange-600 font-medium">Active Locations</div>
                                        </div>
                                        <MapPin className="w-8 h-8 text-orange-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Top Categories Breakdown */}
                            {statistics.jobsByCategory && statistics.jobsByCategory.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Job Categories</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {statistics.jobsByCategory.slice(0, 6).map((category, index) => (
                                            <div key={category._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mr-3">
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{category._id}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 font-medium">{category.count} jobs</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions Section */}
                <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                                <SquarePen className="w-4 h-4 text-white" />
                            </div>
                            Quick Actions
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">Manage your recruitment process efficiently</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <button 
                                onClick={() => navigate('/post-job')} 
                                className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-600 hover:to-blue-700 border border-blue-200 hover:border-blue-600 text-blue-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <Plus className="w-6 h-6" />
                                <span className="text-sm font-medium">Post a New Job</span>
                            </button>
                            <button 
                                onClick={() => navigate('/search-employee')} 
                                className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-600 hover:to-green-700 border border-green-200 hover:border-green-600 text-green-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <Users className="w-6 h-6" />
                                <span className="text-sm font-medium">Search Candidates</span>
                            </button>
                            <button 
                                onClick={() => navigate('/interview-management')} 
                                className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-600 hover:to-purple-700 border border-purple-200 hover:border-purple-600 text-purple-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <Calendar className="w-6 h-6" />
                                <span className="text-sm font-medium">View Interviews</span>
                            </button>
                            <button 
                                onClick={() => navigate('/payment-history')} 
                                className="group bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-600 hover:to-orange-700 border border-orange-200 hover:border-orange-600 text-orange-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <CreditCard className="w-6 h-6" />
                                <span className="text-sm font-medium">Payment History</span>
                            </button>
                            <button 
                                onClick={() => navigate('/settings')}
                                className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-600 hover:to-gray-700 border border-gray-200 hover:border-gray-600 text-gray-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <SquarePen className="w-6 h-6" />
                                <span className="text-sm font-medium">Edit Profile</span>
                            </button>
                            <button 
                                className="group bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-600 hover:to-indigo-700 border border-indigo-200 hover:border-indigo-600 text-indigo-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <ChartBar className="w-6 h-6" />
                                <span className="text-sm font-medium">View Analytics</span>
                            </button>
                            <button 
                                onClick={() => navigate('/my-jobs')} 
                                className="group bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-600 hover:to-teal-700 border border-teal-200 hover:border-teal-600 text-teal-700 hover:text-white py-4 px-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2 hover:shadow-lg transform hover:scale-105"
                            >
                                <Briefcase className="w-6 h-6" />
                                <span className="text-sm font-medium">View Posted Jobs</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerDashboard;
