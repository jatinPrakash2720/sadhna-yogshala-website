import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";
import { razorpay } from "@/lib/api/razorpay";
import { z } from "zod";

const orderSchema = z.object({
  courseId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { courseId } = orderSchema.parse(body);

    // 1. Fetch Course Price
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { price: true, id: true },
    });

    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    // 2. Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id, // Ensure user ID is in session callback
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 400 });
    }

    // 3. Create Razorpay Order
    // Amount must be in PAISE (Multiply by 100)
    const order = await razorpay.orders.create({
      amount: course.price * 100, 
      currency: "INR",
      receipt: `receipt_${session.user.id.slice(0, 5)}_${Date.now()}`,
      notes: {
        courseId: course.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount });

  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}