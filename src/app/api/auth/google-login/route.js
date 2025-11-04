import { NextResponse } from "next/server";
import User from "@/models/User";
import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  await connectDB();

  const { credential } = await req.json();
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const user = await User.findOrCreateGoogleUser(payload);

  const token = user.generateAuthToken();

  const res = NextResponse.json({
    success: true,
    user,
    token, 
  });

  res.cookies.set("authToken", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60, 
  });

  return res;
}
