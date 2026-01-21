import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

/**
 * POST /api/auth/make-admin
 * 
 * Makes the current authenticated user an admin if they don't already have
 * the isAdmin flag set in the database. This is used for first-time login
 * from the /admin page.
 */
export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Check if user exists and get their current admin status
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, isAdmin: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // If user is already admin, return success
    if (user.isAdmin) {
      return NextResponse.json(
        { success: true, message: "User is already an admin" },
        { status: 200 }
      );
    }

    // Update user to be admin
    await prisma.user.update({
      where: { id: user.id },
      data: { isAdmin: true },
    });

    return NextResponse.json(
      { success: true, message: "User successfully granted admin access" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error making user admin:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
