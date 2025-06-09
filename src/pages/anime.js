// src/pages/anime.js

import React from "react";
import Layout from "../components/Layout/Layout";

export default function AnimePage() {
  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto p-8 bg-white rounded-xl shadow-card">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Anime Catalog</h1>
        <p className="text-gray-600">
          Explore the full anime collection here. (API integration coming soon)
        </p>
        {/* Replace with Anime Carousel & API data */}
      </main>
    </Layout>
  );
}
