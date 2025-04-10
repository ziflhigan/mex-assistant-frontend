import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

/**
 * Modal component for displaying content in a popup/dialog
 * Used for confirmations, forms, and any content that should appear over the main UI
 */
const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  maxWidth = '500px',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  ...props
}) => {
  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Styles for the modal components
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: 'var(--border-radius, 10px)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: maxWidth,
    width: '100%',
    maxHeight: '90vh',
    animation: 'modalFadeIn 0.3s'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 20px 15px',
    borderBottom: '1px solid #f0f0f0'
  };

  const titleStyle = {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--grab-dark-gray, #4a4a4a)'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
    padding: '0 5px',
    lineHeight: 1,
    transition: 'color 0.2s'
  };

  const contentStyle = {
    padding: '20px',
    overflowY: 'auto',
    flex: 1
  };

  const footerStyle = {
    padding: '15px 20px 20px',
    borderTop: footer ? '1px solid #f0f0f0' : 'none',
    display: footer ? 'flex' : 'none',
    justifyContent: 'flex-end',
    gap: '10px'
  };
  
  // Add keyframes for animation
  const keyframes = `
    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  // Create the modal structure
  const modalContent = (
    <>
      <style>{keyframes}</style>
      <div 
        className={`modal-overlay ${overlayClassName}`} 
        style={overlayStyle} 
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className={`modal ${className}`} style={modalStyle}>
          {(title || showCloseButton) && (
            <div className="modal-header" style={headerStyle}>
              {title && <h2 className="modal-title" style={titleStyle}>{title}</h2>}
              {showCloseButton && (
                <button 
                  className="modal-close-button" 
                  onClick={onClose} 
                  style={closeButtonStyle}
                  aria-label="Close"
                >
                  &times;
                </button>
              )}
            </div>
          )}
          
          <div className={`modal-content ${contentClassName}`} style={contentStyle}>
            {children}
          </div>
          
          {footer && (
            <div className="modal-footer" style={footerStyle}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Use a portal to render the modal at the body level
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  maxWidth: PropTypes.string,
  closeOnOutsideClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  contentClassName: PropTypes.string
};

export default Modal;