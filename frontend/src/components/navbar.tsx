import React, { useState } from 'react';
import katanaLogo from '../images/katana.png';
import { ReactComponent as CherryIcon } from '../assets/CherryIcon.svg';

interface NavbarProps {
  onMenuClick: () => void;
  onNavigate?: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onNavigate }) => {
  // Opciones del lado izquierdo
  const leftOptions = ['Inicio', 'Nosotros', 'Paquetes'];
  // Opciones del lado derecho
  const rightOptions = ['Menú', 'Blog', 'Contacto'];
  
  const [activeSection, setActiveSection] = useState('Inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (option: string) => {
    if (option === 'Menú') {
      onMenuClick();
    } else if (option === 'Contacto') {
      window.open('https://wa.me/5219993661475', '_blank');
    } else {
      setActiveSection(option);
      if (onNavigate) {
        onNavigate(option);
      }
    }
  };

  const handleNavClick = (option: string) => {
    setActiveSection(option);
    if (onNavigate) {
      onNavigate(option);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (option: string) => {
    setIsMobileMenuOpen(false);
    if (option === 'Menú') {
      onMenuClick();
    } else if (option === 'Contacto') {
      window.open('https://wa.me/5219993661475', '_blank');
    } else {
      setActiveSection(option);
      if (onNavigate) {
        onNavigate(option);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Opciones del lado izquierdo - Solo desktop */}
            <div className="hidden md:flex space-x-8">
              {leftOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(option)}
                  className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wide flex items-center space-x-1"
                >
                  <span>{option}</span>
                  {activeSection === option && <CherryIcon className="w-3 h-3 fill-red-400" />}
                </button>
              ))}
            </div>

            {/* Logo central */}
            <div className="flex items-center space-x-2">
              <img 
                src={katanaLogo} 
                alt="Katana Logo" 
                className="h-6 w-auto sm:h-8"
              />
              <span className="text-white font-bold text-lg sm:text-xl">
                KATANA
              </span>
            </div>

            {/* Opciones del lado derecho - Solo desktop */}
            <div className="hidden md:flex space-x-8">
              {rightOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(option)}
                  className="text-white hover:text-red-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wide flex items-center space-x-1"
                >
                  <span>{option}</span>
                  {activeSection === option && <CherryIcon className="w-3 h-3 fill-red-400" />}
                </button>
              ))}
            </div>

            {/* Menú hamburguesa para móviles */}
            <div className="md:hidden">
              <button 
                onClick={handleMobileMenuToggle}
                className="text-white hover:text-red-400 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleMobileMenuToggle} />
          <div className="fixed top-16 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              {[...leftOptions, ...rightOptions].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMobileNavClick(option)}
                  className="block w-full text-left text-white hover:text-red-400 transition-colors duration-300 font-medium text-base uppercase tracking-wide py-3 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {activeSection === option && <CherryIcon className="w-4 h-4 fill-red-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;