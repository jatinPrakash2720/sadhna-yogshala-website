"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Lecture {
  id: string
  title: string
  instructor: string
  thumbnail: string
  duration: string
  date: Date
  views: string
}

// Generate random lecture data ordered by date (tomorrow first)
const generateLectures = (): Lecture[] => {
  const instructors = [
    "Priya Sharma",
    "Rajesh Kumar",
    "Anjali Patel",
    "Vikram Singh",
    "Meera Desai",
    "Arjun Mehta",
  ]

  const titles = [
    "Introduction to Hatha Yoga Fundamentals",
    "Advanced Pranayama Breathing Techniques",
    "Yoga for Stress Relief and Mental Clarity",
    "Power Flow: Building Core Strength",
    "Restorative Yoga for Deep Relaxation",
    "Meditation and Mindfulness Practice",
    "Yin Yoga: Deep Stretching and Flexibility",
    "Vinyasa Flow: Dynamic Movement Sequences",
    "Yoga Philosophy: Understanding the Eight Limbs",
    "Therapeutic Yoga for Back Pain Relief",
    "Morning Energizing Yoga Routine",
    "Evening Wind-Down Yoga Session",
  ]

  const thumbnails = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
  ]

  const durations = ["12:30", "18:45", "25:15", "30:00", "15:20", "22:10", "28:35", "20:00"]
  const views = ["1.2K", "3.5K", "856", "2.1K", "5.4K", "1.8K", "4.2K", "987"]

  const lectures: Lecture[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Generate 6 lectures starting from tomorrow
  for (let i = 0; i < 6; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i + 1) // Start from tomorrow (i+1)

    lectures.push({
      id: `lecture-${i + 1}`,
      title: titles[i % titles.length],
      instructor: instructors[i % instructors.length],
      thumbnail: thumbnails[i % thumbnails.length],
      duration: durations[i % durations.length],
      date: date,
      views: views[i % views.length],
    })
  }

  return lectures.sort((a, b) => a.date.getTime() - b.date.getTime())
}

function formatDate(date: Date): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date(today)
  dayAfter.setDate(dayAfter.getDate() + 2)

  const lectureDate = new Date(date)
  lectureDate.setHours(0, 0, 0, 0)

  if (lectureDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow"
  } else if (lectureDate.getTime() === dayAfter.getTime()) {
    return "Day After Tomorrow"
  } else {
    const diffTime = lectureDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return `In ${diffDays} days`
  }
}

export function LecturesGrid() {
  const lectures = useMemo(() => generateLectures(), [])

  return (
    <div className="w-full">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lectures</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-primary mb-2">Video Lectures</h1>
        <p className="text-muted-foreground">Upcoming yoga classes and recorded sessions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lectures.map((lecture) => (
          <Link
            key={lecture.id}
            href={`/lectures/${lecture.id}`}
            className="group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:shadow-lg transition-shadow block"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-muted">
              <Image
                src={lecture.thumbnail}
                alt={lecture.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {lecture.duration}
              </div>
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary ml-0.5"
                  >
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-base line-clamp-2 mb-2 text-foreground group-hover:text-primary transition-colors">
                {lecture.title}
              </h3>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{lecture.instructor}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{lecture.views} views</span>
                  <span>•</span>
                  <span>{formatDate(lecture.date)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

