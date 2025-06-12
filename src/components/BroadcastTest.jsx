import React, { useState } from 'react';
import { sendBroadcastNotification } from '../services/notificationService.js';

const BroadcastTest = () => {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const testBroadcast = async () => {
    try {
      const result = await sendBroadcastNotification({
        title: 'Test from Employer Dashboard',
        body: message || 'This is a test broadcast from the employer dashboard!',
        data: { test: true }
      });
      setResult({ success: true, data: result });
    } catch (error) {
      setResult({ success: false, error: error.message });
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-2">🧪 Broadcast Test</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter test message"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={testBroadcast}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Test Broadcast
      </button>
      {result && (
        <div className={`mt-2 p-2 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BroadcastTest; 