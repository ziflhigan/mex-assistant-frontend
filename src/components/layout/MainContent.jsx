import React from 'react';
import PropTypes from 'prop-types';

/**
 * MainContent component that serves as a container for the page content
 * Provides proper spacing and layout based on the header and sidebar
 */
const MainContent = ({ 
  children,
  className = '',
  style = {},
  ...props
}) => {
  const mainContentStyle = {
    gridArea: 'main',
    padding: '20px',
    marginTop: 'var(--header-height, 60px)',
    minHeight: 'calc(100vh - var(--header-height, 60px))',
    overflowY: 'auto',
    backgroundColor: '#f5f5f5',
    transition: 'all 0.3s ease',
    ...style
  };

  return (
    <main 
      className={`main-content ${className}`} 
      style={mainContentStyle}
      {...props}
    >
      {children}
    </main>
  );
};

MainContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default MainContent;