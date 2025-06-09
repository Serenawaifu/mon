// src/components/Marketplace/ProductCard.js

import React from "react";
import PropTypes from "prop-types";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 flex flex-col select-none hover:shadow-card-md transition-shadow duration-300 max-w-xs">
      <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
          draggable={false}
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.title}</h3>
      <p className="text-gray-600 text-base mb-4">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${product.title} to cart`}
          className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
            
