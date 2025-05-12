// pages/ChatPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import DHeader from '../components/dashboard/DHeader';

const ChatPage = () => {
    const { jobId } = useParams();  // Extract jobId from the URL

    return (
       <>
        <DHeader />
        <div className="chat-container p-8">
            <h2 className="text-2xl font-bold">Chat for Job ID: {jobId}</h2>
            {/* You can implement your chat UI and logic here */}
            <div className="chat-box mt-6 border p-4 rounded-lg">
                {/* Chat messages, input fields, and send button */}
                <p>How can i help you ?</p>
            </div>
            <div className="chat-box mt-6 border p-4 rounded-lg text-end">
                {/* Chat messages, input fields, and send button */}
                <p>I interested in the offer</p>
            </div>
        </div>
       </>
    );
};

export default ChatPage;
