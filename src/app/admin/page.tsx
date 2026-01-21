"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUI } from "@/contexts/UIContext";
import data from "../dashboard/data.json";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const { openLoginModal } = useUI();
  const router = useRouter();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAndSetupAdmin() {
      console.log("Admin page - Auth status:", status);
      // If not authenticated, don't automatically open modal
      if (status === "unauthenticated") {
        setIsCheckingAdmin(false);
        return;
      }

      // If still loading, wait
      if (status === "loading") {
        return;
      }

      // User is authenticated, check if they're admin
      if (session?.user) {
        // Check if user is already admin
        if (session.user.isAdmin) {
          setIsAdmin(true);
          setIsCheckingAdmin(false);
          return;
        }

        // Try to make them admin (this will work if it's their first login from /admin)
        try {
          const response = await fetch("/api/auth/make-admin", {
            method: "POST",
          });

          if (response.ok) {
            // Successfully became admin, refresh session
            window.location.reload();
          } else {
            // Not eligible for admin access
            setIsAdmin(false);
            setIsCheckingAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setIsCheckingAdmin(false);
        }
      }
    }

    checkAndSetupAdmin();
  }, [session, status, openLoginModal]);

  // Show loading state while checking authentication
  if (status === "loading" || isCheckingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-6">
          <h1 className="text-3xl font-serif font-bold mb-4 text-gray-900">
            Admin Access Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in with Google to access the admin dashboard.
          </p>
          <button
            onClick={() => {
              console.log("Sign In button clicked - calling signIn directly");
              signIn("google", { callbackUrl: "/admin" });
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  // Show access denied if authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-6">
          <h1 className="text-3xl font-serif font-bold mb-4 text-red-600">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin dashboard.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Render admin dashboard
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
                <SectionCards />
                <div className="w-full">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
