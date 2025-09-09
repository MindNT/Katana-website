import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiExternalLink } from 'react-icons/fi';
import WhiteButton from '../utils/WhiteButton.tsx';
import BlackButton from '../utils/BlackButton.tsx';
import PedidoModal from './PedidoModal.tsx';
import evento1Image from '../images/evento1.png';
import evento2Image from '../images/evento2.png';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  category: string;
}

const BoxBlog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null); // Changed from isHovered to hoveredPostId for individual hover

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Puesto de café en el Parque de los Discapacitados",
      date: "Todos los domingos",
      location: "Parque de los Discapacitados. Mérida, Caucel.",
      description: "Participamos en el tianguis de Caucel brindando café premium a los participantes y espectadores. Es una experiencia increíble ver cómo nuestro café acompaña los momentos de creatividad y arte con la comunidad.",
      image: evento2Image,
      category: "Evento Comunitario"
    },
    {
      id: 2,
      title: "Evento Privado Club Mazda MX5",
      date: "13 Septiembre 2025",
      location: "Reunión Privada, Mérida",
      description: "Serviremos a aproximadamente 40 entusiastas del Mazda MX5 en su evento cerrado del club. Los miembros disfrutaran de nuestros cafés especiales mientras compartían anécdotas sobre sus autos clásicos.",
      image: evento1Image,
      category: "Eventos Privado"
    }
  ];

  // Add auto-play functionality (advance by 2)
  useEffect(() => {
    if (hoveredPostId === null) { // Pause only if no post is hovered
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 2) % blogPosts.length
        );
      }, 5000); // Auto-advance every 5 seconds
      return () => clearInterval(interval);
    }
  }, [hoveredPostId, blogPosts.length]); // Updated dependency

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 2) % blogPosts.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 2 < 0 ? blogPosts.length - 2 : prevIndex - 2
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index * 2); // Jump to group of 2
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div 
        className="overflow-hidden rounded-lg relative"
        // Removed global onMouseEnter/onMouseLeave
      >
        <div 
          className="flex gap-2 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex / 2) * 100}%)` }}
        >
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="w-1/2 flex-shrink-0 relative"
              onMouseEnter={() => setHoveredPostId(post.id)} // Individual hover start
              onMouseLeave={() => setHoveredPostId(null)} // Individual hover end
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-96 object-cover aspect-square rounded-lg" // Added rounded-lg for rounded borders
              />
              {/* Glass effect overlay on hover */}
              <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${hoveredPostId === post.id ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col justify-center items-center h-full p-6 text-white text-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{post.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4">{post.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center mt-8 gap-4">
        <button
          onClick={prevSlide}
          className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/30 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(blogPosts.length / 2) }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / 2)
                  ? 'bg-red-500'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/30 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Sección del mapa integrado */}
      <div className="mt-16 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 border border-red-500/30 rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ubicación de Fin de Semana
          </h3>
          <p className="text-gray-300 text-lg">
            Encuéntranos en <strong className="text-red-400">Nuestro nuevo local </strong> o en el <strong className="text-red-400">Parque de los Discapacitados </strong>
            todos los domingos
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Información del lugar */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-gray-900/50 border border-red-500/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Información del Lugar</h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Horario:</strong> 7:00 AM - 12:00 PM / 5:00 PM - 10:00 PM</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Días:</strong> Lunes - Domingos</span>
                </div>
                
                <div className="flex items-start gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><strong>Ubicación:</strong> Calle 31 #862 x 108 y 110. Ciudad Caucel. Local N1.</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Servicio:</strong> Café premium, bebidas frías y postres</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm font-medium text-center">
                  ¡Ven y prueba la experiencia completa del café en un ambiente acogedor!
                </p>
              </div>
            </div>
          </div>
          
          {/* Mapa de Google */}
          <div className="lg:w-2/3">
            <div className="bg-gray-900/50 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-4 text-center">
                Cómo Llegar
              </h4>
              <div className="relative rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1881.7559015250395!2d-89.71854026106236!3d21.009302996147696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f560b5d11d1c30f%3A0xba867795a03cd33b!2sC.%2031%20862%2C%20Cd%20Caucel%2C%2097314%20M%C3%A9rida%2C%20Yuc.!5e0!3m2!1ses-419!2smx!4v1757033601747!5m2!1ses-419!2smx" 
                  width="600" 
                  height="450" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
              
              <div className="mt-4 text-center">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <button
                    onClick={handleOpenModal}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Levantar Pedido
                  </button>
                  
                  <a 
                    href="https://maps.google.com/?q=Parque+De+Los+Discapacitados,+Mérida,+Yucatán" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3 bg-black border border-white text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pedido */}
      <PedidoModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default BoxBlog;