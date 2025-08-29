import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlackButton = ({ 
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
        bg-black text-white border-2 border-white rounded-lg px-6 py-3 
        text-base font-medium transition-all duration-200 outline-none 
        inline-block text-center shadow-md hover:shadow-xl 
        hover:-translate-y-0.5 hover:bg-gray-800 hover:border-gray-100
        disabled:opacity-60 disabled:cursor-not-allowed
        disabled:hover:transform-none disabled:hover:shadow-md disabled:hover:bg-black
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BlackButton;