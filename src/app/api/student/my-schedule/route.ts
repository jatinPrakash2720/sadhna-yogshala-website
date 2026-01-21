import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Find all courses the student has enrolled in
    const enrollments = await prisma.enrollment.findMany({
      where: {
        user: { email: session.user.email },
      },
      select: { courseId: true },
    });

    const courseIds = enrollments.map((e: typeof enrollments[number]) => e.courseId);

    // 2. Find upcoming classes for ONLY those courses
    const classes = await prisma.class.findMany({
      where: {
        courseId: { in: courseIds }, // Filter by purchased courses
        startTime: {
          gte: new Date(), // Only future classes
        },
      },
      orderBy: { startTime: "asc" },
      include: {
        course: {
          select: { title: true }, // Include course name (e.g., "Yoga for Beginners")
        },
      },
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error("My Schedule Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch your schedule" },
      { status: 500 }
    );
  }
}