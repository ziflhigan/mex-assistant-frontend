import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Header component that provides app navigation and user controls
 * Includes search bar, user profile, and mobile menu toggle
 */
const Header = ({
                  onMenuToggle,
                  userName = 'Merchant Admin',
                  userAvatar = '/api/placeholder/35/35', // Default placeholder
                  onSearch,
                  className = ''
                }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
    // Future: Open dropdown menu
  };

  // --- Base Style --- (Positioning handled by grid in AppLayout)
  const headerStyle = {
    gridArea: 'header',
    height: 'var(--header-height, 60px)',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--grab-white, #ffffff)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)', // Softer shadow
    zIndex: 5,
  };

  // --- Icon Style --- (Absolute positioning relative to search bar)
  const searchIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '15px', // Position inside the input padding
    transform: 'translateY(-50%)',
    color: '#aaa', // Lighter icon color
    fontSize: '1rem', // Slightly larger icon
    pointerEvents: 'none',
  };

  // --- Avatar Style ---
  const userAvatarStyle = {
    width: '38px', // Slightly larger avatar
    height: '38px',
    borderRadius: '50%',
    marginRight: '12px', // Increased spacing
    objectFit: 'cover',
  };


  // --- Component Return ---
  return (
      // Use CSS classes for detailed styling and responsiveness
      <header className={`header ${className}`} style={headerStyle}>

        {/* Menu Toggle Button (Mobile) */}
        <button
            className="menu-toggle" // Styled in index.css
            onClick={onMenuToggle}
            aria-label="Toggle menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Search Bar Form */}
        <form
            className="search-bar" // Styled in index.css
            onSubmit={handleSearchSubmit}
            role="search"
        >
          <i className="fas fa-search search-bar-icon" style={searchIconStyle}></i>
          <input
              className="search-bar-input" // Styled in index.css
              type="text"
              placeholder="Search for insights, reports..." // Example placeholder
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search for insights"
          />
        </form>

        {/* User Profile Area */}
        <div
            className="user-profile" // Styled in index.css (including hover)
            onClick={handleProfileClick}
            role="button"
            tabIndex={0}
            aria-label={`User profile for ${userName}`}
        >
          <img
              src={userAvatar}
              alt={`${userName}'s profile`}
              style={userAvatarStyle} // Keep inline for dimensions
          />
          <span className="user-name"> {/* Styled in index.css */}
            {userName}
        </span>
          <i className="fas fa-chevron-down user-profile-chevron"> {/* Styled in index.css */}
          </i>
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