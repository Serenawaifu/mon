/**
 * Smoothly scrolls the viewport to a specific element by its ID.
 *
 * Design & UX:
 * - Uses native smooth scroll behavior for a gentle and elegant user experience.
 * - Focuses viewport alignment to the start of the element for clear navigation.
 * - Accessibility-friendly navigation aid.
 *
 * @param {string} id Element's ID to scroll to
 * @param {ScrollIntoViewOptions} [options] Optional scrollIntoView settings
 */
export function smoothScrollTo(
  id,
  options = { behavior: "smooth", block: "start", inline: "nearest" }
) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView(options);
  }
}

/**
 * Checks if a given element is fully visible within the vertical viewport.
 *
 * Design & UX:
 * - Enables lazy-loading, animations, or viewport-aware UI visible toggles.
 * - Uses simple bounding rectangle checks for performance.
 *
 * @param {HTMLElement|null} el Element to check visibility for
 * @returns {boolean} True if element is fully in vertical viewport
 */
export function isInViewport(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
