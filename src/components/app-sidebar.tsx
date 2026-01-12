"use client"

import * as React from "react"
import {
  IconDashboard,
  IconSchool,
} from "@tabler/icons-react"

import Logo from "@/components/Logo"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Lectures",
      url: "/lectures",
      icon: IconSchool,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2.5 data-[slot=sidebar-menu-button]:!h-auto hover:!bg-transparent focus:!bg-transparent"
            >
              <a href="/" className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0">
                  <Logo size={40} variant="green" className="drop-shadow-sm" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base font-serif font-bold leading-none text-primary">
                    Sadhana Yogshala
                  </span>
                  <span className="text-xs uppercase tracking-wider text-secondary">
                    Yoga Studio
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
