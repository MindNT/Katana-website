import React from 'react';

const ProductBox = ({ title, japaneseTitle, description, features, price, isPopular = false }) => {
  return (
    <div className={`
      relative bg-gradient-to-b from-gray-900 to-black border rounded-xl p-8 h-full
      transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl
      ${isPopular 
        ? 'border-red-500 shadow-lg shadow-red-500/20' 
        : 'border-gray-700 hover:border-red-500/50'
      }
    `}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Más Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-red-400 text-lg font-medium">{japaneseTitle}</p>
      </div>
      
      <div className="text-center mb-8">
        <span className="text-4xl font-bold text-red-500">{price}</span>
      </div>
      
      <p className="text-gray-400 text-center mb-8 leading-relaxed text-sm">
        {description}
      </p>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBox;
