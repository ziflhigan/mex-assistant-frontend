/**
 * Theme variables for the MEX Assistant application
 * Contains color palette, spacing, and UI measurements
 */

const theme = {
  // Colors
  colors: {
    // Primary brand colors
    grabGreen: '#00b14f',
    grabDarkGreen: '#00843a',
    grabLightGreen: '#7ed957',
    
    // Neutrals
    grabGray: '#f7f7f7',
    grabDarkGray: '#4a4a4a',
    grabWhite: '#ffffff',
    grabBlack: '#222222',
    
    // Accent colors
    accentPurple: '#9b59b6',
    accentBlue: '#3498db',
    accentOrange: '#e67e22',
    
    // Semantic colors
    success: '#2ecc71',
    warning: '#f1c40f',
    danger: '#e74c3c',
    info: '#3498db',
    
    // Background colors
    background: '#f5f5f5',
    cardBackground: '#ffffff',
    
    // Text colors
    textPrimary: '#222222',
    textSecondary: '#4a4a4a',
    textLight: '#888888',
  },
  
  // Typography
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    
    // Font sizes
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.75rem', // 28px
      '4xl': '2rem'     // 32px
    },
    
    // Font weights
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8
    }
  },
  
  // Spacing
  spacing: {
    '0': '0',
    '1': '0.25rem',  // 4px
    '2': '0.5rem',   // 8px
    '3': '0.75rem',  // 12px
    '4': '1rem',     // 16px
    '5': '1.25rem',  // 20px
    '6': '1.5rem',   // 24px
    '8': '2rem',     // 32px
    '10': '2.5rem',  // 40px
    '12': '3rem',    // 48px
    '16': '4rem',    // 64px
    '20': '5rem'     // 80px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px'   // For circles
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 10px 25px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  
  // Layout
  layout: {
    sidebarWidth: '260px',
    headerHeight: '60px',
    contentMaxWidth: '1200px'
  },
  
  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    base: 1,
    dropdown: 10,
    sticky: 50,
    modal: 100,
    toast: 200
  }
};

// CSS variables for direct use in inline styles and CSS
const cssVariables = {
  '--grab-green': theme.colors.grabGreen,
  '--grab-dark-green': theme.colors.grabDarkGreen,
  '--grab-light-green': theme.colors.grabLightGreen,
  '--grab-gray': theme.colors.grabGray,
  '--grab-dark-gray': theme.colors.grabDarkGray,
  '--grab-white': theme.colors.grabWhite,
  '--grab-black': theme.colors.grabBlack,
  '--accent-purple': theme.colors.accentPurple,
  '--accent-blue': theme.colors.accentBlue,
  '--accent-orange': theme.colors.accentOrange,
  
  '--card-shadow': theme.shadows.md,
  '--sidebar-width': theme.layout.sidebarWidth,
  '--header-height': theme.layout.headerHeight,
  '--border-radius': theme.borderRadius.lg
};

export { theme, cssVariables };
export default theme;