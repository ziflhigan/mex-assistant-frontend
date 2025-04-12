import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

/**
 * Component for displaying business metrics in a grid layout.
 * Each metric is shown in a card with its label, value, icon, and optional change indicator.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.metrics - An array of metric objects to display.
 * @param {string} props.metrics[].label - The title/label of the metric.
 * @param {string|number} props.metrics[].value - The main value of the metric.
 * @param {string} props.metrics[].icon - Font Awesome icon name (without 'fa-').
 * @param {string} props.metrics[].change.value - The textual representation of the change (e.g., "+5.1%").
 * @param {string} props.metrics[].change.direction - 'positive' or 'negative'.
 */
const ChatMetrics = ({ metrics }) => {
    // Return null or a placeholder if no metrics are provided
    if (!metrics || metrics.length === 0) {
        return null; // Or <p>No metrics available.</p>
    }

    return (
        <div className="metrics-grid">
            {metrics.map((metric, index) => (
                <div
                    key={metric.label || index} // Prefer a unique label/id if available
                    className="metric-card"
                    style={{
                        // Apply animation delay for staggered effect
                        animationDelay: `${index * 0.1}s`,
                        // Set border color, fallback to default green
                        borderTopColor: metric.color || 'var(--grab-green)'
                    }}
                    data-testid={`metric-${metric.label?.replace(/\s+/g, '-') || index}`} // Add test ID
                >
                    <div className="metric-header">
                        <div className="metric-title">{metric.label}</div>
                        <div
                            className="metric-icon"
                            style={{ backgroundColor: metric.color || 'var(--grab-green)' }}
                        >
                            {/* Render Font Awesome icon */}
                            <i className={`fas fa-${metric.icon}`}></i>
                        </div>
                    </div>
                    <div className="metric-value">{metric.value}</div>

                    {/* --- CORRECTED CHANGE LOGIC --- */}
                    {/* Check if metric.change exists AND has the necessary properties */}
                    {metric.change && metric.change.value && metric.change.direction && (
                        // Use metric.change.direction to set the class
                        <div className={`metric-change ${metric.change.direction}`}>
                            {/* Use metric.change.direction to choose the arrow icon */}
                            <i className={`fas fa-arrow-${metric.change.direction === 'positive' ? 'up' : 'down'}`}></i>
                            {/* Display the textual value of the change */}
                            {metric.change.value}
                        </div>
                    )}
                    {/* --- END CORRECTION --- */}
                </div>
            ))}
        </div>
    );
};

// Define PropTypes for the component
ChatMetrics.propTypes = {
    metrics: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        icon: PropTypes.string.isRequired,
        color: PropTypes.string,
        change: PropTypes.shape({
            value: PropTypes.string.isRequired,
            direction: PropTypes.oneOf(['positive', 'negative']).isRequired,
        }), // change object is optional
    })).isRequired, // metrics array is required
};


export default ChatMetrics;