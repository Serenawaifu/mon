// src/pages/checkout.js

import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "card",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Implement payment submission logic here
    setTimeout(() => setLoading(false), 2000); // placeholder delay
    alert("Checkout submitted (mock)");
  };

  return (
    <Layout>
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-16 bg-white rounded-xl shadow-card">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 select-none">
          Checkout
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700"
            >
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block mb-2 font-semibold text-gray-700"
            >
              Shipping Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={form.address}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block mb-2 font-semibold text-gray-700"
              >
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block mb-2 font-semibold text-gray-700"
              >
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block mb-2 font-semibold text-gray-700"
              >
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
          </div>

          <fieldset>
            <legend className="text-lg font-semibold mb-2 text-gray-700">
              Payment Method
            </legend>
            <div className="flex flex-wrap gap-6">
              {[
                { id: "card", label: "Credit/Debit Card" },
                { id: "crypto", label: "Crypto Wallet" },
                { id: "upi", label: "UPI (Razorpay)" },
              ].map(({ id, label }) => (
                <label
                  key={id}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={id}
                    checked={form.paymentMethod === id}
                    onChange={handleChange}
                    disabled={loading}
                    className="form-radio text-black focus:ring-black"
                  />
                  <span className="ml-2 text-gray-900 font-semibold">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg bg-black text-white font-bold shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing…" : "Place Order"}
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
