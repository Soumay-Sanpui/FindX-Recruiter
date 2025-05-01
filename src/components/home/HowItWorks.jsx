import React from "react";
import { Building, FilePlus, Target, Inbox } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Create your Company Profile",
    description: "Set up your company profile to showcase your brand and culture.",
    icon: <Building className="w-6 h-6" />,
  },
  {
    title: "Post your Job in Minutes",
    description: "Create and manage job listings easily with our intuitive interface.",
    icon: <FilePlus className="w-6 h-6" />,
  },
  {
    title: "Reach the Right Candidates",
    description: "Our AI matches your job with the most relevant candidates.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "Manage Applications Effortlessly",
    description: "Track and manage all job applications in one dashboard.",
    icon: <Inbox className="w-6 h-6" />,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-gray-800 mb-16"
      >
        How It Works
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, backgroundColor: "#EBF5FF" }}
            className="bg-blue-50 p-8 rounded-xl text-center cursor-pointer transition-all"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-5"
            >
              {step.icon}
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
