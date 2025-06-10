// src/utils/rating.js

/**
 * Converts a numeric score (0–100) into a star rating scale (0–5), rounded to the nearest half star.
 *
 * Design & UX:
 * - Supports half-star granularity for accurate, subtle ratings.
 * - Produces consistent results for rendering rating components.
 *
 * @param {number} score Numeric score from 0 to 100
 * @returns {number} Star rating from 0 to 5 (e.g., 4.5)
 */
export function scoreToStars(score) {
  if (typeof score !== "number" || score <= 0) return 0;
  if (score > 100) score = 100;
  return Math.round((score / 100) * 10) / 2;
}

/**
 * Returns an array representing the star icons state ('full', 'half', or 'empty') for a given star rating.
 *
 * Design & UX:
 * - Provides easy mapping for UI components to render respective star icons.
 * - Aligns with minimal, elegant style by simplifying star rendering logic.
 *
 * @param {number} stars Star rating from 0 to 5 max (supports halves)
 * @returns {Array<'full' | 'half' | 'empty'>} Array length 5 describing star states
 */
export function getStarIcons(stars) {
  const icons = [];
  for (let i = 1; i <= 5; i++) {
    if (stars >= i) {
      icons.push("full");
    } else if (stars + 0.5 >= i) {
      icons.push("half");
    } else {
      icons.push("empty");
    }
  }
  return icons;
}
