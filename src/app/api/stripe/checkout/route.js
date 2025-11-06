// src/app/api/stripe/checkout/route.js
import { connectDB } from "@/lib/db";
import Stripe from "stripe";

// Initialise Stripe **once** with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // keep up-to-date with Stripe
});

export async function POST(req) {
  try {
    await connectDB();

    const { planId, planName, price, userEmail, userId } = await req.json();

    // ---- validation (optional but recommended) ----
    if (!planId || !planName || !price || !userEmail || !userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${planName} VPS` },
            unit_amount: Math.round(price * 100), // cents
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      metadata: { planId, userId },
      success_url: `${process.env.NEXT_PUBLIC_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/vps`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
