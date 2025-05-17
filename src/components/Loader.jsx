import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <FaSpinner className="animate-spin text-blue-500 text-2xl" />
        </div>
    );
};

export default Loader;