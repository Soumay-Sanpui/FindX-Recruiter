import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {useEmployerStore} from "../store/employer.store.js";

const Header = () => {
    const {employer, logout} = useEmployerStore();
    const [hasEmployer, setEmployer] = useState(false);
    const [nameInitials, setNameInitials] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const dropDownOptions = [
    {
        title: 'Dashboard',
        link: '/employer-dashboard',
    },
    {
        title: 'Settings',
        link: '/settings',
    },
    {
        title: 'Messages',
        link: '/messages',
    },
    {
        title: 'Company Profile',
        link: '/settings',
    }];

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
                        <Link to="/search-employee"
                              className="text-gray hover:text-primary transition-colors duration-200">
                            Search Employee
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
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    className={`flex items-center justify-center w-[2vw] h-[2vw] font-poppins font-bold text-white bg-gradient-to-br from-blue-700 to-teal-100 hover:bg-gradient-to-tl transition-colors duration-500 ease-out p-4 rounded-full cursor-pointer hover:opacity-90`}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <p>{nameInitials}</p>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                                        {/*<Link to="/employer-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">*/}
                                        {
                                            dropDownOptions.map((option, index) => (
                                                <Link key={index} to={option.link} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    {option.title}
                                                </Link>
                                            ))
                                        }
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
