import { NextResponse } from "next/server";
import { prisma } from "@/lib/api/db";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.courseId },
      include: {
        classes: {
          orderBy: { startTime: "asc" },
          select: {
            id: true,
            title: true,
            startTime: true,
            duration: true,
            // HIDE googleMeetUrl here! Public users shouldn't see links.
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}