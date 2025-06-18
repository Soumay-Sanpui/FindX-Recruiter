import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-xl opacity-90">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Privacy Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="prose prose-lg max-w-none">
                        
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                FindX Inc. ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our hiring platform and services.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                This policy applies to all users of our platform, including employers, recruiters, and job seekers. By using our services, you consent to the data practices described in this policy.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.1 Information You Provide</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                <li>Account registration information (name, email, company details)</li>
                                <li>Profile information and company descriptions</li>
                                <li>Job postings and hiring requirements</li>
                                <li>Communications with candidates and our support team</li>
                                <li>Payment and billing information</li>
                                <li>Feedback, reviews, and survey responses</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.2 Information We Collect Automatically</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                <li>Usage data and platform interactions</li>
                                <li>Device information (IP address, browser type, operating system)</li>
                                <li>Log files and analytics data</li>
                                <li>Cookies and similar tracking technologies</li>
                                <li>Location data (general geographic location)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.3 Information from Third Parties</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Social media profile information (when you connect accounts)</li>
                                <li>Background check and verification services</li>
                                <li>Integration data from HR systems and job boards</li>
                                <li>Public business information and databases</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use the collected information for the following purposes:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Providing and maintaining our hiring platform services</li>
                                <li>Processing job postings and candidate matching</li>
                                <li>Facilitating communication between employers and candidates</li>
                                <li>Processing payments and managing subscriptions</li>
                                <li>Sending important updates and notifications</li>
                                <li>Improving our AI algorithms and platform features</li>
                                <li>Analyzing usage patterns and platform performance</li>
                                <li>Providing customer support and technical assistance</li>
                                <li>Ensuring platform security and preventing fraud</li>
                                <li>Complying with legal obligations and regulations</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Legal Basis for Processing</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We process your personal data based on the following legal grounds:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li><strong>Contract Performance:</strong> To provide services you've requested</li>
                                <li><strong>Legitimate Interests:</strong> To improve our services and ensure security</li>
                                <li><strong>Consent:</strong> For marketing communications and optional features</li>
                                <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Information Sharing and Disclosure</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may share your information in the following circumstances:
                            </p>
                            
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">5.1 With Candidates</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you post jobs or communicate with candidates, certain company information becomes visible to facilitate the hiring process.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">5.2 Service Providers</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We share data with trusted third-party service providers who assist with:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                <li>Payment processing and billing</li>
                                <li>Cloud hosting and data storage</li>
                                <li>Analytics and performance monitoring</li>
                                <li>Customer support tools</li>
                                <li>Background verification services</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">5.3 Legal Requirements</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may disclose information when required by law, court order, or government regulation, or to protect our rights and safety.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-900 mb-4">5.4 Business Transfers</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business transaction.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Data Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We implement comprehensive security measures to protect your information:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>End-to-end encryption for data transmission</li>
                                <li>Secure data centers with 24/7 monitoring</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Employee access controls and training</li>
                                <li>Multi-factor authentication options</li>
                                <li>Regular security updates and patches</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                While we strive to protect your data, no internet transmission is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Data Retention</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We retain your personal data for as long as necessary to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Provide our services and maintain your account</li>
                                <li>Comply with legal obligations and resolve disputes</li>
                                <li>Improve our AI algorithms and platform features</li>
                                <li>Maintain business records and analytics</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                You can request data deletion at any time, subject to our legal and business obligations.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Your Privacy Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Depending on your location, you may have the following rights:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                                <li><strong>Access:</strong> Request copies of your personal data</li>
                                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                                <li><strong>Restriction:</strong> Limit how we process your data</li>
                                <li><strong>Objection:</strong> Object to certain types of data processing</li>
                                <li><strong>Withdraw Consent:</strong> Revoke consent for voluntary data processing</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                To exercise these rights, please contact us using the information provided in this policy.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Cookies and Tracking</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use cookies and similar technologies to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Remember your preferences and settings</li>
                                <li>Analyze platform usage and performance</li>
                                <li>Provide personalized content and features</li>
                                <li>Ensure platform security and prevent fraud</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                You can control cookie settings through your browser preferences, though this may affect platform functionality.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. International Data Transfers</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Standard contractual clauses approved by the European Commission</li>
                                <li>Adequacy decisions for countries with appropriate protection levels</li>
                                <li>Certification schemes and codes of conduct</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us immediately.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Posting the updated policy on our website</li>
                                <li>Sending email notifications to registered users</li>
                                <li>Displaying prominent notices in our platform</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Your continued use of our services after any changes constitutes acceptance of the updated policy.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-2"><strong>FindX Inc. - Privacy Team</strong></p>
                                <p className="text-gray-700 mb-2">Email: privacy@findx.com</p>
                                <p className="text-gray-700 mb-2">Phone: (123) 456-7890</p>
                                <p className="text-gray-700 mb-4">Address: 123 Business Street, San Francisco, CA 94105</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Your Privacy?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Our privacy team is here to help you understand and control your data
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Contact Privacy Team
                        </a>
                        <a
                            href="/faq"
                            className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
                        >
                            View FAQ
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Privacy; 