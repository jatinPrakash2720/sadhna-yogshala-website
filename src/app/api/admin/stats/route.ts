import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

export async function GET() {
  try {
    // 1. Security: Admins Only
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parallel Data Fetching (Faster than waiting one by one)
    const [enrollments, totalStudents, upcomingClasses] = await Promise.all([
      // A. Get all enrollments to calculate revenue
      prisma.enrollment.findMany({
        include: {
          course: { select: { price: true } },
        },
      }),

      // B. Count unique students
      prisma.user.count({
        where: {
          enrollments: { some: {} }, // Only users who have enrolled in at least 1 course
        },
      }),

      // C. Count upcoming classes
      prisma.class.count({
        where: {
          startTime: { gte: new Date() },
        },
      }),
    ]);

    // 3. Calculate Total Revenue
    // Note: This assumes current course price. For strict accounting, 
    // you should store 'amountPaid' in a separate Transaction table.
    const totalRevenue = enrollments.reduce<number>(
      (sum, enrollment) => sum + (enrollment.course?.price || 0),
      0
    );

    return NextResponse.json({
      revenue: totalRevenue,
      activeStudents: totalStudents,
      upcomingClasses: upcomingClasses,
    });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}