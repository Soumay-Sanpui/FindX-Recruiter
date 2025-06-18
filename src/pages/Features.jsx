import React from 'react';

const Features = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Powerful Features for Modern Hiring</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Discover all the tools and features that make FindX the most comprehensive hiring platform for employers
                    </p>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
                        <p className="text-xl text-gray-600">Everything you need to hire the best talent</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* AI-Powered Matching */}
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered Candidate Matching</h3>
                                <p className="text-gray-600 mb-4">
                                    Our advanced AI algorithms analyze candidate profiles, skills, and experience to automatically match them with your job requirements. Get ranked candidates based on compatibility scores.
                                </p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Intelligent skill matching</li>
                                    <li>• Experience level analysis</li>
                                    <li>• Cultural fit assessment</li>
                                    <li>• Real-time candidate scoring</li>
                                </ul>
                            </div>
                        </div>

                        {/* Smart Job Posting */}
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Job Posting</h3>
                                <p className="text-gray-600 mb-4">
                                    Create compelling job posts with AI-assisted writing tools. Our platform suggests improvements and optimizations to attract the best candidates.
                                </p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• AI writing assistant</li>
                                    <li>• Template library</li>
                                    <li>• SEO optimization</li>
                                    <li>• Multi-platform posting</li>
                                </ul>
                            </div>
                        </div>

                        {/* Advanced Analytics */}
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Advanced Analytics & Insights</h3>
                                <p className="text-gray-600 mb-4">
                                    Track your hiring performance with detailed analytics. Get insights into application trends, candidate quality, and hiring funnel efficiency.
                                </p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Application tracking</li>
                                    <li>• Hiring funnel analysis</li>
                                    <li>• Time-to-hire metrics</li>
                                    <li>• Custom reporting</li>
                                </ul>
                            </div>
                        </div>

                        {/* Integrated Communication */}
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Integrated Communication</h3>
                                <p className="text-gray-600 mb-4">
                                    Streamline candidate communication with built-in messaging, email templates, and automated responses. Never miss a conversation.
                                </p>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Real-time messaging</li>
                                    <li>• Email templates</li>
                                    <li>• Automated responses</li>
                                    <li>• Interview scheduling</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Features</h2>
                        <p className="text-xl text-gray-600">Advanced tools for enterprise-level hiring</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Interview Integration</h3>
                            <p className="text-gray-600">
                                Conduct video interviews directly within the platform. Record, review, and share interviews with your team.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Collaboration</h3>
                            <p className="text-gray-600">
                                Collaborate with your hiring team through shared notes, ratings, and decision-making workflows.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Background Checks</h3>
                            <p className="text-gray-600">
                                Integrate with background check providers for seamless candidate verification and compliance.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Workflows</h3>
                            <p className="text-gray-600">
                                Create custom hiring workflows that match your company's unique processes and requirements.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">API Integration</h3>
                            <p className="text-gray-600">
                                Connect FindX with your existing HR systems through our comprehensive API and webhooks.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Security</h3>
                            <p className="text-gray-600">
                                Enterprise-grade security with SOC 2 compliance, SSO integration, and advanced access controls.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Features */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Mobile-First Experience</h2>
                        <p className="text-xl text-gray-600">Manage your hiring on the go</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">Hire From Anywhere</h3>
                            <p className="text-lg text-gray-600 mb-8">
                                Our mobile app gives you full access to all FindX features. Review candidates, schedule interviews, and communicate with your team from anywhere.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Real-time Notifications</h4>
                                        <p className="text-gray-600">Get instant alerts for new applications and candidate updates</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Quick Actions</h4>
                                        <p className="text-gray-600">Approve, reject, or shortlist candidates with a single tap</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Offline Access</h4>
                                        <p className="text-gray-600">View candidate profiles and make decisions even without internet</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 inline-block">
                                <div className="w-64 h-64 bg-gray-300 rounded-2xl flex items-center justify-center">
                                    <span className="text-gray-600 text-lg">Mobile App Preview</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Experience All Features Today</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Start your free trial and discover how FindX can transform your hiring process
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
                            Request Demo
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Features; 