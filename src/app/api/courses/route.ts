import { NextResponse } from "next/server";
import { prisma } from "@/lib/api/db";
import { CourseType } from "@/generated/prisma";

export const revalidate = 3600; // Cache for 1 hour (Production Grade)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // e.g., "WORKSHOP" or "COURSE"

    // Validate type filter if present
    const typeFilter = type && Object.values(CourseType).includes(type as CourseType)
      ? { type: type as CourseType }
      : undefined;

    const courses = await prisma.course.findMany({
      where: typeFilter,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        thumbnail: true,
        type: true,
        // Don't fetch classes here to keep it light
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}