import React from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';

const EmployerDashboard = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();

    // Redirect to login if no employer data
    React.useEffect(() => {
        if (!employer) {
            navigate('/employer-login');
        }
    }, [employer, navigate]);

    if (!employer) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md py-4 px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {employer.companyLogo ? (
                            <img 
                                src={employer.companyLogo} 
                                alt={`${employer.companyName} logo`} 
                                className="h-12 w-12 object-contain"
                            />
                        ) : (
                            <div className="h-12 w-12 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
                                {employer.companyName?.charAt(0)}
                            </div>
                        )}
                        <h1 className="text-2xl font-bold text-gray-800">{employer.companyName}</h1>
                    </div>
                    <div className="text-sm text-gray-600">
                        <p>Welcome, {employer.EmployerName}</p>
                        <p className="text-blue-600">{employer.EmployerDesignation}</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-8 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Company Info Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
                        <div className="space-y-3 text-gray-700">
                            <p><span className="font-medium">Industry:</span> {employer.companyIndustry}</p>
                            <p><span className="font-medium">Size:</span> {employer.companySize} employees</p>
                            <p><span className="font-medium">Location:</span> {employer.companyLocation}</p>
                            <p><span className="font-medium">Website:</span> <a href={employer.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{employer.companyWebsite}</a></p>
                        </div>
                    </div>

                    {/* Contact Info Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                        <div className="space-y-3 text-gray-700">
                            <p><span className="font-medium">Email:</span> {employer.EmployerEmail}</p>
                            <p><span className="font-medium">Phone:</span> {employer.EmployerPhone}</p>
                            <p><span className="font-medium">Employer ID:</span> {employer.companyEmployerId}</p>
                        </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <p className="text-3xl font-bold text-blue-700">0</p>
                                <p className="text-sm text-gray-600">Active Jobs</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <p className="text-3xl font-bold text-green-700">0</p>
                                <p className="text-sm text-gray-600">Applications</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <p className="text-3xl font-bold text-purple-700">0</p>
                                <p className="text-sm text-gray-600">Shortlisted</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                                <p className="text-3xl font-bold text-orange-700">0</p>
                                <p className="text-sm text-gray-600">Interviews</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition">
                            Post New Job
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition">
                            View Applicants
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition">
                            Edit Profile
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition">
                            View Analytics
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EmployerDashboard;
