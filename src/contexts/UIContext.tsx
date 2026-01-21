"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toast: { message: string; type: "success" | "error" | null };
  showToast: (message: string, type: "success" | "error") => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });

  // Sidebar Actions
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Login Modal Actions
  const openLoginModal = () => {
    console.log("UIContext: openLoginModal called");
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    console.log("UIContext: closeLoginModal called");
    setIsLoginModalOpen(false);
  };

  // Toast Actions (Auto-hide after 3 seconds)
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: null });
    }, 3000);
  };

  return (
    <UIContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar, toast, showToast, isLoginModalOpen, openLoginModal, closeLoginModal }}>
      {children}
      {/* DEBUG: Show modal state */}
      <div className="fixed top-0 left-0 bg-red-500 text-white p-2 z-[9999] text-xs">
        Modal Open: {isLoginModalOpen ? "TRUE" : "FALSE"}
      </div>
      {/* Global Toast Component */}
      {toast.type && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 z-50 ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast.message}
        </div>
      )}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};