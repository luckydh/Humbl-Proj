/**
 * StripeHandler.ts
 * @author Saumyadip Pramanik
 * @description Stripe Payment Handler
 */

import { loadStripe } from "@stripe/stripe-js";
import { captureException } from "ErrorLogger";

export async function confirmPaymentIntent(secret: string) {
  const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_TOKEN}`);
  const result = { status: false };

  if (stripe) {
    try {
      const { paymentIntent } = await stripe.confirmCardPayment(secret);
      result.status = paymentIntent?.status === "succeeded";
    } catch (error) {
      captureException(error);
    }
  }

  return result;
}

// Current implementation has no direct means of controlling 3d secure modal.
// This function only removes the stripe modal container if it exists.
// Unfortunately, this is quite brittle.
// TODO: remove this functionality and consider triggering 3d secure by other means.
export const destroyStripeModal = (callback?: () => void) => {
  const iframe = document.getElementsByTagName("iframe")[0];

  if (!iframe) {
    return;
  }

  const stripeContainer = iframe.parentElement;

  const isStripe = stripeContainer?.tagName.toLowerCase() !== "body" && iframe.getAttribute("name")?.includes("Stripe");

  if (!isStripe) {
    return;
  }

  stripeContainer?.remove();
  callback?.();
};
