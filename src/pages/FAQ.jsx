import React, { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How does FindX's AI matching work?",
            answer: "Our AI analyzes candidate profiles, skills, experience, and preferences to match them with your job requirements. It considers factors like skill relevance, experience level, location preferences, and cultural fit indicators to provide you with ranked candidates based on compatibility scores."
        },
        {
            question: "What is the cost of using FindX?",
            answer: "FindX offers flexible pricing plans starting from a free tier for small businesses. Our paid plans include Basic ($29/month), Professional ($79/month), and Enterprise (custom pricing). Each plan offers different features and job posting limits. Visit our pricing page for detailed information."
        },
        {
            question: "How quickly can I start receiving applications?",
            answer: "Once you post a job, it goes live immediately on our platform. You can typically start receiving applications within hours. Our AI begins matching candidates as soon as your job is posted, and qualified candidates are notified about relevant opportunities."
        },
        {
            question: "Can I integrate FindX with my existing HR system?",
            answer: "Yes! FindX offers comprehensive API integration and webhooks that allow you to connect with popular HR systems like Workday, BambooHR, ADP, and others. Our Enterprise plan includes dedicated integration support and custom API development."
        },
        {
            question: "How do I ensure the quality of candidates?",
            answer: "FindX uses advanced filtering and AI matching to ensure candidate quality. You can set specific requirements for skills, experience, education, and location. Our verification system also helps confirm candidate credentials and our rating system provides feedback from previous employers."
        },
        {
            question: "What support do you provide for new employers?",
            answer: "We offer comprehensive onboarding support including setup assistance, best practices training, and dedicated customer success managers for higher-tier plans. Our support team is available via chat, email, and phone to help you get the most out of the platform."
        },
        {
            question: "Can I post multiple jobs simultaneously?",
            answer: "Yes, you can post multiple jobs based on your plan limits. Basic plan allows 3 active jobs, Professional allows 10, and Enterprise has unlimited job postings. You can manage all your jobs from a single dashboard with bulk actions available."
        },
        {
            question: "How does the interview scheduling feature work?",
            answer: "Our integrated scheduling system allows you to set your availability, send calendar invites, and automatically sync with popular calendar applications. Candidates can book available slots directly, and both parties receive automated reminders and meeting links."
        },
        {
            question: "Is my company data secure on FindX?",
            answer: "Absolutely. We use enterprise-grade security with SOC 2 Type II compliance, end-to-end encryption, and regular security audits. Your data is stored in secure, geographically distributed data centers with 99.9% uptime guarantee."
        },
        {
            question: "Can I customize the application process?",
            answer: "Yes, you can create custom application forms with specific questions, require certain documents, set up multi-stage processes, and define your own hiring workflows. You can also add screening questions and skills assessments."
        },
        {
            question: "How do I track the performance of my job postings?",
            answer: "FindX provides detailed analytics including view counts, application rates, candidate quality scores, time-to-hire metrics, and conversion rates. You can track performance across different job boards and optimize your postings based on data insights."
        },
        {
            question: "What happens to candidate data after hiring?",
            answer: "Candidate data is retained according to your preferences and local regulations. You can export candidate information, maintain it for future opportunities, or have it automatically purged after a specified period. We comply with GDPR, CCPA, and other privacy regulations."
        },
        {
            question: "Do you offer training for my hiring team?",
            answer: "Yes, we provide comprehensive training materials, video tutorials, live webinars, and personalized training sessions for your team. Enterprise customers receive dedicated training sessions and ongoing support to ensure maximum platform utilization."
        },
        {
            question: "Can I get a demo before signing up?",
            answer: "Absolutely! We offer personalized demos where our team will walk you through the platform, show you relevant features, and answer any specific questions about your hiring needs. You can schedule a demo through our contact page or request one during signup."
        },
        {
            question: "What if I need to cancel my subscription?",
            answer: "You can cancel your subscription at any time without penalties. Your account will remain active until the end of your current billing period. We also offer the option to pause your subscription if you need a temporary break from hiring."
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl opacity-90">
                        Find answers to common questions about using FindX for your hiring needs
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <button
                                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                            {faq.question}
                                        </h3>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transition-transform ${
                                                openIndex === index ? 'rotate-180' : ''
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4 bg-gray-50">
                                        <p className="text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Still have questions?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Our support team is here to help you succeed with FindX
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Contact Support
                        </a>
                        <a
                            href="/employer-signup"
                            className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                        >
                            Start Free Trial
                        </a>
                    </div>

                    {/* Quick Contact Info */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                            <p className="text-gray-600">support@findx.com</p>
                            <p className="text-sm text-gray-500">24/7 response time</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                            <p className="text-gray-600">(123) 456-7890</p>
                            <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                            <p className="text-gray-600">Available in dashboard</p>
                            <p className="text-sm text-gray-500">Instant support</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ; 