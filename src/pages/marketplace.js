// src/pages/marketplace.js

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import ProductCard from "../components/Marketplace/ProductCard";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const productCol = collection(db, "marketplaceProducts");
        const productSnapshot = await getDocs(productCol);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 pt-16 pb-20 bg-white rounded-xl shadow-card min-h-screen">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 select-none">
          Marketplace
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 italic">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => alert(`Added ${product.title} to cart`)} />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
