import { useEffect, useState } from 'react';

const ToastBanner = ({ message, type }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setVisible(true); // Show the toast

        const timer = setTimeout(() => {
            setVisible(false); // Hide after 3s
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, type]); // Run effect whenever message or type changes

    if (!visible) return null;

    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
            toast-banner ${type === 'success' ? 'bg-gray-200/50' : 'bg-red-500'} 
            mb-2 font-poppins p-2 text-center border 
            ${type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <span className="mr-2">{type === 'success' ? '🎉' : '❌'}</span>
            {message}
        </div>
    );
};

export default ToastBanner;
