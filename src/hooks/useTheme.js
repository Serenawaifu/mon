import { useContext } from "react";
import { ThemeContext } from "../components/Theme/ThemeProvider";

/**
 * useTheme - a custom React hook to access and manipulate the current UI theme.
 *
 * This hook provides clean, elegant access to theme state following the Minimal, Elegant
 * Component Library UI principles:
 * - Light background with breathing room
 * - Clear visual separation and modern interactivity
 * - Accessibility and semantic code usage
 *
 * Usage:
 * const { theme, setTheme, THEMES } = useTheme();
 *
 * @throws Will throw an error if used outside a ThemeProvider.
 *
 * @returns {object} theme context with:
 *   - theme: current selected theme ID
 *   - setTheme: function to update the theme
 *   - THEMES: available theme IDs
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
