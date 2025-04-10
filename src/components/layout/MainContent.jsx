import React from 'react';

// Simple wrapper for the main content area
// TODO: Add styling from mockup (padding, margins based on header/sidebar)

const MainContent = ({ children }) => {
  return (
    <main className="main-content" style={{ /* Add styles like padding */ }}>
      {children}
    </main>
  );
};

export default MainContent;