import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ServerVps } from "@/models/ServerModel";

// --- GET: Retrieves all VPS plans (with optional filtering) ---
/**
 * @route GET /api/plans
 * @description Retrieves all VPS plans, with optional filtering.
 * @access Public
 */
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    let query = {};

    // Example: filter by 'featured' query parameter
    if (searchParams.get("featured") === "true") {
      query.isFeatured = true;
    }

    // Sort by price ascending
    const plans = await ServerVps.find(query).sort({ pricePerMonth: 1 });

    return NextResponse.json(
      {
        success: true,
        count: plans.length,
        data: plans,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve VPS plans.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- POST: Creates a new VPS plan ---
/**
 * @route POST /api/plans
 * @description Creates a new VPS plan.
 * @access Private (Admin)
 */
export async function POST(request) {
  try {
    await connectDB();

    const planData = await request.json();

    const newPlan = new ServerVps(planData);
    const savedPlan = await newPlan.save();

    // 201 Created Status
    return NextResponse.json(
      {
        success: true,
        data: savedPlan,
        message: "New VPS plan created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating plan:", error);
    if (error.code === 11000) {
      // Handle duplicate key error (name or slug)
      return NextResponse.json(
        {
          success: false,
          message: "A plan with this name or slug already exists.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create VPS plan.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
