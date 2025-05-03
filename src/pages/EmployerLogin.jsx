import { useState } from 'react';
import axios from 'axios';
import CONFIG from '../../config/config';
import ToastBanner from '../components/ToastBanner';

const EmployerLogin = () => {
    const [formData, setFormData] = useState({
        companyEmployerId: '',
        EmployerEmail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${CONFIG.apiUrl}/employer/login`, formData)
            .then((response) => {
                console.log('Login successful:', response.data);
                // navigate('/employer-dashboard');
            })
            .catch((error) => {
                console.log('Login failed:', error);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Employer Login</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Employer ID</label>
                        <input  
                            type="text"
                            name="companyEmployerId"
                            value={formData.companyEmployerId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter Employer ID"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="EmployerEmail"
                            value={formData.EmployerEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter Email Address"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployerLogin;
