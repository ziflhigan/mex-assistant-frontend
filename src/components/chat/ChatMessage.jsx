import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatVisualization from './ChatVisualization';
import ChatMetrics from './ChatMetrics';
import ChatInsights from './ChatInsights.jsx';
import { getRelativeTime } from '../../utils/dateFormatter.js';

/**
 * Renders a single message bubble in the chat interface.
 * It dynamically displays different content types and renders
 * the main text content using Markdown.
 *
 * @param {object} props - The component props.
 * @param {object} props.message - The message object to render.
 * // ... other prop descriptions
 */
const ChatMessage = ({ message }) => {
    const {
        sender,
        content,
        visualization,
        metrics,
        insights,
        tips,
        timestamp
    } = message;

    const isUser = sender === 'user';
    const messageClass = `chat-message ${isUser ? 'user' : 'assistant'}`;
    const formattedTime = timestamp ? getRelativeTime(new Date(timestamp)) : '';

    return (
        <div className={messageClass} data-testid={`${sender}-message`}>
            {!isUser && (
                <div className="message-avatar">
                    <div className="avatar-icon">
                        <i className="fas fa-robot"></i>
                    </div>
                </div>
            )}

            <div className="message-content">
                {/* Render simple text content if present using ReactMarkdown */}
                {content && (
                    <div className="message-text">
                        {/* --- THIS IS THE CHANGE --- */}
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                        {/* --- END CHANGE --- */}
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
                                {tip.icon && <i className={`fas fa-${tip.icon} tip-icon`}></i>}
                                {/* Use ReactMarkdown here too if tips might contain Markdown */}
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {tip.text}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}


                {/* Message timestamp */}
                {formattedTime && (
                    <div className="message-time">
                        {formattedTime}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Prop Types remain the same ---
ChatMessage.propTypes = {
    message: PropTypes.shape({
        sender: PropTypes.oneOf(['user', 'assistant']).isRequired,
        type: PropTypes.string.isRequired, // Keep type for potential future use
        content: PropTypes.string,
        visualization: PropTypes.object,
        metrics: PropTypes.arrayOf(PropTypes.object),
        insights: PropTypes.arrayOf(PropTypes.object),
        tips: PropTypes.arrayOf(PropTypes.object),
        timestamp: PropTypes.string.isRequired,
    }).isRequired,
};


export default ChatMessage;