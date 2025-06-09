import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

/**
 * Initiate Stripe checkout session by redirecting user.
 * @param {string} sessionId
 */
export async function redirectToCheckout(sessionId) {
  const stripe = await stripePromise;
  if (!stripe) throw new Error("Stripe.js failed to load");

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    console.error("Stripe Checkout error:", error);
    throw error;
  }
}

export default stripePromise;
