import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all users who have bought at least one course
    const students = await prisma.user.findMany({
      where: {
        enrollments: { some: {} },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true, // Critical for WhatsApp
        createdAt: true, // Joined Date
        _count: {
          select: { enrollments: true }, // How many courses they bought
        },
        enrollments: {
          select: {
            course: {
              select: { title: true }, // List of course names
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Format the data to be cleaner for the frontend
    const formattedStudents = students.map((student) => ({
      id: student.id,
      name: student.name || "No Name",
      email: student.email,
      phone: student.phone || "N/A",
      coursesBought: student._count.enrollments,
      courseNames: student.enrollments.map((e) => e.course.title).join(", "),
      joinedAt: student.createdAt,
    }));

    return NextResponse.json(formattedStudents);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}