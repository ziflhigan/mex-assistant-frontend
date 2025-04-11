import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import MerchantSelector from '../common/MerchantSelector';

/**
 * Sidebar component that provides navigation and merchant selection
 * Follows the design in the prototype with support for mobile responsiveness
 */
const Sidebar = ({ 
  isMobileOpen = false,
  onMobileClose,
  merchants = [],
  selectedMerchantId = '5c1f8',
  onMerchantChange,
  logo = '/api/placeholder/40/40' // Default placeholder
}) => {
  // Define default merchants if none provided
  const defaultMerchants = [
    { id: '5c1f8', name: 'Burger Factory (5c1f8)' },
    { id: '2e8a5', name: 'Burger Barn (2e8a5)' },
    { id: '0e1b3', name: 'Chicken Shack (0e1b3)' },
    { id: '1d4f2', name: 'Asian Wok (1d4f2)' },
    { id: 'b9e5f', name: 'Seafood Express (b9e5f)' }
  ];

  const merchantList = merchants.length > 0 ? merchants : defaultMerchants;

  // Navigation items
  const navItems = [
    { to: '/dashboard', icon: 'fas fa-chart-pie', label: 'Dashboard' },
    { to: '/chat', icon: 'fas fa-comment-dots', label: 'AI Assistant' },
    { to: '/notifications', icon: 'fas fa-bell', label: 'Notifications' },
    { to: '/settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  // Styles
  const sidebarStyle = {
    gridArea: 'sidebar',
    backgroundColor: 'var(--grab-black, #222222)',
    color: 'white',
    height: '100vh',
    position: 'fixed',
    width: 'var(--sidebar-width, 260px)',
    padding: '20px 0',
    transition: 'all 0.3s ease',
    zIndex: 10,
    transform: isMobileOpen ? 'translateX(0)' : undefined
  };

  const sidebarHeaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    marginBottom: '20px'
  };

  const sidebarNavStyle = {
    padding: '10px 0'
  };

  const sidebarFooterStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  };

  // Handle merchant change
  const handleMerchantChange = (merchantId, merchant) => {
    if (onMerchantChange) {
      onMerchantChange(merchantId, merchant);
    }
  };

  // Handle mobile sidebar backdrop click
  const handleBackdropClick = (e) => {
    if (isMobileOpen && onMobileClose && e.target === e.currentTarget) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop - only shown when sidebar is open on mobile */}
      {isMobileOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 5,
            display: 'block'
          }}
        />
      )}
    
      <aside 
        className={`sidebar ${isMobileOpen ? 'active' : ''}`} 
        style={sidebarStyle}
      >
        <div className="sidebar-header" style={sidebarHeaderStyle}>
          <img src={logo} alt="MEX Assistant Logo" style={{ height: '40px', marginRight: '10px' }} />
          <h1 style={{ fontSize: '20px', color: 'var(--grab-green, #00b14f)' }}>MEX Assistant</h1>
        </div>
        
        <nav className="sidebar-nav" style={sidebarNavStyle}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                color: isActive ? 'var(--grab-green, #00b14f)' : '#e0e0e0',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                borderLeft: isActive ? '4px solid var(--grab-green, #00b14f)' : '4px solid transparent',
              })}
            >
              <i 
                className={item.icon}
                style={{ 
                  marginRight: '12px', 
                  fontSize: '18px', 
                  width: '24px', 
                  textAlign: 'center' 
                }}
              />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="sidebar-footer" style={sidebarFooterStyle}>
          <MerchantSelector
            merchants={merchantList}
            selectedMerchantId={selectedMerchantId}
            onChange={handleMerchantChange}
            label="Merchant ID:"
          />
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool,
  onMobileClose: PropTypes.func,
  merchants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  selectedMerchantId: PropTypes.string,
  onMerchantChange: PropTypes.func,
  logo: PropTypes.string
};

export default Sidebar;