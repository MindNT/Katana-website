import React, { useState, useEffect } from 'react';
import slide1 from '../images/slide1.jpg';
import slide2 from '../images/slide2.jpg';
import slide3 from '../images/slide3.jpg';
import slide4 from '../images/slide4.jpg';
import slide5 from '../images/slide5.jpg';

const Gallery: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
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
                  className={`absolute transition-all duration-700 ease-out
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
                  </div>
                </div>
              );
            })}
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

export default Gallery;