import React from 'react';
import ChatVisualization from './ChatVisualization';

// Component for an individual chat message bubble (either user or assistant)
export default function ChatMessage({ message }) {
    const { sender, type, content, data, chartType } = message;
    const isUser = sender === 'user';

    // Apply different class names based on sender (user vs assistant)
    const messageClass = 'chat-message ' + (isUser ? 'user' : 'assistant');

    return (
        <div className={messageClass}>
            {/* Text content of the message (if any) */}
            {content && <div className="chat-message-text">{content}</div>}

            {/* If this is an assistant message with visual data, render the chart or table */}
            {!isUser && (type === 'chart' || type === 'table') && data && (
                <ChatVisualization type={type} data={data} chartType={chartType} />
            )}
        </div>
    );
}
