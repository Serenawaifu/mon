// src/components/Reader/MangaReader.js

import React, { useState, useEffect, useRef, useCallback } from "react";

const PRELOAD_AHEAD = 3;

/**
 * MangaReader - loads and displays manga pages with infinite scroll.
 * Props:
 *  - pages: array of image URLs (required)
 *  - initialPage: number (optional, default 0)
 */
export default function MangaReader({ pages, initialPage = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialPage);
  const containerRef = useRef(null);

  // Load more pages as user nears bottom
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setCurrentIndex((idx) => Math.min(idx + 1, pages.length - 1));
    }
  }, [pages.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Preload images ahead of current page
  useEffect(() => {
    for (let i = currentIndex; i < Math.min(currentIndex + PRELOAD_AHEAD, pages.length); i++) {
      const img = new Image();
      img.src = pages[i];
    }
  }, [currentIndex, pages]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Manga Reader"
      role="region"
      className="max-w-3xl mx-auto h-screen overflow-y-auto bg-white py-16 px-6 rounded-xl shadow-card"
    >
      {pages.slice(0, currentIndex + 1).map((src, index) => (
        <img
          src={src}
          alt={`Page ${index + 1}`}
          key={src}
          loading="lazy"
          draggable={false}
          className="w-full mb-10 rounded-lg shadow-md"
        />
      ))}
    </div>
  );
}
