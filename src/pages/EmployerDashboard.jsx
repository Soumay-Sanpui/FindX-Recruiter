import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { Plus, Users, SquarePen, ChartBar, Briefcase } from 'lucide-react';
import DHeader from '../components/dashboard/DHeader';

const EmployerDashboard = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();

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
                    {/* Company Info Card */}
                    <div className="bg-white p-6 shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
                        <div className="space-y-3 text-gray-700">
                            <p><span className="font-medium">Industry:</span> <span className='uppercase'>{employer.companyIndustry || 'Not specified'}</span></p>
                            <p><span className="font-medium">Size:</span> <span className='uppercase'>{employer.companySize || 0} employees</span></p>
                            <p><span className="font-medium">Location:</span> {employer.companyLocation || 'Not specified'}</p>
                            <p><span className="font-medium">Website:</span> {employer.companyWebsite ? (
                                <a href={employer.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {employer.companyWebsite}
                                </a>
                            ) : 'Not specified'}</p>
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white p-6 shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                        <div className="space-y-3 text-gray-700">
                            <p><span className="font-medium">Email:</span> {employer.EmployerEmail || 'Not specified'}</p>
                            <p><span className="font-medium">Phone:</span> {employer.EmployerPhone || 'Not specified'}</p>
                            <p><span className="font-medium">Employer ID:</span> {employer.companyEmployerId || 'Not specified'}</p>
                        </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white p-6 shadow-md hover:border hover:border-blue-800">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-sec p-4 text-center">
                                <p className="text-3xl font-bold text-blue-700">0</p>
                                <p className="text-sm text-gray-600">Active Jobs</p>
                            </div>
                            <div className="bg-gray-light p-4 text-center">
                                <p className="text-3xl font-bold text-green-700">0</p>
                                <p className="text-sm text-gray-600">Applications</p>
                            </div>
                            <div className="bg-gray-light p-4 text-center">
                                <p className="text-3xl font-bold text-purple-700">0</p>
                                <p className="text-sm text-gray-600">Shortlisted</p>
                            </div>
                            <div className="bg-gray-light p-4 text-center">
                                <p className="text-3xl font-bold text-orange-700">0</p>
                                <p className="text-sm text-gray-600">Interviews</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="mt-8 bg-white p-6 shadow-md border border-blue-800">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <button onClick={() => navigate('/post-job')} className="bg-gray-200 hover:bg-blue-700 hover:text-white text-secondary py-3 px-4 transition flex items-center justify-center">
                            <Plus className="mr-2" /> Post New Job
                        </button>
                        {/* <button onClick={() => navigate('/my-jobs')} className="bg-gray-200 hover:bg-blue-700 hover:text-white text-secondary py-3 px-4 transition flex items-center justify-center">
                            <Users className="mr-2" /> View Applicants
                        </button> */}
                        <button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-secondary py-3 px-4 transition flex items-center justify-center">
                            <SquarePen className="mr-2" /> Edit Profile
                        </button>
                        <button className="bg-gray-200 hover:bg-blue-700 hover:text-white text-secondary py-3 px-4 transition flex items-center justify-center">
                            <ChartBar className="mr-2" /> View Analytics
                        </button>
                        <button onClick={() => navigate('/my-jobs')} className="bg-gray-200 hover:bg-blue-700 hover:text-white text-secondary py-3 px-4 transition flex items-center justify-center">
                            <Briefcase className="mr-2" />  View Posted Jobs
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerDashboard;
