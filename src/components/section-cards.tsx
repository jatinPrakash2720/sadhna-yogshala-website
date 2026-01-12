"use client"

import { IconTrendingDown, IconTrendingUp, IconCopy, IconExternalLink } from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card @xl/main:col-span-2 flex flex-col h-full">
        <CardHeader className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary"
              />
              <path
                d="M8 8h8M8 12h6M8 16h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-primary"
              />
              <circle
                cx="17"
                cy="7"
                r="2"
                fill="currentColor"
                className="text-primary"
              />
            </svg>
            <CardDescription className="mb-0">Upcoming Class</CardDescription>
          </div>
          <CardTitle className="text-2xl font-semibold mb-2">
            Morning Yoga - Level 2
          </CardTitle>
          <div className="text-base text-muted-foreground mb-4">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </CardHeader>
        <CardFooter className="w-full pt-4 border-t border-border/50 flex-col gap-3">
          <div className="w-full flex items-center gap-2">
            <Input
              type="text"
              value="https://zoom.us/j/1234567890"
              readOnly
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="flex-1 cursor-text"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText("https://zoom.us/j/1234567890");
              }}
              title="Copy link"
            >
              <IconCopy className="size-4" />
            </Button>
          </div>
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.open("https://zoom.us/j/1234567890", "_blank")}
          >
            <IconExternalLink className="size-4" />
            Join Zoom Meeting
          </Button>
        </CardFooter>
      </Card>
      <Card className="@container/card flex flex-col h-full">
        <CardHeader className="flex-1">
          <CardDescription className="mb-2">Join Workshops</CardDescription>
          <CardTitle className="text-2xl font-semibold mb-4">
            Advanced Meditation Workshop
          </CardTitle>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Price:</span>
              <span className="text-2xl font-bold text-primary">$99</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Date:</span>
              <span className="text-base font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="w-full pt-4 border-t border-border/50">
          <Button
            variant="default"
            className="w-full"
          >
            Join Workshop
          </Button>
        </CardFooter>
      </Card>
      <Card className="@container/card flex flex-col h-full">
        <CardHeader className="flex-1">
          <div className="flex items-center gap-6 w-full h-full">
            <Avatar className="size-20 shrink-0">
              <AvatarImage src="/avatars/user.jpg" alt="Profile" />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardDescription className="mb-1">User Profile</CardDescription>
              <CardTitle className="text-2xl font-semibold mb-2">
                John Doe
              </CardTitle>
              <div className="text-base text-muted-foreground">
                john.doe@example.com
              </div>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="w-full pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 w-full">
            <span className="text-sm font-medium text-muted-foreground">Enrolled Batch:</span>
            <Badge variant="outline" className="font-medium text-sm px-3 py-1">
              Morning Yoga - Level 2
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
