import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';

/**
 * AppLayout provides the main application layout structure
 * Combines Sidebar, Header, and MainContent in a responsive grid
 */
const AppLayout = ({
  children,
  merchants = [],
  selectedMerchantId = '',
  onMerchantChange,
  userName = 'Merchant Admin',
  userAvatar = '/api/placeholder/35/35',
  onSearch,
  logo = '/api/placeholder/40/40'
}) => {
  // State for mobile sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // State to track if the layout is in mobile view
  const [isMobileView, setIsMobileView] = useState(false);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on mobile
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Check if we're in mobile view on mount and resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Initial check
    checkMobileView();

    // Add resize listener
    window.addEventListener('resize', checkMobileView);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // Define CSS variables for layout measurements
  const cssVariables = {
    '--sidebar-width': '260px',
    '--header-height': '60px',
    '--border-radius': '10px',
    // Grab colors from prototype
    '--grab-green': '#00b14f',
    '--grab-dark-green': '#00843a',
    '--grab-light-green': '#7ed957',
    '--grab-gray': '#f7f7f7',
    '--grab-dark-gray': '#4a4a4a',
    '--grab-white': '#ffffff',
    '--grab-black': '#222222',
    '--accent-purple': '#9b59b6',
    '--accent-blue': '#3498db',
    '--accent-orange': '#e67e22',
    '--card-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  // Layout container style
  const layoutStyle = {
    ...cssVariables,
    display: 'grid',
    gridTemplateColumns: isMobileView ? '1fr' : 'var(--sidebar-width) 1fr',
    gridTemplateRows: 'var(--header-height) 1fr',
    gridTemplateAreas: isMobileView 
      ? '"header" "main"'
      : '"sidebar header" "sidebar main"',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    color: 'var(--grab-dark-gray)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  };

  return (
    <div className="app-layout" style={layoutStyle}>
      <Sidebar
        isMobileOpen={isMobileView ? isSidebarOpen : true}
        onMobileClose={closeSidebar}
        merchants={merchants}
        selectedMerchantId={selectedMerchantId}
        onMerchantChange={onMerchantChange}
        logo={logo}
      />
      
      <Header
        onMenuToggle={toggleSidebar}
        userName={userName}
        userAvatar={userAvatar}
        onSearch={onSearch}
      />
      
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  merchants: PropTypes.array,
  selectedMerchantId: PropTypes.string,
  onMerchantChange: PropTypes.func,
  userName: PropTypes.string,
  userAvatar: PropTypes.string,
  onSearch: PropTypes.func,
  logo: PropTypes.string
};

export default AppLayout;