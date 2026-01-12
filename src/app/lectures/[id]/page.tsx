import { AppSidebar } from "@/components/app-sidebar"
import { VideoPlayer } from "@/components/video-player"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default async function LecturePage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Promise and direct params (Next.js 15 vs 14)
  const resolvedParams = params instanceof Promise ? await params : params
  const id = resolvedParams?.id

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
                <VideoPlayer lectureId={id} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}

