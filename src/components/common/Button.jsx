import React from 'react';
import MuiButton from '@mui/material/Button';

// Simple custom button or wrapper around MUI button
// TODO: Add styling (using CSS Modules, Styled Components, or MUI sx prop)
// TODO: Define variants (primary, secondary, text), sizes, disabled state, icon support

const Button = ({ children, onClick, variant = 'contained', color = 'primary', startIcon, endIcon, disabled = false, ...props }) => {
  // If using MUI:
  // return (
  //   <MuiButton
  //     variant={variant}
  //     color={color}
  //     onClick={onClick}
  //     startIcon={startIcon}
  //     endIcon={endIcon}
  //     disabled={disabled}
  //     {...props}
  //   >
  //     {children}
  //   </MuiButton>
  // );

  // Basic custom button example:
  const baseStyle = { padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', margin: '4px' };
  // Add styles based on variant/color props...
   const primaryStyle = { backgroundColor: '#00b14f', color: 'white'};
   const textStyle = { backgroundColor: 'transparent', color: '#00b14f' };
   const currentStyle = variant === 'text' ? textStyle : primaryStyle;

  return (
    <button onClick={onClick} style={{...baseStyle, ...currentStyle}} disabled={disabled} {...props}>
      {startIcon && <span style={{ marginRight: '8px' }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ marginLeft: '8px' }}>{endIcon}</span>}
    </button>
  );
};

export default Button;