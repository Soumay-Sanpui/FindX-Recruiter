import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const PricingSection = () => {
    const pricingPlans = [
        {
            name: 'Standard Listing',
            price: 49,
            regularPrice: 199,
            isEarlyBird: true,
            features: [
                'Post a single job listing',
                'Standard visibility in search results',
                'Basic candidate filtering',
                'Standard support',
                '30-day listing duration'
            ]
        }
    ];
    
    const notificationPackages = [
        {
            title: 'Notify 100 Candidates',
            options: [
                { type: 'App Only', price: 49 },
                { type: 'Email Only', price: 49 },
                { type: 'Both', price: 69, savings: 29 }
            ]
        },
        {
            title: 'Notify 250 Candidates',
            options: [
                { type: 'App Only', price: 99 },
                { type: 'Email Only', price: 99 },
                { type: 'Both', price: 129, savings: 69 }
            ]
        },
        {
            title: 'Notify 500 Candidates',
            options: [
                { type: 'App Only', price: 149 },
                { type: 'Email Only', price: 149 },
                { type: 'Both', price: 189, savings: 109 }
            ]
        },
        {
            title: 'Notify 750 Candidates',
            options: [
                { type: 'App Only', price: 199 },
                { type: 'Email Only', price: 199 },
                { type: 'Both', price: 249, savings: 149 }
            ]
        },
        {
            title: 'Notify 1000 Candidates',
            options: [
                { type: 'App Only', price: 249 },
                { type: 'Email Only', price: 249 },
                { type: 'Both', price: 299, savings: 199 }
            ]
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-16 px-4 bg-gradient-to-br from-white to-blue-50"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ y: -20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                    >
                        Pricing Plans
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                    >
                        Choose the perfect plan for your hiring needs. We offer flexible options for businesses of all sizes.
                    </motion.p>
                </div>

                {/* Standard Listing */}
                <div className="mb-16">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 max-w-2xl mx-auto"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                        {plan.isEarlyBird && (
                                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium mt-2">Early Bird Price</span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-primary">${plan.price}</div>
                                        {plan.isEarlyBird && (
                                            <div className="text-sm text-gray-500 line-through">Later ${plan.regularPrice}</div>
                                        )}
                                        <div className="text-sm text-gray-500">per job listing</div>
                                    </div>
                                </div>

                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check size={18} className="mr-2 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8">
                                    <Link to="/post-job" className="block w-full py-3 px-4 bg-primary text-white text-center rounded-lg font-medium hover:bg-blue-600 transition-colors">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Notification Packages */}
                <div>
                    <motion.h3
                        initial={{ y: -20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-gray-800 text-center mb-8"
                    >
                        Boosted Notifications Packages
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notificationPackages.map((pkg, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100"
                            >
                                <div className="bg-blue-50 py-4 px-6 border-b border-blue-100">
                                    <h4 className="text-xl font-bold text-gray-800">{pkg.title}</h4>
                                </div>
                                <div className="p-6">
                                    {pkg.options.map((option, i) => (
                                        <div key={i} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-gray-700">{option.type}</span>
                                                <span className="text-xl font-bold text-primary">${option.price}</span>
                                            </div>
                                            {option.savings && (
                                                <div className="text-sm text-green-600 font-medium">
                                                    Save ${option.savings}
                                                </div>
                                            )}
                                            <button className="mt-3 w-full py-2 px-4 bg-blue-100 text-primary rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
                                                Select Option
                                                <ChevronRight size={16} className="ml-1" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default PricingSection; 