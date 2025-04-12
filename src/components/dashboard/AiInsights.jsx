import React, { useState, useEffect } from 'react';
import './css/AiInsights.css';

function AiInsights({ insights = [], expanded = false }) {
    const [activeInsight, setActiveInsight] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState(null);
    const [animatedInsights, setAnimatedInsights] = useState([]);

    // Debug log to check insights data
    useEffect(() => {
        console.log('AiInsights received data:', insights);
    }, [insights]);

    // Stagger the appearance of insights when they load
    useEffect(() => {
        if (insights && insights.length > 0) {
            setAnimatedInsights([]);
            const timer = setTimeout(() => {
                insights.forEach((_, index) => {
                    setTimeout(() => {
                        setAnimatedInsights(prev => [...prev, index]);
                    }, index * 150);
                });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [insights]);

    if (!insights || insights.length === 0) {
        return (
            <div className="insights-empty">
                <i className="fas fa-search insight-empty-icon"></i>
                <p>No insights available at this time.</p>
                <p className="insights-empty-sub">Check back later for AI-powered recommendations.</p>
            </div>
        );
    }

    // Display insights based on expanded state
    const displayInsights = expanded ? insights : insights.slice(0, 3);

    // Function to get icon based on insight type
    const getInsightIcon = (type) => {
        switch (type) {
            case 'operational':
                return 'cogs';
            case 'menu':
                return 'utensils';
            case 'inventory':
                return 'boxes';
            case 'business':
                return 'chart-line';
            default:
                return 'lightbulb';
        }
    };

    // Function to get color based on severity
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high':
                return 'var(--grab-green)';
            case 'medium':
                return 'var(--accent-blue)';
            case 'low':
                return 'var(--accent-purple)';
            default:
                return 'var(--grab-green)';
        }
    };

    const handleAction = (insight) => {
        setActiveInsight(insight);
        setPopupContent({
            title: `Action: ${insight.title}`,
            description: insight.description,
            actions: [
                {
                    label: 'View Details',
                    icon: 'search',
                    action: () => console.log(`Viewing details for: ${insight.title}`)
                },
                {
                    label: 'Schedule Task',
                    icon: 'calendar',
                    action: () => console.log(`Scheduling task for: ${insight.title}`)
                },
                {
                    label: 'Dismiss',
                    icon: 'times',
                    action: () => console.log(`Dismissing insight: ${insight.title}`)
                }
            ]
        });
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setTimeout(() => setPopupContent(null), 300); // Wait for animation to complete
    };

    return (
        <>
            <div className={`insights-list ${expanded ? 'expanded' : ''}`}>
                {displayInsights.map((insight, index) => (
                    <div
                        key={index}
                        className={`insight-card ${animatedInsights.includes(index) ? 'animated' : ''}`}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            borderLeftColor: getSeverityColor(insight.severity)
                        }}
                        onMouseEnter={() => setActiveInsight(insight)}
                        onMouseLeave={() => setActiveInsight(null)}
                    >
                        <div className="insight-header">
                            <div className="insight-icon">
                                <i className={`fas fa-${getInsightIcon(insight.type)}`}></i>
                            </div>
                            <h4>{insight.title}</h4>
                            <span className={`insight-severity ${insight.severity || 'medium'}`}>
                {insight.severity || 'medium'}
              </span>
                        </div>
                        <p>{insight.description}</p>
                        <button
                            className="action-button"
                            onClick={() => handleAction(insight)}
                        >
                            Take Action <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                ))}
            </div>

            {/* Action Popup */}
            {showPopup && popupContent && (
                <div className={`insight-popup ${showPopup ? 'show' : ''}`}>
                    <div className="insight-popup-content">
                        <div className="insight-popup-header">
                            <h3>{popupContent.title}</h3>
                            <button className="close-button" onClick={closePopup}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="insight-popup-body">
                            <p>{popupContent.description}</p>
                            <div className="insight-popup-actions">
                                {popupContent.actions.map((action, index) => (
                                    <button
                                        key={index}
                                        className="insight-action-button"
                                        onClick={() => {
                                            action.action();
                                            closePopup();
                                        }}
                                    >
                                        <i className={`fas fa-${action.icon}`}></i>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AiInsights;