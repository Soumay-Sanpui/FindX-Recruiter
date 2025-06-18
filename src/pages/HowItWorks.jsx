import React from 'react';

const HowItWorks = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">How FindX Works</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Discover how our AI-powered platform simplifies your hiring process and connects you with the best talent
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple 4-Step Process</h2>
                        <p className="text-xl text-gray-600">Get started with FindX in minutes</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Account</h3>
                            <p className="text-gray-600">
                                Sign up with your company details and get verified in minutes. No complex setup required.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-700 transition-colors">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Post Your Job</h3>
                            <p className="text-gray-600">
                                Create detailed job postings with our AI-assisted writing tools. Set requirements and preferences.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-700 transition-colors">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Matches Candidates</h3>
                            <p className="text-gray-600">
                                Our AI analyzes applications and ranks candidates based on your criteria and preferences.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-700 transition-colors">
                                <span className="text-white text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Hire the Best</h3>
                            <p className="text-gray-600">
                                Review top candidates, conduct interviews, and make offers through our integrated platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                        <p className="text-xl text-gray-600">Everything you need to streamline your hiring process</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Matching</h3>
                            <p className="text-gray-600">
                                Advanced algorithms analyze candidate profiles and match them with your job requirements automatically.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Filtering</h3>
                            <p className="text-gray-600">
                                Filter candidates by skills, experience, location, and other criteria to find the perfect fit.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrated Messaging</h3>
                            <p className="text-gray-600">
                                Communicate directly with candidates through our built-in messaging system.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
                            <p className="text-gray-600">
                                Track application metrics, response rates, and hiring performance with detailed analytics.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Compliant</h3>
                            <p className="text-gray-600">
                                Enterprise-grade security and compliance with data protection regulations.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Integration</h3>
                            <p className="text-gray-600">
                                Integrate with your existing HR systems and workflows in minutes, not weeks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Hiring?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of companies already using FindX to find their perfect candidates
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/employer-signup"
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Start Free Trial
                        </a>
                        <a
                            href="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Schedule Demo
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks; 