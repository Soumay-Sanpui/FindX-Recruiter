import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const EmployerSignup = () => {
    const [formData, setFormData] = useState({
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
        EmployerEmail: '',
        EmployerDesignation: '',
        EmployerPhone: '',
        agreeToTerms: false,
        companyEmployerId: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-tr from-blue-400 via-blue-50 to-white">
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
                                    <option value="tech">Technology</option>
                                    <option value="finance">Finance</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="education">Education</option>
                                    <option value="retail">Retail</option>
                                    <option value="other">Other</option>
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
                                    <label htmlFor="companyEmployerId" className="block text-sm font-medium text-gray-700 mb-1">
                                        Employer ID
                                    </label>
                                    <input
                                        type="text"
                                        id="companyEmployerId"
                                        name="companyEmployerId"
                                        value={formData.companyEmployerId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="EmployerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                        Work Email
                                    </label>
                                    <input
                                        type="email"
                                        id="EmployerEmail"
                                        name="EmployerEmail"
                                        value={formData.EmployerEmail}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                                        required
                                    />
                                </div>
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
                            className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
                        >
                            Create Account
                        </motion.button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:text-secondary font-medium">
                                Log in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EmployerSignup;
