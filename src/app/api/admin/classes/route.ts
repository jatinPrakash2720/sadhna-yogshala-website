import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/api/db";
import { authOptions } from "@/lib/api/auth"; 
import { createGoogleMeetClass } from "@/lib/api/googleCalendar";
import { redis } from "@/lib/api/redis"; // <--- 1. Import Redis

// Zod Validation Schema
const createClassSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  startTime: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Start time must be in the future",
  }),
});

export async function POST(req: Request) {
  try {
    // ---------------------------------------------------------
    // 1. Security Check: Admins Only
    // ---------------------------------------------------------
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized: Admins only" },
        { status: 401 }
      );
    }

    // ---------------------------------------------------------
    // 2. Parse & Validate Input
    // ---------------------------------------------------------
    const body = await req.json();
    const result = createClassSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { courseId, title, description, startTime } = result.data;
    const startDateTime = new Date(startTime);

    // ---------------------------------------------------------
    // 3. Google Calendar Integration
    // ---------------------------------------------------------
    const googleData = await createGoogleMeetClass(
      title,
      startDateTime,
      description
    );

    if (!googleData.meetUrl) {
      throw new Error("Google failed to return a Meet URL");
    }

    // ---------------------------------------------------------
    // 4. Save to Database
    // ---------------------------------------------------------
    const newClass = await prisma.class.create({
      data: {
        title,
        description,
        startTime: startDateTime,
        courseId,
        googleMeetUrl: googleData.meetUrl,
        googleEventId: googleData.eventId,
      },
    });

    // ---------------------------------------------------------
    // 5. Redis Cache Invalidation (The "Instant Update")
    // ---------------------------------------------------------
    // We wipe the schedule for THIS Course so the new class appears instantly.
    const cacheKey = `schedule:${courseId}`;
    await redis.del(cacheKey);
    console.log(`🧹 Cache cleared for: ${cacheKey}`);

    return NextResponse.json({
      success: true,
      class: newClass,
    });

  } catch (error: any) {
    console.error("❌ Create Class Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}