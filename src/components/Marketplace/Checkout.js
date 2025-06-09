// src/components/Marketplace/Checkout.js

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Checkout({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "card", // "card", "crypto", "upi"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setForm((f) => ({ ...f, paymentMethod: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-card space-y-8 select-none">
      <h2 className="text-4xl font-extrabold text-gray-900">Checkout</h2>

      {/* User Info */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
            placeholder="john@example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block mb-2 font-semibold text-gray-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={form.address}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
            placeholder="123 Elm Street"
          />
        </div>

        <div>
          <label htmlFor="city" className="block mb-2 font-semibold text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={form.city}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
            placeholder="New York"
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block mb-2 font-semibold text-gray-700">
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            required
            value={form.postalCode}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
            placeholder="10001"
          />
        </div>

        <div>
          <label htmlFor="country" className="block mb-2 font-semibold text-gray-700">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            value={form.country}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
            placeholder="USA"
          />
        </div>
      </section>

      {/* Payment Method Selection */}
      <section>
        <span className="block mb-3 font-semibold text-gray-700">Payment Method</span>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === "card"}
              onChange={handlePaymentChange}
              disabled={loading}
              className="form-radio text-black focus:ring-black"
            />
            <span className="ml-2 text-gray-900 font-semibold">Credit/Debit Card</span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="crypto"
              checked={form.paymentMethod === "crypto"}
              onChange={handlePaymentChange}
              disabled={loading}
              className="form-radio text-black focus:ring-black"
            />
            <span className="ml-2 text-gray-900 font-semibold">Crypto Wallet</span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={form.paymentMethod === "upi"}
              onChange={handlePaymentChange}
              disabled={loading}
              className="form-radio text-black focus:ring-black"
            />
            <span className="ml-2 text-gray-900 font-semibold">UPI (Razorpay)</span>
          </label>
        </div>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-lg bg-black text-white font-bold text-lg shadow hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}

Checkout.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Checkout.defaultProps = {
  loading: false,
};
              
