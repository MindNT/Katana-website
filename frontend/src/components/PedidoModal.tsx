import React, { useState } from 'react';
import pezkoi from '../images/pezkoi.png';

interface Product {
  id: number;
  name: string;
  japaneseName: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface PedidoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PedidoModal: React.FC<PedidoModalProps> = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('cafe');

  // Dummy products - to be replaced with real data
  const products: Product[] = [
    { id: 1, name: 'Americano', japaneseName: '', price: 45, category: 'espresso' },
    { id: 2, name: 'Espresso', japaneseName: '', price: 45, category: 'espresso' },
    { id: 3, name: 'Cappuccino', japaneseName: '', price: 55, category: 'espresso' },
    { id: 4, name: 'Latte', japaneseName: '', price: 65, category: 'espresso' },
    { id: 5, name: 'Mocha', japaneseName: '', price: 70, category: 'espresso' },
    { id: 6, name: 'Caramel Macchiato', japaneseName: '', price: 70, category: 'espresso' },
    { id: 7, name: 'Affogato', japaneseName: '', price: 65, category: 'espresso' },
    { id: 8, name: 'Cold Brew', japaneseName: '', price: 70, category: 'espresso' },
    { id: 9, name: 'Frappuccino', japaneseName: '', price: 65, category: 'espresso' },
    { id: 10, name: 'Frappuccino Nutella', japaneseName: '', price: 80, category: 'espresso' },
    { id: 11, name: 'Frappé de oreo', japaneseName: '', price: 80, category: 'sincafe'},
    { id: 12, name: 'Frappé de mazapán', japaneseName: '', price: 70, category: 'sincafe'},
    { id: 13, name: 'Frappé de Carlos V', japaneseName: '', price: 65, category: 'sincafe'},
    { id: 14, name: 'Frappé de Nutella', japaneseName: '', price: 70, category: 'sincafe' },
    { id: 15, name: 'Frappé de Horchata Artesanal', japaneseName: '', price: 65, category: 'sincafe' },
    { id: 16, name: 'Frappé frutal', japaneseName: '', price: 65, category: 'sincafe' },
    { id: 17, name: 'Mangoyada', japaneseName: '', price: 70, category: 'sincafe' },
    { id: 18, name: 'Té helado', japaneseName: '', price: 45, category: 'sincafe' },
    { id: 19, name: 'Horchata Artesanal', japaneseName: '', price: 50, category: 'sincafe' },
    { id: 20, name: 'Chocolate', japaneseName: '', price: 60, category: 'sincafe' },
    { id: 21, name: 'Fresa', japaneseName: '', price: 75, category: 'smoothies' },
    { id: 22, name: 'Plátano', japaneseName: '', price: 75, category: 'smoothies' },
    { id: 23, name: 'Piña', japaneseName: '', price: 75, category: 'smoothies' },
    { id: 24, name: 'Mango', japaneseName: '', price: 75, category: 'smoothies' },
    { id: 25, name: 'Frutos Rojos', japaneseName: '', price: 75, category: 'smoothies' },
    { id: 26, name: 'Flan Imposible', japaneseName: '', price: 45, category: 'postres' },
    { id: 27, name: 'Flan Napolitano', japaneseName: '', price: 35, category: 'postres' },
    { id: 28, name: 'Fogata de bombones', japaneseName: '', price: 250, category: 'postres' }
  ];

  const categories = [
    { id: 'espresso', name: 'Espresso', japanese: '' },
    { id: 'sincafe', name: 'Sin Café', japanese: '' },
    { id: 'smoothies', name: 'Smoothies', japanese: '' },
    { id: 'postres', name: 'Postres', japanese: '' }
  ];

  const filteredProducts = products.filter(product => product.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const sendWhatsAppOrder = () => {
    if (!customerName || !orderDate || !orderTime || cart.length === 0) {
      alert('Por favor completa todos los campos y selecciona al menos un producto.');
      return;
    }

    let message = `🌸 *Nuevo Pedido - Katana Coffee* 🌸\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📅 *Fecha:* ${orderDate}\n`;
    message += `⏰ *Hora:* ${orderTime}\n\n`;
    message += `📋 *Productos solicitados:*\n`;
    
    cart.forEach(item => {
      message += `• ${item.name} (${item.japaneseName}) - Cantidad: ${item.quantity} - $${item.price * item.quantity} MXN\n`;
    });

    message += `\n💰 *Total: $${calculateTotal()} MXN*\n\n`;
    message += `¡Gracias por elegir Katana Coffee! 🙏`;

    const phoneNumber = '529993661475';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Decoración de pez koi */}
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute top-4 right-4 w-16 h-auto opacity-20 transform rotate-12 pointer-events-none z-10"
        />
        <img 
          src={pezkoi} 
          alt="Koi decoration" 
          className="absolute bottom-4 left-4 w-20 h-auto opacity-15 transform -rotate-30 scale-x-[-1] pointer-events-none z-10"
        />

        {/* Header */}
        <div className="bg-red-500 text-white p-6 relative z-20">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Realizar Pedido</h2>
              <p className="text-red-100">Chuumon (注文)</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] relative z-20">
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Información del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                  placeholder="Tu nombre..."
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Fecha del Pedido</label>
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Hora del Pedido</label>
                <input
                  type="time"
                  value={orderTime}
                  onChange={(e) => setOrderTime(e.target.value)}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Categorías</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                  <span className="block text-xs opacity-75">{category.japanese}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Products */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Productos</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">{product.name}</h4>
                        <p className="text-gray-400 text-sm">{product.japaneseName}</p>
                        <p className="text-red-400 font-semibold">${product.price} MXN</p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Tu Pedido</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No hay productos seleccionados</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                          <div className="flex-1">
                            <h5 className="text-white font-medium">{item.name}</h5>
                            <p className="text-gray-400 text-sm">${item.price} c/u</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center hover:bg-red-600"
                            >
                              -
                            </button>
                            <span className="text-white w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center hover:bg-red-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-red-400">${calculateTotal()} MXN</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={sendWhatsAppOrder}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              Enviar Pedido por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoModal;
