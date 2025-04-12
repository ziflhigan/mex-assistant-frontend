import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';

/**
 * AppLayout provides the main application layout structure
 * Combines Sidebar, Header, and MainContent in a responsive grid
 * Manages mobile sidebar visibility and backdrop.
 */
const AppLayout = ({
                     children,
                     merchants = [],
                     selectedMerchantId = '',
                     onMerchantChange,
                     userName = 'Merchant Admin',
                     userAvatar = '/api/placeholder/35/35', // Default placeholder
                     onSearch,
                     logo = '/api/placeholder/40/40', // Default placeholder
                     isMobileOpen = false,
                     onMobileToggle,
                     onMobileClose
                   }) => {
  // State for mobile sidebar visibility (if not controlled externally)
  const [isSidebarOpen, setSidebarOpen] = useState(isMobileOpen);

  // State to track if the layout is in mobile view
  const [isMobileView, setIsMobileView] = useState(false);

  // Update internal state when external prop changes
  useEffect(() => {
    setSidebarOpen(isMobileOpen);
  }, [isMobileOpen]);

  // Check if we're in mobile view on mount and resize
  useEffect(() => {
    const checkMobileView = () => {
      // Consistent breakpoint with CSS (adjust if needed)
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add resize listener
    window.addEventListener('resize', checkMobileView);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  // Close sidebar if resizing from mobile to desktop while open
  useEffect(() => {
    if (!isMobileView && isSidebarOpen) {
      setSidebarOpen(false);
      if (onMobileClose) onMobileClose();
    }
  }, [isMobileView, isSidebarOpen, onMobileClose]);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    if (isMobileView) { // Only toggle if in mobile view
      const newState = !isSidebarOpen;
      setSidebarOpen(newState);
      if (onMobileToggle) onMobileToggle(newState);
    }
  };

  // Close sidebar on mobile (used by backdrop click and NavLink click)
  const closeSidebar = () => {
    if (isMobileView) { // Only close if in mobile view
      setSidebarOpen(false);
      if (onMobileClose) onMobileClose();
    }
  };

  // Handle merchant change (with support for both local and external state)
  const handleMerchantChange = (merchantId, merchant) => {
    if (onMerchantChange) {
      onMerchantChange(merchantId, merchant);
    }

    // Close sidebar on mobile after selection
    if (isMobileView) {
      closeSidebar();
    }
  };

  // Define CSS variables (can also be defined globally in CSS)
  const cssVariables = useMemo(() => ({
    '--sidebar-width': '260px',
    '--header-height': '60px',
    '--border-radius': '10px',
    // Add other theme variables if needed here or keep in theme.js/CSS
    '--grab-green': '#00b14f',
    '--grab-dark-gray': '#4a4a4a',
    // ... other variables
  }), []); // Re-calculate only if base values change (they don't here)

  // Layout container style
  const layoutStyle = useMemo(() => ({
    ...cssVariables, // Apply CSS variables
    display: 'grid',
    // Adjust grid based on mobile view
    gridTemplateColumns: isMobileView ? '1fr' : 'var(--sidebar-width) 1fr',
    gridTemplateRows: 'var(--header-height) 1fr',
    gridTemplateAreas: isMobileView
        ? `"header" "main"`
        : `"sidebar header" "sidebar main"`,
    minHeight: '100vh',
    backgroundColor: '#f5f5f5', // Base background
    color: 'var(--grab-dark-gray)', // Base text color
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', // Base font
    // Prevent body scroll when mobile sidebar is open
    // Note: This might be better handled globally or on document.body
    // overflow: isMobileView && isSidebarOpen ? 'hidden' : 'auto'
  }), [isMobileView, cssVariables]); // Recalculate when mobile view changes

  // Backdrop style --- Preferably move to CSS
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 9, // Below sidebar (10), above header (5) and content
    // Opacity transition can make it smoother
    opacity: isSidebarOpen ? 1 : 0,
    visibility: isSidebarOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  };

  return (
      <div className="app-layout" style={layoutStyle}>
        {/* Mobile Backdrop - Rendered conditionally based on state */}
        {isMobileView && (
            <div
                className="sidebar-backdrop"
                style={backdropStyle}
                onClick={closeSidebar}
                aria-hidden={!isSidebarOpen} // Accessibility
            />
        )}

        <Sidebar
            isMobile={isMobileView} // Let Sidebar know if it's mobile mode
            isMobileOpen={isSidebarOpen} // Pass the actual open state
            onMobileClose={closeSidebar} // Pass the closer function
            merchants={merchants}
            selectedMerchantId={selectedMerchantId}
            onMerchantChange={handleMerchantChange}
            logo={logo}
        />

        <Header
            // Pass toggle function, only works if Header button is shown (mobile)
            onMenuToggle={toggleSidebar}
            userName={userName}
            userAvatar={userAvatar}
            onSearch={onSearch}
            // Pass isMobileView if Header needs to adjust its own layout/content
            // isMobile={isMobileView}
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
  logo: PropTypes.string,
  isMobileOpen: PropTypes.bool,
  onMobileToggle: PropTypes.func,
  onMobileClose: PropTypes.func
};

export default AppLayout;