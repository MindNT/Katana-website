import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.tsx';
import Inicio from './pages/inicio.tsx';
import Menu from './components/Menu.tsx';
import './App.css';

function App() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Inicio');

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <Router>
      <div className="App relative min-h-screen bg-black">
        {/* Contenido principal */}
        <div className="relative z-10">
          <Navbar 
            onMenuClick={() => setIsMenuModalOpen(true)} 
            onNavigate={handleNavigation}
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Inicio 
                  onMenuClick={() => setIsMenuModalOpen(true)} 
                  activeSection={activeSection}
                />
              } 
            />
            <Route 
              path="/inicio" 
              element={
                <Inicio 
                  onMenuClick={() => setIsMenuModalOpen(true)} 
                  activeSection={activeSection}
                />
              } 
            />
            {/* Más rutas se agregarán aquí */}
          </Routes>
          
          {/* Footer irá aquí */}
        </div>

        {/* Modal del Menú - A nivel de aplicación */}
        <Menu isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;