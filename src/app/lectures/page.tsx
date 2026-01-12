import { AppSidebar } from "@/components/app-sidebar"
import { LecturesGrid } from "@/components/lectures-grid"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function LecturesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <div className="flex flex-1 flex-col bg-white">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <LecturesGrid />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}

