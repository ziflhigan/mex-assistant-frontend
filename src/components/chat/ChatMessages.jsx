import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';

// Container for the list of messages (user and assistant) and the typing indicator
export default function ChatMessages() {
    const { messages, loading } = useChatContext();
    const messagesContainerRef = useRef(null);

    // Auto-scroll to bottom when a new message is added or loading status changes
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <div 
            className="chat-messages" 
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Chat messages"
        >
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}

            {/* Typing indicator (shown when loading is true) */}
            {loading && (
                <div className="chat-message assistant typing-indicator">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
            )}
        </div>
    );
}
