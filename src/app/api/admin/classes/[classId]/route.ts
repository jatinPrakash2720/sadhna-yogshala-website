import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

export async function DELETE(
  req: Request,
  { params }: { params: { classId: string } }
) {
  try {
    // 1. Admin Check
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Delete from Database
    // Note: We are strictly deleting from DB here. 
    // If you want to delete from Google Calendar too, you'd need the googleEventId 
    // and a separate API call, but just removing it from the app is usually enough.
    await prisma.class.delete({
      where: { id: params.classId },
    });

    return NextResponse.json({ success: true, message: "Class cancelled" });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete class" },
      { status: 500 }
    );
  }
}