import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";
import { z } from "zod";
import { CourseType } from "@/generated/prisma";

// Zod Schema
const createCourseSchema = z.object({
  title: z.string().min(3, "Title too short"),
  description: z.string().optional(),
  price: z.number().min(0, "Price cannot be negative"),
  type: z.nativeEnum(CourseType).default(CourseType.COURSE),
  thumbnail: z.string().url().optional().or(z.literal("")), // Valid URL or empty string
});

export async function POST(req: Request) {
  try {
    // 1. Admin Check
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Admins only" }, { status: 401 });
    }

    // 2. Validate
    const body = await req.json();
    const result = createCourseSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    // 3. Create
    const newCourse = await prisma.course.create({
      data: result.data,
    });

    return NextResponse.json(newCourse);

  } catch (error) {
    console.error("Create Course Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}