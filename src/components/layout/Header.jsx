import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Header component that provides app navigation and user controls
 * Includes search bar, user profile, and mobile menu toggle
 */
const Header = ({ 
  onMenuToggle,
  userName = 'Merchant Admin',
  userAvatar = '/api/placeholder/35/35',
  onSearch,
  className = ''
}) => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Handle user profile click (for future dropdown functionality)
  const handleProfileClick = () => {
    // This could open a dropdown menu in the future
    console.log('Profile clicked');
  };

  // Styles
  const headerStyle = {
    gridArea: 'header',
    backgroundColor: 'var(--grab-white, #ffffff)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    width: 'calc(100% - var(--sidebar-width, 260px))',
    height: 'var(--header-height, 60px)',
    zIndex: 5,
    transition: 'width 0.3s ease'
  };

  const mobileHeaderStyle = {
    '@media (max-width: 768px)': {
      width: '100%'
    }
  };

  const menuToggleStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: 'var(--grab-dark-gray, #4a4a4a)',
    cursor: 'pointer',
    display: 'none',
    padding: '0',
    marginRight: '10px',
    // Show toggle button on mobile
    '@media (max-width: 768px)': {
      display: 'block'
    }
  };

  const searchBarStyle = {
    flex: '1',
    maxWidth: '500px',
    position: 'relative',
    margin: '0 20px',
    // Hide search on small mobile
    '@media (max-width: 576px)': {
      display: 'none'
    }
  };

  const searchInputStyle = {
    width: '100%',
    padding: '10px 15px',
    paddingLeft: '40px', // Space for the icon
    borderRadius: '20px',
    border: '1px solid #e0e0e0',
    backgroundColor: 'var(--grab-gray, #f7f7f7)',
    fontSize: '0.9rem'
  };

  const searchIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)',
    color: '#888',
    fontSize: '0.9rem'
  };

  const userProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: 'var(--grab-gray, #f7f7f7)'
    }
  };

  const userAvatarStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    marginRight: '10px',
    objectFit: 'cover'
  };

  const userNameStyle = {
    fontSize: '0.9rem',
    color: 'var(--grab-dark-gray, #4a4a4a)',
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // Hide username on smaller screens
    '@media (max-width: 480px)': {
      display: 'none'
    }
  };

  return (
    <header 
      className={`header ${className}`} 
      style={{...headerStyle, ...mobileHeaderStyle}}
    >
      <button 
        className="menu-toggle" 
        onClick={onMenuToggle} 
        style={menuToggleStyle}
        aria-label="Toggle menu"
      >
        <i className="fas fa-bars"></i>
      </button>

      <form 
        className="search-bar" 
        style={searchBarStyle}
        onSubmit={handleSearchSubmit}
      >
        <i className="fas fa-search" style={searchIconStyle}></i>
        <input 
          type="text" 
          placeholder="Search for insights..." 
          style={searchInputStyle}
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search for insights"
        />
      </form>

      <div 
        className="user-profile" 
        style={userProfileStyle}
        onClick={handleProfileClick}
        role="button"
        tabIndex={0}
      >
        <img 
          src={userAvatar} 
          alt={`${userName}'s profile`} 
          style={userAvatarStyle} 
        />
        <span style={userNameStyle}>{userName}</span>
        <i 
          className="fas fa-chevron-down" 
          style={{ 
            fontSize: '12px', 
            marginLeft: '5px', 
            color: '#888',
            '@media (max-width: 480px)': {
              display: 'none'
            }
          }}
        ></i>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  userName: PropTypes.string,
  userAvatar: PropTypes.string,
  onSearch: PropTypes.func,
  className: PropTypes.string
};

export default Header;