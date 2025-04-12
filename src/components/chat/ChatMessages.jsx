import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import ThinkingIndicator from './ThinkingIndicator';

// Enhanced container for the list of messages with thinking indicator
const ChatMessages = () => {
    const {
        messages,
        typingIndicator,
        isThinking,
        thinkingState
    } = useChatContext();

    const messagesContainerRef = useRef(null);

    // Auto-scroll to bottom when messages change or thinking state changes
    useEffect(() => {
        if (messagesContainerRef.current) {
            const scrollContainer = messagesContainerRef.current;
            // Use smooth scrolling for a more polished feel
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, typingIndicator, isThinking, thinkingState]);

    return (
        <div
            className="chat-messages"
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Chat messages"
        >
            {/* Render actual messages */}
            {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
            ))}

            {/* Show thinking indicator when processing a request */}
            {isThinking && (
                <ThinkingIndicator thinkingState={thinkingState} />
            )}

            {/* Simple typing indicator when not in thinking mode */}
            {typingIndicator && !isThinking && (
                <div className="chat-message assistant typing-indicator">
                    <div className="message-avatar">
                        <div className="avatar-icon">
                            <i className="fas fa-robot"></i>
                        </div>
                    </div>
                    <div className="message-content">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatMessages;