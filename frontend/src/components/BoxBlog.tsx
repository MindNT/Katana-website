import React, { useState } from 'react';
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

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Concurso de Talentos Caucel",
      date: "27 Julio 2025",
      location: "Caucel, Mérida",
      description: "Participamos en el concurso de talentos de Caucel brindando café premium a los participantes y espectadores. Fue una experiencia increíble ver cómo nuestro café acompañó los momentos de creatividad y arte de la comunidad.",
      image: evento2Image,
      category: "Eventos Comunitarios"
    },
    {
      id: 2,
      title: "Evento Privado Club Mazda MX5",
      date: "8 AGOSTO 2025",
      location: "Reunión Privada, Mérida",
      description: "Serviremos a aproximadamente 20 entusiastas del Mazda MX5 en su evento cerrado del club. Los miembros disfrutaran de nuestros cafés especiales mientras compartían anécdotas sobre sus autos clásicos.",
      image: evento1Image,
      category: "Eventos Privados"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {blogPosts.map((post) => (
            <div key={post.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-gray-900 border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/50 transition-all duration-300 group">
                <div className="relative h-48 bg-gray-800 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-gray-900/30"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-red-400 text-sm font-medium">{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{post.location}</span>
                    </div>
                    
                    <button className="text-red-500 hover:text-red-400 transition-colors duration-300 text-sm font-medium">
                      Leer más →
                    </button>
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
          {blogPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
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
            Encuéntranos en el <strong className="text-red-400">Parque de los Discapacitados</strong> 
            todos los sábados y domingos
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
                  <span><strong>Horario:</strong> 9:00 AM - 6:00 PM</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Días:</strong> Sábados y Domingos</span>
                </div>
                
                <div className="flex items-start gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><strong>Ubicación:</strong> Parque de los Discapacitados, Mérida, Yucatán</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Servicio:</strong> Café premium y bebidas frías</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm font-medium text-center">
                  ¡Ven y prueba la experiencia completa del café japonés!
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.687740748243!2d-89.71919522398474!3d21.005150580638198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f560b2344c3b933%3A0x832dbdcd137f024!2sParque%20De%20Los%20Discapacitados!5e0!3m2!1ses-419!2smx!4v1754336691112!5m2!1ses-419!2smx" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
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
