import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/api/db";
import { config } from "@/lib/config";

export async function POST(req: Request) {
  try {
    // 1. Get the raw body string (Required for verification)
    const bodyText = await req.text();
    
    // 2. Get the signature header
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // 3. Verify Signature (HMAC SHA256)
    const expectedSignature = crypto
      .createHmac("sha256", config.razorpayWebhookSecret)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 4. Process the Event
    const event = JSON.parse(bodyText);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const { courseId, userId } = payment.notes; // We attached these in Step 2

      // 5. Grant Access (Create Enrollment)
      // We use upsert to prevent duplicates if webhook fires twice
      await prisma.enrollment.upsert({
        where: {
          userId_courseId: { userId, courseId },
        },
        create: {
          userId,
          courseId,
        },
        update: {}, // Do nothing if exists
      });

      // Optional: Record Transaction in a separate table if you have one
      console.log(`✅ Payment Success: User ${userId} enrolled in ${courseId}`);
    }

    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}