import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhiteButton = ({ 
  text, 
  url, 
  onClick, 
  disabled = false, 
  className = '', 
  external = false 
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(e);
    }
    
    if (url) {
      if (external) {
        window.open(url, '_blank');
      } else {
        navigate(url);
      }
    }
  };

  return (
    <button
      className={`
        bg-white text-black border-2 border-gray-200 rounded-lg px-6 py-3 
        text-base font-medium transition-all duration-200 outline-none 
        inline-block text-center shadow-md hover:shadow-lg 
        hover:-translate-y-0.5 hover:border-gray-300
        disabled:opacity-60 disabled:cursor-not-allowed
        disabled:hover:transform-none disabled:hover:shadow-md
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default WhiteButton;