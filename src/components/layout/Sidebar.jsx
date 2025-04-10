import React from 'react';
import { NavLink } from 'react-router-dom'; // Or custom logic for active state
import MerchantSelector from '../common/MerchantSelector';
// import { useAppContext } from '../../contexts/AppContext'; // To get/set selected merchant

// TODO: Add styling from mockup (CSS or MUI Drawer/List/ListItem)
// TODO: Handle NavLink active state styling correctly (using NavLink's isActive or similar)
// TODO: Fetch merchant list dynamically (from context or props) for MerchantSelector

const Sidebar = ({ isMobileOpen }) => {
    // const { availableMerchants, selectedMerchant, setSelectedMerchant } = useAppContext();
    const merchants = [ // Placeholder
        { id: '5c1f8', name: 'Burger Factory' },
        { id: '2e8a5', name: 'Burger Barn' },
        { id: '0e1b3', name: 'Chicken Shack'},
        { id: '1d4f2', name: 'Asian Wok' },
        { id: 'b9e5f', name: 'Seafood Express' },
    ];

    const navItemStyle = ({ isActive }) => ({
        // Basic style object - enhance with CSS classes
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        color: isActive ? 'var(--grab-green)' : '#e0e0e0',
        textDecoration: 'none',
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderLeft: isActive ? '4px solid var(--grab-green)' : '4px solid transparent',
    });


    // Note: The routing needs setup in App.jsx. These links assume routes like /dashboard, /chat etc.
  return (
    <aside className={`sidebar ${isMobileOpen ? 'active' : ''}`} style={{ /* Sidebar styles */ }}>
        <div className="sidebar-header" style={{ /* Header styles */}}>
            {/* Use actual logo */}
            <img src="/src/assets/images/logo.png" alt="MEX Assistant Logo" style={{ height: '40px', marginRight: '10px' }}/>
            <h1 style={{ fontSize: '20px', color: 'var(--grab-green)' }}>MEX Assistant</h1>
        </div>
        <nav className="sidebar-nav">
            {/* Use NavLink for automatic active class handling if using React Router */}
            <NavLink to="/dashboard" className="nav-item" style={navItemStyle}>
                <i className="fas fa-chart-pie" style={{ marginRight: '12px', width: '24px', textAlign: 'center' }}></i>
                <span>Dashboard</span>
            </NavLink>
             <NavLink to="/chat" className="nav-item" style={navItemStyle}>
                <i className="fas fa-comment-dots" style={{ marginRight: '12px', width: '24px', textAlign: 'center' }}></i>
                <span>AI Assistant</span>
            </NavLink>
             <NavLink to="/notifications" className="nav-item" style={navItemStyle}>
                <i className="fas fa-bell" style={{ marginRight: '12px', width: '24px', textAlign: 'center' }}></i>
                <span>Notifications</span>
            </NavLink>
             <NavLink to="/settings" className="nav-item" style={navItemStyle}>
                <i className="fas fa-cog" style={{ marginRight: '12px', width: '24px', textAlign: 'center' }}></i>
                <span>Settings</span>
            </NavLink>
            {/* Add more nav items */}
        </nav>
        <div className="sidebar-footer" style={{ /* Footer styles */ }}>
             <p style={{ color: '#e0e0e0', marginBottom: '5px' }}>Merchant ID:</p>
             <MerchantSelector
                merchants={merchants}
                // selectedMerchant={selectedMerchant}
                // onChange={(merchantId) => setSelectedMerchant(merchantId)}
             />
        </div>
    </aside>
  );
};

export default Sidebar;