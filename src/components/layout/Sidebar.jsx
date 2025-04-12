import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'; // Assuming you use react-router
import MerchantSelector from '../common/MerchantSelector';

/**
 * Sidebar component that provides navigation and merchant selection
 * Follows the design in the prototype with support for mobile responsiveness
 */
const Sidebar = ({
                   isMobileOpen, // Tracks if sidebar should be visibly open (on mobile)
                   isMobile, // Prop to know if we are in mobile view mode
                   onMobileClose, // Function to close sidebar (used by backdrop click)
                   merchants = [],
                   selectedMerchantId = '5c1f8', // Default from context/props
                   onMerchantChange,
                   logo = '/api/placeholder/40/40' // Default placeholder
                 }) => {
  // Navigation items
  const navItems = [
    { to: '/dashboard', icon: 'fas fa-chart-pie', label: 'Dashboard' },
    { to: '/chat', icon: 'fas fa-comment-dots', label: 'AI Assistant' },
    // Placeholders - ensure these routes exist or remove items
    { to: '/notifications', icon: 'fas fa-bell', label: 'Notifications' },
    { to: '/settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  // Styles --- Preferably move to CSS
  const sidebarStyle = {
    gridArea: 'sidebar',
    backgroundColor: 'var(--grab-black, #222222)',
    color: 'white',
    height: '100vh',
    position: 'fixed', // Fixed position is fine for sidebar IF handled correctly with grid/mobile
    width: 'var(--sidebar-width, 260px)',
    transition: 'transform 0.3s ease', // Transition for mobile slide-in/out
    zIndex: 10, // Ensure sidebar is above content and header
    display: 'flex',
    flexDirection: 'column',
    // Mobile specific transform
    transform: isMobile ? (isMobileOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
  };

  const sidebarHeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px 20px 20px', // Added bottom padding
    // marginBottom: '20px' // Replaced by padding-bottom
  };

  const logoStyle = {
    height: '40px',
    marginRight: '10px'
  };

  const titleStyle = {
    fontSize: '20px',
    color: 'var(--grab-green, #00b14f)',
    margin: 0 // Reset default h1 margin
  };

  const sidebarNavStyle = {
    padding: '10px 0',
    flexGrow: 1, // Allow nav to take available space
    overflowY: 'auto' // Add scroll if nav items exceed height
  };

  const sidebarFooterStyle = {
    // Removed position: absolute. Footer is now part of the flex column flow.
    padding: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: 'auto' // Push footer to bottom of flex container
  };

  // Handle NavLink click to close mobile sidebar
  const handleNavLinkClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
      <aside
          className={`sidebar ${isMobile && isMobileOpen ? 'active' : ''}`}
          style={sidebarStyle}
          aria-hidden={isMobile && !isMobileOpen} // Accessibility hint
      >
        {/* Header */}
        <div className="sidebar-header" style={sidebarHeaderStyle}>
          {logo && <img src={logo} alt="MEX Assistant Logo" style={logoStyle} />}
          <h1 style={titleStyle}>MEX Assistant</h1>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" style={sidebarNavStyle}>
          {navItems.map(item => (
              <NavLink
                  key={item.to}
                  to={item.to}
                  // className prop now accepts a function in react-router v6
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  // Style prop can also accept a function
                  // style={({ isActive }) => navItemStyle(isActive)} // Use CSS classes instead
                  onClick={handleNavLinkClick} // Close mobile sidebar on nav
              >
                {/* Style icon with CSS classes */}
                <i className={`${item.icon} nav-item-icon`/* style={iconStyle} */} />
                <span>{item.label}</span>
              </NavLink>
          ))}
        </nav>

        {/* Footer - Merchant Selector */}
        <div className="sidebar-footer" style={sidebarFooterStyle}>
          <MerchantSelector
              merchants={merchants}
              selectedMerchantId={selectedMerchantId}
              onChange={onMerchantChange}
              label="Merchant:" // Slightly shorter label
          />
        </div>
      </aside>
  );
};

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  onMobileClose: PropTypes.func,
  merchants: PropTypes.array,
  selectedMerchantId: PropTypes.string,
  onMerchantChange: PropTypes.func,
  logo: PropTypes.string
};

export default Sidebar;