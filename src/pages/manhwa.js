// src/pages/manhwa.js

import React from "react";
import Layout from "../components/Layout/Layout";

export default function ManhwaPage() {
  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto p-8 bg-white rounded-xl shadow-card">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Manhwa Catalog</h1>
        <p className="text-gray-600">
          Discover your favorite manhwa here. (API integration coming soon)
        </p>
        {/* Replace with Manhwa Carousel & API data */}
      </main>
    </Layout>
  );
}
