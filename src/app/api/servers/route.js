import { connectDB } from "@/lib/db";
import ServerVps from "@/models/ServerModel";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const server = await ServerVps.create(body);
    return Response.json({ success: true, server }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to create server" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const servers = await ServerVps.find();
    return Response.json({ success: true, servers });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to fetch servers" },
      { status: 500 }
    );
  }
}
