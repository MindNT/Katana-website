import React, { useState, useEffect } from 'react';

const NosotrosSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    '/src/images/slide1.jpg',
    '/src/images/slide2.jpg',
    '/src/images/slide3.jpg',
    '/src/images/slide4.jpg',
    '/src/images/slide5.jpg'
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 px-4 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-500">
          Galería
        </h2>
        
        <div 
          className="relative h-96 perspective-1000"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Stack de imágenes */}
          <div className="relative w-full h-full flex justify-center items-center">
            {images.map((image, index) => {
              const offset = index - currentSlide;
              const absOffset = Math.abs(offset);
              const isActive = index === currentSlide;
              
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer
                    ${isActive ? 'z-30' : 'z-10'}
                  `}
                  style={{
                    transform: `
                      translateX(${offset * 120}px) 
                      translateZ(${isActive ? 0 : -absOffset * 100}px)
                      rotateY(${offset * 15}deg)
                      scale(${isActive ? 1 : 1 - absOffset * 0.1})
                    `,
                    opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
                  }}
                  onClick={() => !isActive && goToSlide(index)}
                >
                  <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                      ${!isActive ? 'bg-black/40' : ''}
                    `}></div>
                    
                    {/* Número de slide */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controles de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-full flex items-center justify-center text-white hover:bg-red-500/40 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-full flex items-center justify-center text-white hover:bg-red-500/40 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores circulares de progreso */}
        <div className="flex justify-center space-x-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-3 h-3 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-600 rounded-full"></div>
              <div 
                className={`absolute inset-0 bg-red-500 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'scale-100' : 'scale-0'
                }`}
              ></div>
              {index === currentSlide && (
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              )}
            </button>
          ))}
        </div>

        {/* Información adicional */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            {currentSlide + 1} de {images.length} imágenes
          </p>
          <div className="mt-2 w-32 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-700 ease-out"
              style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default NosotrosSection;
