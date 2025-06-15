/**
 * Formats a given date or timestamp into a localized, human-readable date string.
 *
 * Design & UX:
 * - Default format: "MMM DD, YYYY" e.g. "Apr 27, 2024"
 * - Uses Intl API with fallback for robustness.
 * - Enhances clarity and consistency across the UI.
 *
 * @param {Date | string | number} input Date object, ISO string, or timestamp
 * @param {Intl.DateTimeFormatOptions} [options] Optional custom formatting options
 * @returns {string} Formatted date string or empty string if invalid
 */
export function formatDate(input, options = {}) {
  try {
    const date = input instanceof Date ? input : new Date(input);
    if (isNaN(date)) return "";
    const defaultOptions = { year: "numeric", month: "short", day: "numeric" };
    const formatter = new Intl.DateTimeFormat(undefined, { ...defaultOptions, ...options });
    return formatter.format(date);
  } catch {
    return "";
  }
}

/**
 * Truncates a string to a specified maximum length and appends an ellipsis if truncated.
 *
 * Design & UX:
 * - Prevents overflow and improves readability in UI cards or previews.
 * - Preserves whole words where possible (cutoff is hard).
 *
 * @param {string} text The input text to truncate
 * @param {number} [maxLength=100] Maximum length before truncation
 * @returns {string} Truncated text with ellipsis or original if short enough
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
