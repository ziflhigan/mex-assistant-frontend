import React from 'react';
import { ChatProvider } from '../../contexts/ChatContext';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
// Main container for the chat interface, wraps content with ChatProvider


export default function ChatContainer() {
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
}
