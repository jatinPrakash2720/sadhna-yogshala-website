"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { IconThumbUp, IconThumbDown, IconShare, IconDownload } from "@tabler/icons-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Lecture {
  id: string
  title: string
  instructor: string
  thumbnail: string
  duration: string
  date: Date
  views: string
  description: string
  likes: string
  subscribers: string
}

// Mock data - in real app, fetch by ID
const getLectureById = (id: string | undefined): Lecture | null => {
  if (!id) return null

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
  ]

  const thumbnails = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1280&h=720&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1280&h=720&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1280&h=720&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1280&h=720&fit=crop",
    "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=1280&h=720&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop",
  ]

  const index = parseInt(id.replace("lecture-", "") || "0") - 1
  if (isNaN(index) || index < 0 || index >= 6) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(today)
  date.setDate(date.getDate() + index + 1)

  return {
    id,
    title: titles[index % titles.length],
    instructor: instructors[index % instructors.length],
    thumbnail: thumbnails[index % thumbnails.length],
    duration: "25:15",
    date,
    views: "1.2K",
    likes: "156",
    subscribers: "12.5K",
    description: `Join us for an immersive yoga session focusing on ${titles[index % titles.length].toLowerCase()}. 

In this comprehensive class, you'll learn:
• Fundamental techniques and proper alignment
• Breathing exercises to enhance your practice
• Modifications for different skill levels
• Mindfulness and meditation practices

This session is perfect for practitioners of all levels. Whether you're just starting your yoga journey or looking to deepen your practice, this class offers valuable insights and techniques.

Remember to practice at your own pace and listen to your body. Enjoy your practice! 🙏

#Yoga #Meditation #Wellness #Mindfulness`,
  }
}

function formatDate(date: Date): string {
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffTime / (1000 * 60))

  if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`
  } else if (diffMinutes > 0) {
    return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`
  }
  return "Just now"
}

export function VideoPlayer({ lectureId }: { lectureId: string }) {
  const lecture = useMemo(() => getLectureById(lectureId), [lectureId])

  if (!lecture) {
    return <div className="text-center py-12">Lecture not found</div>
  }

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
            <BreadcrumbLink asChild>
              <Link href="/lectures">Lectures</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">{lecture.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Video Section */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <Image
              src={lecture.thumbnail}
              alt={lecture.title}
              fill
              className="object-cover"
              priority
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary ml-1"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-xl font-serif font-bold text-primary">
              {lecture.title}
            </h1>

            {/* Stats and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{lecture.views} views</span>
                <span>•</span>
                <span>{formatDate(lecture.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <IconThumbUp className="size-4" />
                  <span>{lecture.likes}</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <IconThumbDown className="size-4" />
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <IconShare className="size-4" />
                  <span>Share</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <IconDownload className="size-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <Avatar className="size-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {lecture.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{lecture.instructor}</h3>
                  <Badge variant="outline" className="text-xs">
                    {lecture.subscribers} subscribers
                  </Badge>
                </div>
                <Button variant="default" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-accent/30 rounded-lg p-4">
              <div className="text-sm text-foreground whitespace-pre-line">
                {lecture.description}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Videos Sidebar */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="sticky top-4">
            <h2 className="text-lg font-serif font-semibold text-primary mb-4">
              Upcoming Lectures
            </h2>
            <RecommendedVideos currentId={lectureId} />
          </div>
        </div>
      </div>
    </div>
  )
}

function RecommendedVideos({ currentId }: { currentId: string }) {
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
  ]

  const thumbnails = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
  ]

  const durations = ["12:30", "18:45", "25:15", "30:00", "15:20", "22:10"]
  const views = ["1.2K", "3.5K", "856", "2.1K", "5.4K", "1.8K"]

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const videos = Array.from({ length: 8 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() + i + 1)
    return {
      id: `lecture-${i + 1}`,
      title: titles[i % titles.length],
      instructor: instructors[i % instructors.length],
      thumbnail: thumbnails[i % thumbnails.length],
      duration: durations[i % durations.length],
      date,
      views: views[i % views.length],
    }
  }).filter((v) => v.id !== currentId)

  return (
    <div className="space-y-3">
      {videos.slice(0, 6).map((video) => (
        <Link
          key={video.id}
          href={`/lectures/${video.id}`}
          className="flex gap-3 group hover:bg-accent/30 rounded-lg p-2 transition-colors"
        >
          <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="160px"
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 mb-1 text-foreground group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-1">{video.instructor}</p>
            <div className="text-xs text-muted-foreground">
              {video.views} views • {formatDate(video.date)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

