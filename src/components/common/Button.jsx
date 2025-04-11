import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component that follows the Grab design system
 * Used throughout the application for actions and form submissions
 */
const Button = ({
  children,
  onClick,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Define base styles
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    fontWeight: 500,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit',
    opacity: disabled ? 0.7 : 1,
  };

  // Size variations
  const sizeStyles = {
    small: { padding: '6px 12px', fontSize: '0.875rem' },
    medium: { padding: '8px 16px', fontSize: '1rem' },
    large: { padding: '10px 20px', fontSize: '1.125rem' }
  };

  // Color and variant combinations
  const styleMap = {
    contained: {
      primary: {
        backgroundColor: 'var(--grab-green)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'var(--grab-dark-green)'
        }
      },
      secondary: {
        backgroundColor: 'var(--grab-gray)',
        color: 'var(--grab-dark-gray)',
        '&:hover': {
          backgroundColor: '#e0e0e0'
        }
      },
      danger: {
        backgroundColor: '#e74c3c',
        color: 'white',
        '&:hover': {
          backgroundColor: '#c0392b'
        }
      }
    },
    outlined: {
      primary: {
        backgroundColor: 'transparent',
        color: 'var(--grab-green)',
        border: '1px solid var(--grab-green)',
        '&:hover': {
          backgroundColor: 'rgba(0, 177, 79, 0.1)'
        }
      },
      secondary: {
        backgroundColor: 'transparent',
        color: 'var(--grab-dark-gray)',
        border: '1px solid var(--grab-dark-gray)',
        '&:hover': {
          backgroundColor: 'rgba(74, 74, 74, 0.1)'
        }
      },
      danger: {
        backgroundColor: 'transparent',
        color: '#e74c3c',
        border: '1px solid #e74c3c',
        '&:hover': {
          backgroundColor: 'rgba(231, 76, 60, 0.1)'
        }
      }
    },
    text: {
      primary: {
        backgroundColor: 'transparent',
        color: 'var(--grab-green)',
        '&:hover': {
          backgroundColor: 'rgba(0, 177, 79, 0.1)'
        }
      },
      secondary: {
        backgroundColor: 'transparent',
        color: 'var(--grab-dark-gray)',
        '&:hover': {
          backgroundColor: 'rgba(74, 74, 74, 0.1)'
        }
      },
      danger: {
        backgroundColor: 'transparent',
        color: '#e74c3c',
        '&:hover': {
          backgroundColor: 'rgba(231, 76, 60, 0.1)'
        }
      }
    }
  };

  // Get styling from maps
  const variantStyle = styleMap[variant]?.[color] || styleMap.contained.primary;
  const sizeStyle = sizeStyles[size] || sizeStyles.medium;

  // Combine styles
  const computedStyle = {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
    width: fullWidth ? '100%' : 'auto',
  };

  // Handle hover state through CSS class instead of inline styles
  // for better interaction handling
  
  return (
    <button
      className={`mex-button ${variant} ${color} ${className}`}
      onClick={onClick}
      style={computedStyle}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default Button;