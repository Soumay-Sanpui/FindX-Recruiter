import React, {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useEmployerStore} from "../store/employer.store.js";
import config from "../../config/config.js"

const Header = () => {
    const {employer} = useEmployerStore();
    const [hasEmployer, setEmployer] = useState(false);
    const [nameInitials, setNameInitials] = useState('');
    useEffect(() => {
        if (employer) {
            setEmployer(true);
            if (employer.EmployerName && employer.EmployerName.length > 0) {
                setNameInitials(employer.EmployerName.at(0).toUpperCase());
            }
        }
    }, [employer]);
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
                            </div>
                        ) : (
                            <div className={`flex items-center justify-center w-[2vw] h-[2vw] font-poppins font-bold bg-gradient-to-br ${config.gradients[nameInitials]} p-4 border rounded-full`}>
                                <p>{nameInitials}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
