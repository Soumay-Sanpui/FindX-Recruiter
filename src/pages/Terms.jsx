import React from 'react';

const Terms = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
                    <p className="text-xl opacity-90">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Terms Content */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="prose prose-lg max-w-none">
                        
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By accessing and using FindX ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                These Terms of Service govern your use of the FindX platform, including all tools, features, and services provided by FindX Inc. ("Company," "we," "us," or "our").
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                FindX is an AI-powered hiring platform that connects employers with job seekers. The service includes but is not limited to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Job posting and management tools</li>
                                <li>AI-powered candidate matching</li>
                                <li>Application tracking and management</li>
                                <li>Communication tools for employer-candidate interaction</li>
                                <li>Analytics and reporting features</li>
                                <li>Integration with third-party services</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. User Accounts and Responsibilities</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To use certain features of the Service, you must register for an account. You agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Provide accurate, current, and complete information during registration</li>
                                <li>Maintain and update your account information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Accept responsibility for all activities under your account</li>
                                <li>Notify us immediately of any unauthorized use of your account</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Acceptable Use Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You agree to use the Service only for lawful purposes and in accordance with these Terms. Prohibited uses include:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Posting false, misleading, or discriminatory job listings</li>
                                <li>Engaging in harassment or inappropriate communication with candidates</li>
                                <li>Collecting personal information for purposes other than legitimate hiring</li>
                                <li>Violating any applicable laws or regulations</li>
                                <li>Attempting to gain unauthorized access to the Service or other accounts</li>
                                <li>Interfering with or disrupting the Service</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Payment Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For paid services, you agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                <li>Pay all fees as specified in your chosen plan</li>
                                <li>Provide accurate billing information</li>
                                <li>Update payment information as needed</li>
                                <li>Pay for services in advance on a monthly or annual basis</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                Fees are non-refundable except as required by law or as specifically stated in our refund policy.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of FindX Inc. and its licensors. The Service is protected by copyright, trademark, and other laws.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You retain ownership of content you post, but grant us a license to use, modify, and distribute such content as necessary to provide the Service.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Privacy and Data Protection</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We comply with applicable data protection laws, including GDPR and CCPA, and implement appropriate technical and organizational measures to protect personal data.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Termination</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You may terminate your account at any time by contacting us or through your account settings. Upon termination, your right to use the Service will cease immediately.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Disclaimers and Limitations of Liability</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Indemnification</h2>
                            <p className="text-gray-700 leading-relaxed">
                                You agree to defend, indemnify, and hold harmless FindX Inc. and its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) resulting from or arising out of your use and access of the Service.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed">
                                These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700 mb-2"><strong>FindX Inc.</strong></p>
                                <p className="text-gray-700 mb-2">Email: legal@findx.com</p>
                                <p className="text-gray-700 mb-2">Phone: (123) 456-7890</p>
                                <p className="text-gray-700">Address: 123 Business Street, San Francisco, CA 94105</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of companies using FindX to find their perfect candidates
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/employer-signup"
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Start Free Trial
                        </a>
                        <a
                            href="/contact"
                            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms; 