import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loader component that displays animated dots
 * Matches the design in the prototype
 */
const Loader = ({ 
  size = 'medium', 
  color = 'var(--grab-green)',
  fullWidth = false,
  className = '',
  style = {}
}) => {
  // Size configurations
  const sizes = {
    small: {
      dot: { width: '6px', height: '6px' },
      container: { height: '30px' }
    },
    medium: {
      dot: { width: '10px', height: '10px' },
      container: { height: '50px' }
    },
    large: {
      dot: { width: '14px', height: '14px' },
      container: { height: '70px' }
    }
  };

  const sizeConfig = sizes[size] || sizes.medium;

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: fullWidth ? '100%' : 'auto',
    height: sizeConfig.container.height,
    ...style
  };

  // Base dot style
  const dotStyle = {
    width: sizeConfig.dot.width,
    height: sizeConfig.dot.height,
    backgroundColor: color,
    borderRadius: '50%',
    margin: '0 5px',
    // The animation is defined in CSS
  };

  // CSS for animations
  const loaderCSS = `
    @keyframes mexLoaderBounce {
      0%, 80%, 100% { 
        transform: scale(0);
        opacity: 0.5;
      }
      40% { 
        transform: scale(1);
        opacity: 1;
      }
    }

    .mex-loader-dot {
      animation: mexLoaderBounce 1.4s infinite ease-in-out both;
    }

    .mex-loader-dot:nth-child(1) {
      animation-delay: -0.32s;
    }

    .mex-loader-dot:nth-child(2) {
      animation-delay: -0.16s;
    }
  `;

  return (
    <>
      <style>{loaderCSS}</style>
      <div 
        className={`mex-loader ${className}`} 
        style={containerStyle}
        aria-label="Loading"
        role="status"
      >
        <div className="mex-loader-dot" style={dotStyle}></div>
        <div className="mex-loader-dot" style={dotStyle}></div>
        <div className="mex-loader-dot" style={dotStyle}></div>
      </div>
    </>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Loader;