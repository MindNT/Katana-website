import React, { useState } from 'react';
import pezkoi from '../images/pezkoi.png';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
  packages: Array<{
    title: string;
    japaneseTitle: string;
    price: string;
  }>;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedPackage,
  packages 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    package: selectedPackage || '',
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.package || !formData.date || !formData.time) {
      alert('Por favor completa todos los campos');
      return;
    }

    const selectedPkg = packages.find(pkg => pkg.title === formData.package);
    const message = `Hola! Me interesa contratar sus servicios de café japonés.

*Detalles de la reserva:*
• Nombre: ${formData.name}
• Paquete: ${formData.package} ${selectedPkg?.japaneseTitle || ''}
• Precio: ${selectedPkg?.price || ''}
• Fecha: ${formData.date}
• Hora: ${formData.time}

¿Podrían confirmar disponibilidad?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/529993661475?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
    setFormData({ name: '', package: '', date: '', time: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-950 border border-red-500/30 rounded-lg p-8 max-w-md w-full relative overflow-hidden">
        {/* Decoración de pez koi */}
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute top-4 right-4 w-16 h-auto opacity-10 transform rotate-12 pointer-events-none"
        />
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute bottom-4 left-4 w-14 h-auto opacity-15 transform -rotate-30 scale-x-[-1] pointer-events-none"
        />

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 text-red-500">
            Reservar Servicio
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Yoyaku <span className="text-xs">(予約)</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Paquete
              </label>
              <select
                name="package"
                value={formData.package}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-red-500/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                required
              >
                <option value="">Selecciona un paquete</option>
                {packages.map((pkg) => (
                  <option key={pkg.title} value={pkg.title}>
                    {pkg.title} - {pkg.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Fecha del evento
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-black border border-red-500/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hora del evento
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black border border-red-500/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                Enviar WhatsApp
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-400 mt-4 text-center">
            Se abrirá WhatsApp con tu información de reserva
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
