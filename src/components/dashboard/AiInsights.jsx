import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './css/AiInsights.css';

function AiInsights({ insights = [], expanded = false }) {
    const { t } = useTranslation();
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
                <p>{t('dashboard.aiInsights.noInsights.title')}</p>
                <p className="insights-empty-sub">{t('dashboard.aiInsights.noInsights.subtitle')}</p>
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
            title: `${t('dashboard.aiInsights.actions.takeAction')}: ${insight.title}`,
            description: insight.description,
            actions: [
                {
                    label: t('dashboard.aiInsights.actions.viewDetails'),
                    icon: 'search',
                    action: () => console.log(`Viewing details for: ${insight.title}`)
                },
                {
                    label: t('dashboard.aiInsights.actions.scheduleTask'),
                    icon: 'calendar',
                    action: () => console.log(`Scheduling task for: ${insight.title}`)
                },
                {
                    label: t('dashboard.aiInsights.actions.dismiss'),
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
                                {t(`dashboard.aiInsights.severity.${insight.severity || 'medium'}`)}
                            </span>
                        </div>
                        <p>{insight.description}</p>
                        <button
                            className="action-button"
                            onClick={() => handleAction(insight)}
                        >
                            {t('dashboard.aiInsights.actions.takeAction')} <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                ))}
            </div>

            {/* Action Popup */}
            {showPopup && popupContent && (
                <div className={`insight-popup ${showPopup ? 'show' : ''}`}>
                    <div className="popup-content">
                        <button className="close-popup" onClick={closePopup}>×</button>
                        <h3>{popupContent.title}</h3>
                        <p>{popupContent.description}</p>
                        <div className="popup-actions">
                            {popupContent.actions.map((action, index) => (
                                <button
                                    key={index}
                                    className="popup-action-button"
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
            )}
        </>
    );
}

export default AiInsights;