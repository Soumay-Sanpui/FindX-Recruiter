const ToastBanner = ({ message, type }) => {
    return (
        <div className={`toast-banner ${type == 'success' ? 'bg-gray-200/50' : 'bg-red-500'} mb-2 font-poppins p-2 text-center border ${type == 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <span className="mr-2">{type == 'success' ? '🎉' : '❌'}</span>
            {message}
        </div>
    );
};

export default ToastBanner;
