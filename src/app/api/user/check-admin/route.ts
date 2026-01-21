import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { isAuthenticated: false, isAdmin: false },
      { status: 200 } // Return 200 so the frontend can handle the logic
    );
  }

  return NextResponse.json(
    { 
      isAuthenticated: true, 
      isAdmin: session.user.isAdmin // This comes from our custom session callback
    },
    { status: 200 }
  );
}