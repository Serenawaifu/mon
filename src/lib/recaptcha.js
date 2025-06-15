const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || null; // Updated for Next.js

/**
 * Dynamically load the reCAPTCHA v3 script if not loaded yet.
 * @returns {Promise<void>}
 */
export function loadRecaptchaScript() {
  if (!RECAPTCHA_SITE_KEY) return Promise.reject("reCAPTCHA site key not set");
  if (typeof window === "undefined") return Promise.resolve();

  if (window.grecaptcha) return Promise.resolve();

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

/**
 * Get a reCAPTCHA v3 token for an action.
 * @param {string} action Name of the action (e.g. 'login')
 * @returns {Promise<string>} token
 */
export async function getRecaptchaToken(action = "login") {
  if (!RECAPTCHA_SITE_KEY) {
    throw new Error("reCAPTCHA site key not set");
  }
  await loadRecaptchaScript();
  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
