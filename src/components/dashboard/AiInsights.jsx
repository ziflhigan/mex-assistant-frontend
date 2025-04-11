import React from 'react';

function AiInsights({ insights }) {
    if (!insights || insights.length === 0) {
        return (
            <div className="insights-empty">
                <p>No insights available at this time.</p>
            </div>
        );
    }

    // Add some predefined insights if we need more
    const displayInsights = insights.length < 3 ? [
        ...insights,
        {
            title: 'Peak Hour Opportunity',
            description: 'Your busiest hour is 12:00 PM with 52 orders. Consider adding an extra staff member during 11:30 AM - 1:30 PM to improve preparation time.'
        },
        {
            title: 'Menu Recommendation',
            description: 'Based on search trends, "Fried Spring Rolls" is highly searched but not on your menu. Consider adding this item to capture this demand.'
        },
        {
            title: 'Inventory Alert',
            description: 'Your "Cheesy Bacon Fries" sales have increased by 6.2% this week. Ensure you have sufficient inventory for the upcoming weekend rush.'
        }
    ].slice(0, 3) : insights;

    const handleAction = (title) => {
        console.log(`Taking action on insight: ${title}`);
        alert(`Action initiated for: ${title}`);
    };

    return (
        <div className="insights-list">
            {displayInsights.map((insight, index) => (
                <div key={index} className="insight-card">
                    <h4>{insight.title}</h4>
                    <p>{insight.description}</p>
                    <button
                        className="action-button"
                        onClick={() => handleAction(insight.title)}
                    >
                        Take Action <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default AiInsights;