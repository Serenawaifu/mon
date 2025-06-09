// src/pages/manga.js

import React from "react";
import Layout from "../components/Layout/Layout";

export default function MangaPage() {
  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto p-8 bg-white rounded-xl shadow-card">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8">Manga Catalog</h1>
        <p className="text-gray-600">
          Browse manga titles here. (API integration coming soon)
        </p>
        {/* Replace with Manga Carousel & API data */}
      </main>
    </Layout>
  );
}
