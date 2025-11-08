import { connectDB } from "@/lib/db";
import sendNotificationEmail from "@/lib/emailService";
import Inquiry, {  InquirySchema } from "@/models/Inquiry";
import { NextResponse } from "next/server";
const routingMap = {
  general: "team@loginex.ca",
  sales: "team@loginex.ca",
  minecraft: "mvmiconic@gmail.com",
  webdev: "codevibe2003@gmail.com",
  vps: "team@loginex.ca",
};

/**
 * Next.js Route Handler for POST requests.
 * @param {Request} request - The incoming standard Request object.
 */
export async function POST(request) {
    try {
        // Connect to DB first
        await connectDB();
        // const Inquiry = getInquiryModel();

        // Parse JSON body from the standard Request object
        const body = await request.json();
        const { type, name, contactEmail, mobile, description, subject } = body;

        // 1. Determine Routing Email
        const routingEmail = routingMap[type];
        if (!routingEmail) {
            return NextResponse.json({ success: false, message: 'Invalid inquiry type provided.' }, { status: 400 });
        }
        
        // 2. Prepare and Save Data to MongoDB
        const inquiryData = {
            name,
            contactEmail,
            mobile,
            description: subject ? `${subject}: ${description}` : description,
            type,
            routingEmail,
        };

        const newInquiry = await Inquiry.create(inquiryData);

        // 3. Trigger Email Notification (Non-blocking)
        // We use .then/.catch here to ensure the API response isn't delayed by email latency.
        sendNotificationEmail(routingEmail, newInquiry)
            .catch(err => console.error("Async Email Error:", err)); 

        // 4. Respond to Client using NextResponse
        return NextResponse.json({
            success: true,
            message: `Inquiry submitted successfully for type: ${type}.`,
            data: { id: newInquiry._id, type: newInquiry.type },
        }, { status: 201 });

    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return NextResponse.json({ success: false, message: messages.join(', ') }, { status: 400 });
        }
        
        console.error('Route Handler Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
    }
}