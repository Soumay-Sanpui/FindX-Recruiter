import React, {useEffect, useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router';
import {useEmployerStore} from "../store/employer.store.js";
import config from "../../config/config.js"

const Header = () => {
    const {employer, logout} = useEmployerStore();
    const [hasEmployer, setEmployer] = useState(false);
    const [nameInitials, setNameInitials] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (employer) {
            setEmployer(true);
            if (employer.EmployerName && employer.EmployerName.length > 0) {
                setNameInitials(employer.EmployerName.at(0).toUpperCase());
            }
        }
    }, [employer]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/employer-login');
        setShowDropdown(false);
    };

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
                        <Link to="/how-it-works"
                              className="text-gray hover:text-primary transition-colors duration-200">
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

                    {
                        !hasEmployer ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/employer-login"
                                      className="text-gray hover:text-primary transition-colors duration-200">
                                    Log in
                                </Link>
                                <Link to="/employer-signup"
                                      className="px-4 py-2 rounded-md bg-primary text-white hover:bg-secondary transition-colors duration-200">
                                    Start free trial
                                </Link>
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <div 
                                    className={`flex items-center justify-center w-[2vw] h-[2vw] font-poppins font-bold bg-gradient-to-br ${config.gradients[nameInitials]} p-4 border rounded-full cursor-pointer hover:opacity-90 transition-opacity duration-200`}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <p>{nameInitials}</p>
                                </div>
                                
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                                        <Link to="/employer-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Dashboard
                                        </Link>
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </Link>
                                        <Link to="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Messages
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
