import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component that follows the Grab design system
 * Used for displaying content in a contained, elevated box
 */
const Card = ({
  children,
  title,
  actions,
  elevation = 1,
  borderTop = false,
  borderTopColor = 'var(--grab-green)',
  noPadding = false,
  className = '',
  style = {},
  ...props
}) => {
  // Shadow levels based on elevation
  const shadows = {
    0: 'none',
    1: '0 2px 4px rgba(0, 0, 0, 0.1)',
    2: '0 4px 6px rgba(0, 0, 0, 0.1)',
    3: '0 6px 10px rgba(0, 0, 0, 0.15)',
    4: '0 8px 12px rgba(0, 0, 0, 0.2)'
  };
  
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: 'var(--border-radius, 10px)',
    boxShadow: shadows[elevation] || shadows[1],
    padding: noPadding ? 0 : '20px',
    marginBottom: '20px',
    width: '100%',
    borderTop: borderTop ? `4px solid ${borderTopColor}` : 'none',
    ...style,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: title ? '15px' : 0
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--grab-dark-gray, #4a4a4a)',
    margin: 0
  };

  const actionsContainerStyle = {
    marginTop: actions ? '15px' : 0,
    display: 'flex',
    justifyContent: 'flex-end'
  };

  return (
    <div className={`mex-card ${className}`} style={cardStyle} {...props}>
      {title && (
        <div className="mex-card-header" style={headerStyle}>
          {typeof title === 'string' ? (
            <h3 className="mex-card-title" style={titleStyle}>{title}</h3>
          ) : (
            title // If title is a React component
          )}
        </div>
      )}
      
      <div className="mex-card-content">
        {children}
      </div>
      
      {actions && (
        <div className="mex-card-actions" style={actionsContainerStyle}>
          {actions}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actions: PropTypes.node,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  borderTop: PropTypes.bool,
  borderTopColor: PropTypes.string,
  noPadding: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Card;