import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LoadingWrapper from "@/components/LoadingWrapper";
import AuthContext from "@/contexts/AuthContext";
import { UIProvider } from "@/contexts/UIContext";
import ReduxProvider from "@/providers/ReduxProvider"; // <--- Import the new provider
import LoginModal from "@/components/LoginModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sadhana Yogshala",
  description: "Modern Yoga & Fitness Studio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {/* 1. AuthContext (NextAuth Session) must be at the top */}
        <AuthContext>
          {/* 2. ReduxProvider (State & Data) replaces DataProvider */}
          <ReduxProvider>
            {/* 3. UIProvider (Sidebar/Toasts) */}
            <UIProvider>
              <LoadingWrapper>{children}</LoadingWrapper>
              <LoginModal />
            </UIProvider>
          </ReduxProvider>
        </AuthContext>
      </body>
    </html>
  );
}