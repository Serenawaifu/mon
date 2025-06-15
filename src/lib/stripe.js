import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

/**
 * Initiates a Stripe checkout session by redirecting the user.
 *
 * @param {string} sessionId - The ID of the Stripe checkout session.
 * @throws Will throw an error if Stripe.js fails to load or if there is an error during checkout.
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
