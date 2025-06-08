/**
 * gatsby-browser.js
 * Global browser-side lifecycle and style injects for Wulu
 * Follows Minimal, Elegant Component Library UI conventions.
 */

import "./src/styles/global.css"; // Tailwind CSS & base styles

// --- OPTIONAL: Animate page transitions with Framer Motion ---
// You can wrap the root element with a ThemeProvider, Layout, motion, etc.

import React from "react";
import ThemeProvider from "./src/components/Theme/ThemeProvider";

/**
 * Wrap every page in ThemeProvider for theme/context.
 */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

// Optionally, scroll to top on route update for smoother UX
export const onRouteUpdate = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
};
