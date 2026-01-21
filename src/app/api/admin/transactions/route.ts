import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { prisma } from "@/lib/api/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Admins only" }, { status: 401 });
  }

  // Fetch recent enrollments as a proxy for transactions
  const transactions = await prisma.enrollment.findMany({
    take: 50,
    orderBy: { joinedAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true },
      },
      course: {
        select: { title: true, price: true },
      },
    },
  });

  // Format for the dashboard
  const formatted = transactions.map((t: typeof transactions[number]) => ({
    id: t.id,
    user: t.user.name || t.user.email,
    course: t.course.title,
    amount: t.course.price,
    date: t.joinedAt,
  }));

  return NextResponse.json(formatted);
}