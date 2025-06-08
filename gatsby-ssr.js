/**
 * gatsby-ssr.js
 * Server-side rendering hooks for Wulu
 * Clean, minimal, theme-aware root wrapper (component library style)
 */

import React from "react";
import ThemeProvider from "./src/components/Theme/ThemeProvider";

// Inject Inter font and global meta, accessible to all builds
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="inter"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />,
    <meta key="color-scheme" name="color-scheme" content="light dark" />
  ]);
};

/**
 * Wrap root in theme context for SSR (dark/light mode support everywhere).
 */
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
