"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoading, setShowLoading] = useState(true);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Always show loading screen on initial mount (first load/refresh/search)
    if (isInitialMount) {
      setIsInitialMount(false);
      setShowLoading(true);
      return;
    }

    // Show loading screen on every page change
    setShowLoading(true);
  }, [pathname, isInitialMount]);

  return (
    <>
      {showLoading && (
        <LoadingScreen
          key={pathname}
          onComplete={() => setShowLoading(false)}
        />
      )}
      {children}
    </>
  );
}
