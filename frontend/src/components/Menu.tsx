import React, { useState, useEffect } from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setHasError(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePdfLoad = () => {
    setIsLoading(false);
  };

  const handlePdfError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center"
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0 }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-red-500/30"
      >
        <svg 
          className="w-5 h-5 md:w-6 md:h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Container */}
      <div className="w-full h-full max-w-7xl mx-auto p-2 md:p-6 relative">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-2">
            Menú Katana
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Explora nuestra carta de bebidas premium
          </p>
        </div>

        {/* PDF Container */}
        <div className="w-full h-[calc(100vh-120px)] md:h-[calc(100vh-160px)] relative bg-gray-900 rounded-lg overflow-hidden border border-red-500/30">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg font-medium">Cargando menú...</p>
                <p className="text-gray-400 text-sm mt-2">Preparando experiencia premium</p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Error al cargar el menú</h3>
                <p className="text-gray-400 mb-4">No se pudo cargar el archivo PDF</p>
                <button
                  onClick={() => window.open('/documents/menu2.pdf', '_blank')}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                >
                  Abrir en nueva pestaña
                </button>
              </div>
            </div>
          )}
          
          <iframe
            src="/documents/menu2.pdf"
            className="w-full h-full border-0"
            title="Menú de Bebidas Katana"
            onLoad={handlePdfLoad}
            onError={handlePdfError}
            style={{ 
              display: (isLoading || hasError) ? 'none' : 'block'
            }}
          />
        </div>

        {/* Footer info */}
        <div className="text-center mt-4">
          <p className="text-gray-400 text-xs md:text-sm">
            Si tienes problemas visualizando el menú, 
            <button
              onClick={() => window.open('/documents/menu2.pdf', '_blank')}
              className="text-red-400 hover:text-red-300 ml-1 underline"
            >
              ábrelo en una nueva pestaña
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;