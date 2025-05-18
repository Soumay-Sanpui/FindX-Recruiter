import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HowItWorksSection from '../components/home/HowItWorks';
import FeatureSection from '../components/home/FeatureSection';
import PricingSection from '../components/home/PricingSection';
import {useEmployerStore} from "../store/employer.store.js";

const Home = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    const {employer, token} = useEmployerStore();

    return (
        <div>
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-blue-100 via-blue-50 to-white py-20 px-4 text-center relative overflow-hidden"
            >
                <motion.div 
                    animate={{ 
                        scale: [1, 1.02, 1],
                        transition: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-5 z-0"
                />
                <div className="max-w-4xl py-16 mx-auto relative z-10">
                    <motion.h1 
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight"
                    >
                        Hire Smarter with <br className="hidden sm:block" />
                        <motion.span 
                            className="text-primary"
                            whileHover={{ scale: 1.05 }}
                        >
                            FindX
                        </motion.span>
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 mb-10"
                    >
                        Post jobs, reach top candidates, and grow your team effortlessly.
                    </motion.p>
                    {/* should come in single line with flex */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-row items-center justify-center gap-4"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                           <Link to={(employer && token) ? "/post-job" : "/employer-signup"} className="px-8 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-secondary transition-all shadow-md hover:shadow-lg inline-flex items-center">
                                <span>Post a Job</span>
                                <ChevronDown className="ml-2 h-5 w-5" />
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/employer-signup" className="px-8 py-4 bg-white text-primary border border-primary text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
                                Create Account
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* Features Section */}
            <FeatureSection />

            {/* Pricing Section */}
            <PricingSection />

            {/* Final CTA Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-20 px-4 bg-primary text-white text-center relative overflow-hidden"
            >
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        transition: { duration: 3, repeat: Infinity }
                    }}
                    className="absolute inset-0 bg-[url('/cta-pattern.svg')] opacity-10"
                />
                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.h2 
                        initial={{ y: -20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-6"
                    >
                        Ready to Find Your Next Great Hire?
                    </motion.h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/employer-signup" className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg">
                            Post Your First Job Today
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
