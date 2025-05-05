import { Link, useLocation } from 'react-router';
import { HomeIcon, Briefcase, PlusCircle, User, Settings, LogOut } from 'lucide-react';

const DHeader = ({ employer }) => {
    const location = useLocation();
    
    const navLinks = [
        { name: 'Dashboard', path: '/employer-dashboard', icon: <HomeIcon size={18} /> },
        { name: 'My Jobs', path: '/my-jobs', icon: <Briefcase size={18} /> },
        { name: 'Post Job', path: '/post-job', icon: <PlusCircle size={18} /> },
        { name: 'Profile', path: '/profile', icon: <User size={18} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
    ];
    
    return (
        <header className="bg-white shadow-md py-4 px-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {employer?.companyLogo ? (
                        <img
                            src={employer.companyLogo}
                            alt={`${employer.companyName} logo`}
                            className="h-12 w-12 object-contain"
                        />
                    ) : (
                        <div className="h-12 w-12 bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            {employer?.companyName?.charAt(0) || 'E'}
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-gray-800">{employer?.companyName || 'Company'}</h1>
                </div>
                
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center space-x-2 ${
                                location.pathname === link.path
                                    ? 'text-blue-600 font-medium'
                                    : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>
                
                <div className="text-sm text-gray-600">
                    <p>Welcome, <span className="text-blue-600 font-semibold">{employer?.EmployerName || 'User'},</span></p>
                    <p className="text-blue-600">{employer?.EmployerDesignation || 'Employer'}</p>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden flex overflow-x-auto py-3 mt-4 -mx-8 px-8 space-x-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex flex-col items-center space-y-1 min-w-fit ${
                            location.pathname === link.path
                                ? 'text-blue-600 font-medium'
                                : 'text-gray-700'
                        }`}
                    >
                        {link.icon}
                        <span className="text-xs">{link.name}</span>
                    </Link>
                ))}
            </div>
        </header>
    )
}

export default DHeader;
