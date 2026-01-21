import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        user: { email: session.user.email },
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            description: true,
          },
        },
      },
      // Note: If you renamed this field to 'joinedAt' in your schema, change 'createdAt' to 'joinedAt' here.
      orderBy: { joinedAt: "desc" }, 
    });

    return NextResponse.json(enrollments);
    
  } catch (error) {
    console.error("Fetch Enrollments Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" }, 
      { status: 500 }
    );
  }
}