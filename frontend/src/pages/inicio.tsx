import React, { useState, useEffect } from 'react';
import HeroSectionInicio from '../components/HeroSectionInicio.tsx';
import Gallery from '../components/gallery.tsx';
import VideoPlayer from '../components/VideoPlayer.tsx';
import ProductBox from '../components/ProductBox.tsx';
import ProductModal from '../components/ProductModal.tsx';
import BoxBlog from '../components/BoxBlog.tsx';
import WhiteButton from '../utils/WhiteButton.tsx';
import BlackButton from '../utils/BlackButton.tsx';
import pezkoi from '../images/pezkoi.png';

interface InicioProps {
  onMenuClick: () => void;
  activeSection?: string;
}

const Inicio: React.FC<InicioProps> = ({ onMenuClick, activeSection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const packages = [
    {
      title: "Paquete Básico",
      japaneseTitle: "Kihon (基本)",
      description: "Ideal para eventos cortos, reuniones corporativas o cócteles informales.",
      features: [
        "Duración: 1 a 1.5 horas",
        "Cafe de grano molido y tostado",
        "Americano",
        "Té (variedades)",
        "Latte (variedades)",
        "Capuccino",
        "20 personas máximo"

      ],
      price: "$2,500 MXN"
    },
    {
      title: "Paquete Mediano",
      japaneseTitle: "Chuukan (中間)",
      description: "Perfecto para eventos sociales con mayor demanda de opciones frías y variadas.",
      features: [
        "Duración: 1 a 1.5 horas",
        "Cafe de grano molido y tostado",
        "Todo del Paquete Básico",
        "Moka",
        "Smoothies (variedades a selección)",
        "20 personas máximo"
      ],
      price: "$3,200 MXN",
      isPopular: true
    },
    {
      title: "Paquete Premium",
      japaneseTitle: "Puremium (プレミアム)",
      description: "La opción más completa. Ideal para bodas, fiestas, lanzamientos o eventos largos donde deseas ofrecer una experiencia completa de café y bebidas frías.",
      features: [
        "Duración: Hasta 2 horas",
        "Cafe de grano molido y tostado",
        "Incluye todas las bebidas del menú",
        "Servicio completo premium",
        "Máxima variedad de opciones",
        "30 personas máximo"
      ],
      price: "$4,000 MXN"
    }
  ];

  const openModal = (packageTitle?: string) => {
    if (packageTitle) {
      setSelectedPackage(packageTitle);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage('');
  };

  useEffect(() => {
    if (activeSection) {
      let sectionId = '';
      
      // Map navigation options to section IDs
      switch (activeSection.toLowerCase()) {
        case 'inicio':
          sectionId = 'inicio';
          break;
        case 'nosotros':
          sectionId = 'nosotros';
          break;
        case 'paquetes':
          sectionId = 'paquetes';
          break;
        case 'blog':
          sectionId = 'blog';
          break;
        default:
          sectionId = activeSection.toLowerCase();
      }
      
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64; // Height of fixed navbar
        const elementPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="inicio-page relative">
      <div id="inicio">
        <HeroSectionInicio onScheduleClick={() => openModal()} />
      </div>
      
      {/* Nueva sección con slider y filosofía japonesa */}
      <section id="nosotros" className="py-16 px-4 bg-black relative overflow-hidden">
        {/* Decoración de pez koi */}
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute top-20 left-6 w-40 h-auto opacity-15 transform -rotate-12 pointer-events-none"
        />
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute bottom-20 right-8 w-40 h-auto opacity-20 transform rotate-45 scale-x-[-1] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Slider a la izquierda */}
            <div>
              <Gallery />
            </div>

            {/* Contenido filosófico a la derecha */}
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6 text-red-500">
                Nuestra Filosofía
              </h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-300">
                  Kaizen <span className="text-sm text-gray-400">(改善)</span>
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Adoptamos el <strong className="text-red-400">Kaizen</strong>, 
                  la filosofía japonesa de mejora continua que busca la perfección 
                  a través de pequeños cambios constantes y deliberados.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Limpieza Impecable</h4>
                    <p className="text-gray-300">
                      Cada herramienta, cada espacio de trabajo mantiene un estándar 
                      de pulcritud que refleja nuestro compromiso con la excelencia.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Presentación Perfecta</h4>
                    <p className="text-gray-300">
                      La estética y funcionalidad se fusionan en cada proyecto, 
                      creando resultados que superan las expectativas visuales.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Profesionalismo Total</h4>
                    <p className="text-gray-300">
                      Dedicación absoluta en cada tarea, tratando cada proyecto 
                      como una obra maestra en construcción.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 border border-red-500/30 rounded-lg bg-gradient-to-r from-red-500/10 to-transparent">
                <blockquote className="text-gray-300 italic text-lg">
                  "La perfección no es un destino, sino un camino de mejora continua. 
                  Cada día es una oportunidad de superar lo que hicimos ayer."
                </blockquote>
                <cite className="block text-right text-red-400 mt-3 text-sm">- Filosofía Kaizen</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva sección de Arte Latte */}
      <section className="py-16 px-4 bg-black relative overflow-hidden">
        {/* Decoración de pez koi */}
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute top-16 right-10 w-32 h-auto opacity-10 transform rotate-12 pointer-events-none"
        />
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute bottom-16 left-10 w-36 h-auto opacity-15 transform -rotate-30 scale-x-[-1] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido de Arte Latte a la izquierda */}
            <div className="text-white lg:order-1">
              <h2 className="text-4xl font-bold mb-6 text-red-500">
                Café Premium
              </h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-300">
                  Shokunin <span className="text-sm text-gray-400">(職人)</span>
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Como verdaderos <strong className="text-red-400">artesanos del café</strong>, 
                  seleccionamos únicamente granos de la más alta calidad. Rechazamos los instantáneos 
                  y apostamos por el café molido fresco que respeta el origen y el proceso.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Granos Selectos</h4>
                    <p className="text-gray-300">
                      Utilizamos exclusivamente café de grano tostado y molido 
                      para preservar todos los aceites esenciales y aromas naturales.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Frescura Garantizada</h4>
                    <p className="text-gray-300">
                      Cada taza se prepara con café molido, nunca instantáneo. 
                      La diferencia se percibe en cada sorbo, en cada aroma que despierta los sentidos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Estándar Superior</h4>
                    <p className="text-gray-300">
                      Nuestro compromiso con la calidad significa rechazar soluciones fáciles 
                      y apostar por ingredientes que honran la tradición cafetera.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 border border-red-500/30 rounded-lg bg-gradient-to-l from-red-500/10 to-transparent">
                <blockquote className="text-gray-300 italic text-lg">
                  "El respeto por el café comienza con la elección del grano. 
                  Solo con ingredientes auténticos se puede crear una experiencia verdaderamente memorable."
                </blockquote>
                <cite className="block text-right text-red-400 mt-3 text-sm">- Filosofía del Grano</cite>
              </div>
            </div>

            {/* Elemento visual a la derecha */}
            <div className="lg:order-2 flex justify-center">
              <VideoPlayer 
                src="/videos/video2.mp4" 
                className="transform hover:scale-105 transition-transform duration-500"
                muted={true}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nueva sección de Paquetes */}
      <section id="paquetes" className="py-16 px-4 bg-gray-950 relative overflow-hidden">
        {/* Decoración de pez koi */}
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute top-20 left-6 w-40 h-auto opacity-10 transform rotate-45 pointer-events-none"
        />
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute bottom-20 right-8 w-36 h-auto opacity-10 transform -rotate-12 scale-x-[-1] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-red-500">
              Nuestros Paquetes
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Experimenta la perfección del café japonés con nuestros paquetes diseñados 
              para crear momentos únicos en cada evento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, index) => (
              <ProductBox
                key={index}
                title={pkg.title}
                japaneseTitle={pkg.japaneseTitle}
                description={pkg.description}
                features={pkg.features}
                price={pkg.price}
                isPopular={pkg.isPopular}
                onContractClick={() => openModal(pkg.title)}
              />
            ))}
          </div>

          {/* Información adicional sobre cargos extras */}
          <div className="mb-12 p-6 border border-red-500/30 rounded-lg bg-gradient-to-r from-red-500/10 to-transparent max-w-4xl mx-auto">
            <p className="text-gray-300 text-center text-sm">
              <span className="text-red-400 font-semibold">Nota importante:</span> Después del tiempo contratado, cada bebida se cobra por unidad (precio ya incluye IVA).<br />
              <span className="text-xs text-gray-400 mt-2 block">
                Ejemplo: Latte $60, Frappe de Oreo $85, etc.
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onMenuClick}
              className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Conocer el Menú
            </button>
            <button
              onClick={() => openModal()}
              className="w-full sm:w-auto px-8 py-3 bg-black text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
            >
              Contratar Servicios
            </button>
          </div>
        </div>
      </section>

      {/* Nueva sección de Blog/Eventos */}
      <section id="blog" className="py-16 px-4 bg-black relative overflow-hidden">
        {/* Decoración de pez koi */}
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute top-10 left-8 w-32 h-auto opacity-15 transform rotate-12 pointer-events-none"
        />
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute bottom-10 right-12 w-40 h-auto opacity-10 transform -rotate-45 scale-x-[-1] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-red-500">
              Nuestros Eventos Recientes
            </h2>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-300">
                Monogatari <span className="text-sm text-gray-400">(物語)</span>
              </h3>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Cada evento cuenta una historia única. Descubre cómo hemos creado 
                <strong className="text-red-400"> momentos memorables</strong> aplicando 
                nuestra filosofía del café premium en diferentes celebraciones.
              </p>
            </div>
          </div>

          {/* Componente BoxBlog */}
          <div className="mb-16">
            <BoxBlog />
          </div>
        </div>
      </section>

      {/* Modal de Producto */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedPackage={selectedPackage}
        packages={packages}
      />
    </div>
  );
};

export default Inicio;