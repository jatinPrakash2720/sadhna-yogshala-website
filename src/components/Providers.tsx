"use client";
import { LoginModalProvider } from "@/contexts/LoginModalContext";
import LoginModal from "@/components/LoginModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoginModalProvider>
      {children}
      <LoginModal />
    </LoginModalProvider>
  );
}

