import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { user, vps, amount, transactionId } = body;

    const order = await Order.create({
      user,
      vps,
      payment: {
        amount,
        transactionId,
        status: "completed",
        paidAt: new Date(),
      },
      expiryTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return Response.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().populate("user vps");
    return Response.json({ success: true, orders });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
