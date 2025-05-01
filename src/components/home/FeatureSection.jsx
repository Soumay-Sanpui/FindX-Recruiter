import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { BrainCog, Bell, DollarSign, MapPin, LayoutDashboard, BarChart3 } from "lucide-react";

const FeatureSection = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    return (
        <section className="py-20 px-4 bg-gray-50">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-center text-gray-800 mb-16"
    >
        Key Features
    </motion.h2>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
            {
                title: "AI Skill & Keyword Matching",
                desc: "Find the perfect candidates using intelligent tech.",
                icon: BrainCog,
            },
            {
                title: "Boosted Notifications",
                desc: "Reach more candidates with targeted alerts.",
                icon: Bell,
            },
            {
                title: "Affordable Pricing",
                desc: "Competitive plans that suit your hiring goals.",
                icon: DollarSign,
            },
            {
                title: "Location-Based Matching",
                desc: "Focus your hiring based on geography.",
                icon: MapPin,
            },
            {
                title: "Modern Dashboard",
                desc: "Intuitive interface for seamless hiring management.",
                icon: LayoutDashboard,
            },
            {
                title: "Analytics & Tracking",
                desc: "Measure hiring success with real-time insights.",
                icon: BarChart3,
            },
        ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                    }}
                    onClick={() => setActiveFeature(idx === activeFeature ? null : idx)}
                    className="bg-white p-8 rounded-xl shadow cursor-pointer transform transition-all duration-300"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon className="text-primary w-6 h-6" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            {feature.title}
                        </h3>
                    </div>
                    <AnimatePresence>
                        {activeFeature === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            );
        })}
    </div>
</section>
    );
};

export default FeatureSection;