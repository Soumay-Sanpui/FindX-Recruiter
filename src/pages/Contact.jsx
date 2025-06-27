import React, { useState } from 'react';
import { contactAPI } from '../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        error: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

        try {
            const response = await contactAPI.submitContactForm(formData);
            
            // Success
            setFormStatus({ 
                isSubmitting: false, 
                isSubmitted: true, 
                error: null 
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                company: '',
                subject: '',
                message: ''
            });

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                setFormStatus(prev => ({ ...prev, isSubmitted: false }));
            }, 5000);

        } catch (error) {
            setFormStatus({ 
                isSubmitting: false, 
                isSubmitted: false, 
                error: error.message || 'Failed to send message. Please try again.' 
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center my-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Connect with FindX
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to transform your hiring process? Let's discuss how FindX can help you find exceptional talent faster and more efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white border border-blue-800 shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's Start the Conversation</h2>
                        
                        {/* Status Messages */}
                        {formStatus.isSubmitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                                </div>
                                <p className="text-green-700 text-sm mt-1">We'll get back to you within 24 hours.</p>
                            </div>
                        )}
                        
                        {formStatus.error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-800 font-medium">Error sending message</p>
                                </div>
                                <p className="text-red-700 text-sm mt-1">{formStatus.error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your.email@company.com"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your company name"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    What can we help you with? *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select your inquiry type</option>
                                    <option value="demo">Request a Demo</option>
                                    <option value="pricing">Pricing & Plans</option>
                                    <option value="enterprise">Enterprise Solutions</option>
                                    <option value="partnership">Partnership Opportunities</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="general">General Questions</option>
                                    <option value="feedback">Product Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tell us about your hiring needs *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Share details about your hiring challenges, team size, industry, or any specific requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus.isSubmitting}
                                className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 ${
                                    formStatus.isSubmitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                                } text-white`}
                            >
                                {formStatus.isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    'Start the Conversation'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information - Compact Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Sales Team</h3>
                                    <p className="text-blue-600 text-sm">sales@findx.com</p>
                                    <p className="text-gray-500 text-xs">Enterprise & partnerships</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Support</h3>
                                    <p className="text-green-600 text-sm">support@findx.com</p>
                                    <p className="text-gray-500 text-xs">Technical assistance</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                                    <p className="text-purple-600 text-sm">+1 (555) 123-4567</p>
                                    <p className="text-gray-500 text-xs">Mon-Fri 8AM-8PM EST</p>
                                </div>
                                
                                <div className="bg-blue-50 rounded-lg p-3 mt-4">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-blue-800 font-medium text-xs">Response within 4 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Compact FAQ */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick FAQ</h2>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-medium text-gray-900 text-sm mb-1">How fast can I start?</h3>
                                    <p className="text-gray-600 text-xs">5-minute setup, immediate job posting</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 text-sm mb-1">What's included?</h3>
                                    <p className="text-gray-600 text-xs">Unlimited posts, messaging, analytics</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 text-sm mb-1">Need a demo?</h3>
                                    <p className="text-gray-600 text-xs">Custom demos available for teams</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3">
                                    <p className="text-blue-800 font-medium text-xs mb-1">Ready to start?</p>
                                    <p className="text-blue-700 text-xs">Fill out the form or email us directly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 