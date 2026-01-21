import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";
import { z } from "zod";
import { CourseType } from "@/generated/prisma";

// Update Schema (All fields optional)
const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  type: z.nativeEnum(CourseType).optional(),
  thumbnail: z.string().url().optional().or(z.literal("")),
});

// --- PATCH: Update Course ---
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const result = updateCourseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: params.courseId },
      data: result.data,
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// --- DELETE: Remove Course ---
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Warning: This will cascade delete classes due to schema relations
    await prisma.course.delete({
      where: { id: params.courseId },
    });

    return NextResponse.json({ success: true, message: "Course deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}