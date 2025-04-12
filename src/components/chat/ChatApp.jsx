import React from 'react';

import './styles/chat.css';
import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import SuggestedQuestions from "./SuggestedQuestions.jsx";
import ChatInput from "./ChatInput.jsx";
import {ChatProvider} from "../../contexts/ChatContext.jsx";

// Main Chat App component that brings everything together
const ChatApp = () => {
    return (
        <ChatProvider>
            <div className="chat-container">
                <ChatHeader />
                <ChatMessages />
                <SuggestedQuestions />
                <ChatInput />
            </div>
        </ChatProvider>
    );
};

export default ChatApp;