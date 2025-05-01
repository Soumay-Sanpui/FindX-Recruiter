import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* About Section */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">About FindX</h3>
                    <p className="leading-relaxed text-gray-400">
                        Helping employers find the best talent through AI-powered matching and efficient hiring solutions.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/how-it-works" className="hover:text-white transition-colors">
                                How It Works
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" className="hover:text-white transition-colors">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/features" className="hover:text-white transition-colors">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white transition-colors">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/faq" className="hover:text-white transition-colors">
                                FAQ for Employers
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>Email: support@findx.com</li>
                        <li>Phone: (123) 456-7890</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6 mt-3 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} FindX. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
