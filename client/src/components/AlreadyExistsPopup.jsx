import React from 'react';
import './AlreadyExistsPopup.css';

const AlreadyExistsPopup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-zoom">
        <div className="modal-icon">⚠️</div>
        <h2>Wait a moment!</h2>
        <p>{message || "This product is already in your collection."}</p>
        <button onClick={onClose} className="modal-close-btn">Understood</button>
      </div>
    </div>
  );
};

export default AlreadyExistsPopup;
