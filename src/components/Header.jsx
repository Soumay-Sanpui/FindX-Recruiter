import React from 'react';
import { Link } from 'react-router';

const Header = () => {
    return (
        <header className="fixed w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            FindX
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/how-it-works" className="text-gray hover:text-primary transition-colors duration-200">
                            How It Works
                        </Link>
                        <Link to="/pricing" className="text-gray hover:text-primary transition-colors duration-200">
                            Pricing
                        </Link>
                        <Link to="/features" className="text-gray hover:text-primary transition-colors duration-200">
                            Features
                        </Link>
                        <Link to="/contact" className="text-gray hover:text-primary transition-colors duration-200">
                            Contact Us
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link to="/employer-login" className="text-gray hover:text-primary transition-colors duration-200">
                            Log in
                        </Link>
                        <Link to="/employer-signup" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-secondary transition-colors duration-200">
                            Start free trial
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
