import React, { useState } from 'react';

// Map of insight types to icons and colors
const insightTypeConfig = {
    operational: { icon: 'cogs', color: 'var(--accent-blue)' },
    menu: { icon: 'utensils', color: 'var(--accent-orange)' },
    inventory: { icon: 'boxes', color: 'var(--accent-purple)' },
    business: { icon: 'chart-line', color: 'var(--grab-green)' },
    default: { icon: 'lightbulb', color: 'var(--grab-green)' }
};

// Map of severity levels to colors
const severityColors = {
    high: 'var(--grab-green)',
    medium: 'var(--accent-blue)',
    low: 'var(--accent-purple)'
};

// Component for displaying AI-generated insights
const ChatInsights = ({ insights }) => {
    const [activeInsight, setActiveInsight] = useState(null);

    // Get config for an insight type
    const getInsightConfig = (type) => {
        return insightTypeConfig[type] || insightTypeConfig.default;
    };

    // Get color for severity level
    const getSeverityColor = (severity) => {
        return severityColors[severity] || severityColors.medium;
    };

    return (
        <div className="insights-list">
            {insights.map((insight, index) => {
                const config = getInsightConfig(insight.type);
                return (
                    <div
                        key={index}
                        className={`insight-card ${index === activeInsight ? 'active' : ''}`}
                        style={{
                            animationDelay: `${index * 0.15}s`,
                            borderLeftColor: getSeverityColor(insight.severity)
                        }}
                        onMouseEnter={() => setActiveInsight(index)}
                        onMouseLeave={() => setActiveInsight(null)}
                    >
                        <div className="insight-header">
                            <div className="insight-icon" style={{ color: config.color }}>
                                <i className={`fas fa-${config.icon}`}></i>
                            </div>
                            <h4>{insight.title}</h4>
                            <span className={`insight-severity ${insight.severity || 'medium'}`}>
                {insight.severity || 'medium'}
              </span>
                        </div>
                        <p>{insight.description}</p>
                        <button className="action-button">
                            Take Action <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatInsights;