import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

/**
 * StatCard component displays a key metric with its title, value, and change percentage
 * Used in dashboard stats grid to show KPIs
 */
const StatCard = ({
  title,
  value,
  change,
  icon,
  iconColor = 'var(--grab-green)',
  formatType = 'number',
  changeDirection = 'positive',
  className = '',
  style = {},
  ...props
}) => {
  // Format the display value based on formatType
  const formatValue = (value, type) => {
    if (value === undefined || value === null) return '--';
    
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          maximumFractionDigits: 2
        }).format(value);
      
      case 'percentage':
        return `${value.toFixed(1)}%`;
      
      case 'minutes':
        return `${value.toFixed(1)} min`;
      
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      
      default:
        return value.toString();
    }
  };

  // Determine color for change indicator
  const isPositive = changeDirection === 'positive';
  const changeColor = isPositive ? 'var(--grab-green)' : '#e74c3c';
  
  // Map icon names to actual render functions
  // In a real app, this would use an icon library like Font Awesome or Material Icons
  const renderIcon = () => {
    if (!icon) return null;

    // Style for the icon container
    const iconContainerStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: iconColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '18px'
    };

    // This would be replaced with actual icons from a library
    const iconMap = {
      'dollar-sign': '$',
      'shopping-bag': '🛍️',
      'receipt': '🧾',
      'clock': '⏱️',
      'users': '👥',
      'chart-line': '📈',
      'chart-bar': '📊'
    };

    return (
      <div className="stat-card-icon" style={iconContainerStyle}>
        {typeof icon === 'string' ? iconMap[icon] || icon : icon}
      </div>
    );
  };

  return (
    <Card 
      className={`stat-card ${className}`}
      borderTop
      borderTopColor={isPositive ? 'var(--grab-green)' : '#e74c3c'}
      style={{ 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)'
        },
        ...style
      }}
      {...props}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '14px', color: 'var(--grab-dark-gray)' }}>{title}</div>
        {renderIcon()}
      </div>
      
      <div style={{ fontSize: '28px', fontWeight: 700, margin: '10px 0' }}>
        {formatValue(value, formatType)}
      </div>
      
      {change && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          fontSize: '14px',
          color: changeColor
        }}>
          <span style={{ marginRight: '5px' }}>
            {isPositive ? '↑' : '↓'}
          </span>
          {change}
        </div>
      )}
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  change: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  iconColor: PropTypes.string,
  formatType: PropTypes.oneOf(['number', 'currency', 'percentage', 'minutes']),
  changeDirection: PropTypes.oneOf(['positive', 'negative']),
  className: PropTypes.string,
  style: PropTypes.object
};

export default StatCard;