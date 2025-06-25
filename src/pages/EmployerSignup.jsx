import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import api from '../services/api';
import ToastBanner from '../components/ToastBanner';
import { useEmployerStore } from '../store/employer.store';

const EmployerSignup = () => {
    const navigate = useNavigate();
    const initialFormState = {
        password: '',
        confirmPassword: '',
        companyName: '',
        companyDescription: '',
        companyWebsite: '',
        companyLogo: '',
        companyIndustry: '',
        companySize: '',
        companyLocation: '',

        EmployerName: '',
        email: '',
        EmployerDesignation: '',
        EmployerPhone: '',
        agreeToTerms: false,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [registerdName, setRegisterdName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setEmployer } = useEmployerStore();

    // Effect to navigate to dashboard after successful registration
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/employer-login');
            }, 2000); // Navigate after 2 seconds to allow user to see success message

            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        await api.post('/employer/createAccount', formData)
            .then((response) => {
                setSuccess(true);
                setRegisterdName(response.data.employer?.companyName || formData.companyName);
                setEmployer(response.data.employer || response.data);
            })
            .catch((error) => {
                setSuccess(false);
                setError(error.response?.data?.message || "Registration failed");
            })
            .finally(() => {
                setIsLoading(false);
                resetForm(); // Clear form after successful registration
            });
    };

    return (
        <>
            {success && <ToastBanner message={`${registerdName} has been created successfully`} type="success" />}
            {error && <ToastBanner message={error} type="error" />}
            <div className="min-h-screen font-poppins pt-20 pb-12 px-4 bg-gradient-to-tr from-blue-400 via-blue-50 to-white">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white border-2 border-blue-800 shadow-lg p-8"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Employer Account</h1>
                            <p className="text-gray-600">
                                Join <span className="text-blue-800 font-bold text-3xl">FindX</span> and start hiring top talent today
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Company Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    ['companyName', 'Company Name'],
                                    ['companyWebsite', 'Company Website'],
                                    ['companyLogo', 'Company Logo URL'],
                                    ['companyLocation', 'Company Location'],
                                ].map(([name, label]) => (
                                    <div key={name}>
                                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                                            {label}
                                        </label>
                                        <input
                                            type="text"
                                            id={name}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                            required
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label htmlFor="companyIndustry" className="block text-sm font-medium text-gray-700 mb-1">
                                        Industry
                                    </label>
                                    <select
                                        id="companyIndustry"
                                        name="companyIndustry"
                                        value={formData.companyIndustry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                        required
                                    >
                                    <option value="">Select Industry</option>
                                    <option> Accounting & Finance</option>
                                    <option> Administration & Office Support</option>
                                    <option> Advertising, Arts & Media</option>
                                    <option> Agriculture, Nature & Animal</option>
                                    <option> Architecture & Interior Design</option>
                                    <option> Banking & Financial Services</option>
                                    <option> Call Centre & Customer Service</option>
                                    <option> CEO & General Management</option>
                                    <option> Community Services & Development</option>
                                    <option> Construction</option>
                                    <option> Consulting & Strategy</option>
                                    <option> Design & Creative</option>
                                    <option> Education & Training</option>
                                    <option> Engineering</option>
                                    <option> Farming, Animals & Conservation</option>
                                    <option> Government & Defence</option>
                                    <option> Healthcare & Medical</option>
                                    <option> Hospitality & Tourism</option>
                                    <option> Human Resources & Recruitment</option>
                                    <option> Information & Communication Technology (ICT)</option>
                                    <option> Insurance & Superannuation</option>
                                    <option> Legal</option>
                                    <option> Logistics, Transport & Supply Chain</option>
                                    <option> Manufacturing, Production & Operations</option>
                                    <option> Marketing & Communications</option>
                                    <option> Media, Digital & Entertainment</option>
                                    <option> Mining, Resources & Energy</option>
                                    <option> Non-Profit & Volunteering</option>
                                    <option> Real Estate & Property</option>
                                    <option> Retail & Consumer Products</option>
                                    <option> Sales</option>
                                    <option> Science & Technology</option>
                                    <option> Security & Protective Services</option>
                                    <option> Sport & Recreation</option>
                                    <option> Trades & Services</option>
                                    <option> Transport & Rail</option>
                                    <option> Utilities & Energy</option>
                                    <option> Warehousing, Storage & Distribution</option>
                                    <option> Other / Miscellaneous</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Size
                                    </label>
                                    <input
                                        type="number"
                                        id="companySize"
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                        placeholder="Number of employees"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Employer Info */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="EmployerName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="EmployerName"
                                            name="EmployerName"
                                            value={formData.EmployerName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="EmployerDesignation" className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Designation
                                        </label>
                                        <input
                                            type="text"
                                            id="EmployerDesignation"
                                            name="EmployerDesignation"
                                            value={formData.EmployerDesignation}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                            required
                                        />
                                    </div>
                                </div>


                                {/* Employer ID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Work Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                            required
                                        />
                                    </div>


                                <div>
                                    <label htmlFor="EmployerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="EmployerPhone"
                                        name="EmployerPhone"
                                        value={formData.EmployerPhone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                        required
                                        />
                                </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded outline-none"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                        I agree to the{' '}
                                        <Link to="/terms" className="text-primary hover:text-secondary">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/privacy" className="text-primary hover:text-secondary">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 bg-primary text-white font-semibold transition-colors shadow-md hover:shadow-lg flex items-center justify-center ${isLoading ? 'opacity-70' : 'hover:bg-secondary'}`}
                            >
                                {isLoading && (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </motion.button>

                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/employer-login" className="text-primary hover:text-secondary font-medium">
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default EmployerSignup;
