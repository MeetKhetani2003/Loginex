// src/app/api/order/webhook/route.js
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { sendInvoiceEmail } from "@/lib/emailService";

// Initialise Stripe **once** with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // keep up-to-date with Stripe
});

export async function POST(req) {
  try {
    await connectDB();

    const { sessionId } = await req.json();

    if (!sessionId) {
      return Response.json({ error: "Missing session_id" }, { status: 400 });
    }

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return Response.json({ success: false, message: "Not paid" });
    }

    const { planId, userId } = session.metadata;
    const amount = session.amount_total / 100;

    // Create Order
    const order = await Order.create({
      user: userId,
      vps: planId,
      payment: {
        transactionId: session.payment_intent,
        amount,
        status: "completed",
        paidAt: new Date(),
      },
      expiryTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    const planName = session.display_items?.[0]?.custom?.name || "VPS Plan";

    // Send Emails
    await sendInvoiceEmail({
      to: session.customer_email,
      order,
      planName,
      isInternal: false,
    });

    await sendInvoiceEmail({
      to: "team@loginex.ca",
      order,
      planName,
      isInternal: true,
    });

    return Response.json({ success: true, order });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
