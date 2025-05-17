import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import CONFIG from '../../config/config';
import { useEmployerStore } from '../store/employer.store';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const EmployerLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);  
    const { setEmployer, setToken } = useEmployerStore();
    const [formData, setFormData] = useState({
        EmployerName: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        axios.post(`${CONFIG.apiUrl}/employer/login`, formData)
            .then((response) => {
                console.log('Login successful:', response.data);
                
                if (response.data.success) {
                    // Save token to localStorage for auth persistence
                    localStorage.setItem('employerToken', response.data.token);
                    
                    // Update store
                    setToken(response.data.token);
                    setEmployer(response.data.employer);
                    
                    navigate('/employer-dashboard');
                } else {
                    setError(response.data.message || 'Login failed');
                }
            })
            .catch((error) => {
                console.log('Login failed:', error);
                setError(
                    error.response?.data?.message || 
                    'Login failed. Please check your credentials and try again.'
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-300 via-blue-50 to-white font-poppins">
            <div className="w-full max-w-md mt-10 p-8 bg-gradient-to-bl from-gray-50 to-white shadow-xl animate-fade-in border-2 border-blue-800">
                <div className='mb-10'>
                    <h1 className="text-2xl font-bold text-center text-blue-700">Employer Login</h1>
                    <p className='text-center text-gray-500 font-poppins'>Welcome back! Please enter your details to login.</p>
                </div>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                        <input  
                            type="text"
                            name="EmployerName"
                            value={formData.EmployerName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition ${isLoading ? 'opacity-50 hover:bg-gray-400 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging In...' : 'Log In'}
                    </motion.button>
                </form>
                <p className='text-center mt-5'>Don't have an account? <Link to="/employer-signup" className='text-blue-700'>Sign up</Link></p>
            </div>
        </div>
    );
};

export default EmployerLogin;
