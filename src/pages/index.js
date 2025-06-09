// src/pages/index.js

import React from "react";
import Layout from "../components/Layout/Layout";
import Carousel from "../components/Carousel/Carousel";
import ProductCard from "../components/Marketplace/ProductCard";

const dummyProducts = [
  {
    id: "prod1",
    title: "Collector's Edition Figure",
    description: "Limited edition collectible figure.",
    price: 59.99,
    image: "/images/product1.jpg",
  },
  {
    id: "prod2",
    title: "Manga Volume 5",
    description: "Latest volume with exclusive cover.",
    price: 14.99,
    image: "/images/product2.jpg",
  },
];

// Dummy placeholder carousel items
const dummyCarouselItem = (prefix, i) => (
  <div
    key={i}
    className="bg-gray-100 rounded-xl shadow-card h-48 flex items-center justify-center text-gray-500 text-lg font-semibold select-none"
  >
    {prefix} {i + 1}
  </div>
);

const dummyAnime = Array.from({ length: 6 }, (_, i) => dummyCarouselItem("Anime", i));
const dummyManga = Array.from({ length: 6 }, (_, i) => dummyCarouselItem("Manga", i));
const dummyManhwa = Array.from({ length: 6 }, (_, i) => dummyCarouselItem("Manhwa", i));

export default function Home() {
  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 pt-20 pb-20 space-y-20 bg-white">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Wulu 🔎
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Discover, discuss, and collect your favorite Anime & Manga titles.
          </p>
          <a
            href="/browse"
            className="inline-block px-10 py-4 bg-black text-white rounded-lg font-bold text-xl shadow hover:bg-gray-900 transition"
          >
            Browse Catalog
          </a>
        </section>

        {/* Anime Carousel */}
        <section aria-label="Anime Catalog" className="mt-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Anime</h2>
          <Carousel>{dummyAnime}</Carousel>
        </section>

        {/* Manga Carousel */}
        <section aria-label="Manga Catalog" className="mt-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Manga</h2>
          <Carousel>{dummyManga}</Carousel>
        </section>

        {/* Manhwa Carousel */}
        <section aria-label="Manhwa Catalog" className="mt-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Manhwa</h2>
          <Carousel>{dummyManhwa}</Carousel>
        </section>

        {/* Marketplace Banner */}
        <section
          aria-label="Marketplace"
          className="mt-20 bg-gray-50 p-8 rounded-xl shadow-card max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Marketplace</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => alert(`Added ${product.title} to cart`)}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
          }
