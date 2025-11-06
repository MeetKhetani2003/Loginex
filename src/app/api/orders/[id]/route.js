import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const order = await Order.findById(params.id).populate("user vps");
    if (!order)
      return Response.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    return Response.json({ success: true, order });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching order" },
      { status: 500 }
    );
  }
}
