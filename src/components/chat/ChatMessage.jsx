import React from 'react';
import ChatVisualization from './ChatVisualization';
import ChatMetrics from './ChatMetrics';
import ChatInsights from './ChatInsights.jsx';
import {getRelativeTime} from "../../utils/dateFormatter.js";

// Enhanced ChatMessage component that supports various message types
const ChatMessage = ({ message }) => {
    const {
        sender,
        type,
        content,
        visualization,
        metrics,
        insights,
        tips,
        timestamp
    } = message;

    const isUser = sender === 'user';
    const messageClass = `chat-message ${isUser ? 'user' : 'assistant'}`;

    // Format relative time (e.g., "2 minutes ago")
    const formattedTime = getRelativeTime(new Date(timestamp));

    return (
        <div className={messageClass} data-testid={`${sender}-message`}>
            {/* Avatar for assistant messages */}
            {!isUser && (
                <div className="message-avatar">
                    <div className="avatar-icon">
                        <i className="fas fa-robot"></i>
                    </div>
                </div>
            )}

            <div className="message-content">
                {/* Message text content */}
                {content && (
                    <div className="message-text">
                        {content}
                    </div>
                )}

                {/* Visualization (chart or table) */}
                {visualization && (
                    <div className="message-visualization">
                        <ChatVisualization
                            type={visualization.type}
                            chartType={visualization.chartType}
                            data={visualization.data}
                        />
                    </div>
                )}

                {/* Metrics display (for business stats) */}
                {metrics && metrics.length > 0 && (
                    <div className="message-metrics">
                        <ChatMetrics metrics={metrics} />
                    </div>
                )}

                {/* Insights display */}
                {insights && insights.length > 0 && (
                    <div className="message-insights">
                        <ChatInsights insights={insights} />
                    </div>
                )}

                {/* Tips section */}
                {tips && tips.length > 0 && (
                    <div className="message-tips">
                        {tips.map((tip, index) => (
                            <div key={index} className="tip">
                                <i className={`fas fa-${tip.icon}`}></i>
                                <span>{tip.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Message timestamp */}
                <div className="message-time">
                    {formattedTime}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;