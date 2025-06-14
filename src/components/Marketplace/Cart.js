// src/components/Marketplace/Cart.js

import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa"; // Update this import

export default function Cart({ items, onRemoveItem, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="max-w-md bg-white rounded-xl shadow-card p-6 fixed right-6 top-20 bottom-6 flex flex-col w-full md:max-w-md z-50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600 italic">Your cart is empty.</p>
      ) : (
        <ul className="flex-1 overflow-y-auto space-y-4 mb-6">
          {items.map(({ id, title, price, quantity }) => (
            <li key={id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm">
                  Qty: {quantity} × ${price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => onRemoveItem(id)}
                aria-label={`Remove ${title} from cart`}
                className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none"
              >
                <FaTrash className="w-5 h-5" /> {/* Updated here */}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className={`w-full py-4 rounded-lg text-white font-semibold text-lg shadow ${
            items.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-black hover:bg-gray-900"
          } focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors`}
          aria-label="Proceed to checkout"
        >
          Checkout
        </button>
      </div>
    </section>
  );
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  onRemoveItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  items: [],
};
