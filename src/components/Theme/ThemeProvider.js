// src/components/Theme/ThemeProvider.js

import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Available themes
export const THEMES = [
  "retro-pixel",
  "sakura-blossom",
  "cyberpunk-neon",
  "minimal-light",
  "cozy-cafe",
];

// Create Theme Context
const ThemeContext = createContext();

/**
 * Custom hook to use theme easily
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * ThemeProvider component wraps entire app to provide theme state and updates CSS vars.
 */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Load saved theme from localStorage or default
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("wulu-theme") ||
        "minimal-light"
      );
    }
    return "minimal-light";
  });

  useEffect(() => {
    if (!theme || !THEMES.includes(theme)) return;
    // Persist to localStorage
    localStorage.setItem("wulu-theme", theme);

    // Apply theme class on <html>
    if (typeof document !== "undefined") {
      THEMES.forEach((t) => {
        document.documentElement.classList.remove(t);
      });
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
