import React from 'react';

// Implements the loading dots animation from the mockup CSS
// TODO: Ensure CSS for .loading and .loading-dot is defined globally or scoped here

const Loader = ({ size = 'medium' }) => {
  // Adjust styles based on size prop if needed
  const dotStyle = {
    width: size === 'small' ? '8px' : '10px',
    height: size === 'small' ? '8px' : '10px',
    borderRadius: '50%',
    backgroundColor: 'var(--grab-green)', // Use CSS variable
    margin: '0 5px',
    // Animation needs to be defined in CSS
    // animation: 'loading 1.4s infinite ease-in-out both'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px', // Adjust as needed
  };

  return (
    <div style={containerStyle} className="loading"> {/* Use class for animation targeting */}
      <div style={{...dotStyle, animationDelay: '-0.32s'}} className="loading-dot"></div>
      <div style={{...dotStyle, animationDelay: '-0.16s'}} className="loading-dot"></div>
      <div style={dotStyle} className="loading-dot"></div>
    </div>
  );
};

// Add CSS to your global stylesheet (e.g., index.css or App.css)
/*
@keyframes loading {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}
*/


export default Loader;