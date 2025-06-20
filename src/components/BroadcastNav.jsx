import React from 'react';
import { Bell, Send } from 'lucide-react';

const BroadcastNav = () => {
  const handleBroadcastClick = () => {
    window.location.href = '/broadcast';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleBroadcastClick}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors duration-200 flex items-center space-x-2 group"
        title="Send email broadcast to FindX users"
      >
        <Bell className="h-6 w-6" />
        <span className="hidden group-hover:block text-sm whitespace-nowrap pr-2">
          Send Email Broadcast
        </span>
      </button>
    </div>
  );
};

export default BroadcastNav; 