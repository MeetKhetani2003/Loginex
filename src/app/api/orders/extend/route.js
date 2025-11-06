import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, amount, transactionId } = body;

    const order = await Order.findById(orderId);
    if (!order)
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );

    // Extend 30 days
    const newExpiry = new Date(
      order.expiryTime.getTime() + 30 * 24 * 60 * 60 * 1000
    );
    order.expiryTime = newExpiry;

    order.extensions.push({
      extendedOn: new Date(),
      newExpiry,
      amountPaid: amount,
      transactionId,
    });

    await order.save();

    return Response.json({
      success: true,
      message: "VPS extended successfully",
      order,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to extend VPS" },
      { status: 500 }
    );
  }
}
