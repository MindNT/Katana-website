import React from 'react';
import WhiteButton from '../utils/WhiteButton.tsx';

interface HeroSectionInicioProps {
  onScheduleClick: () => void;
}

const HeroSectionInicio: React.FC<HeroSectionInicioProps> = ({ onScheduleClick }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      >
        <source src="/videos/video1.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20"></div>
      
      {/* Content */}
      <div className="relative z-30 w-full pl-8 md:pl-16 lg:pl-20">
        <div className="max-w-4xl text-left">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            Experiencias de Café Excepcionales
          </h1>
          <p className="text-white text-lg md:text-xl font-light leading-relaxed mb-8 drop-shadow-md">
            Transformamos tus eventos privados y fiestas con nuestro servicio profesional 
            de barra de café. Calidad premium y atención personalizada para crear 
            momentos inolvidables.
          </p>
          <button
            onClick={onScheduleClick}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Agendar evento
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionInicio;
