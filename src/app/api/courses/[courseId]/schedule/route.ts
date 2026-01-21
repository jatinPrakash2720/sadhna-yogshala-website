import { NextResponse } from "next/server";
import { prisma } from "@/lib/api/db";
import { redis } from "@/lib/api/redis"; // <--- Import Redis

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const CACHE_KEY = `schedule:${courseId}`; // Unique key for this course

  try {
    // 1. CHECK REDIS FIRST (The Fast Lane)
    const cachedData = await redis.get(CACHE_KEY);
    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // 2. IF REDIS IS EMPTY, CHECK DB (The Slow Lane)
    const classes = await prisma.class.findMany({
      where: {
        courseId: courseId,
        startTime: { gte: new Date() },
      },
      orderBy: { startTime: "asc" },
      take: 5,
      select: {
        id: true,
        title: true,
        description: true,
        startTime: true,
        duration: true,
      },
    });

    // 3. SAVE TO REDIS (So the next person is fast)
    // 'EX', 3600 means "Expire in 1 hour" (Backup safety)
    if (classes.length > 0) {
        await redis.set(CACHE_KEY, JSON.stringify(classes), "EX", 3600);
    }

    return NextResponse.json(classes);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}