"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface DataContextType {
  courses: any[];
  myEnrollments: any[];
  refreshData: () => Promise<void>; // Call this after purchase
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<any[]>([]);
  const [myEnrollments, setMyEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper: Update State & LocalStorage
  const updateCourses = (data: any[]) => {
    setCourses(data);
    if (typeof window !== "undefined") localStorage.setItem("cache_courses", JSON.stringify(data));
  };

  const updateEnrollments = (data: any[]) => {
    setMyEnrollments(data);
    if (typeof window !== "undefined") localStorage.setItem("cache_enrollments", JSON.stringify(data));
  };

  // Main Fetch Logic
  const fetchData = async () => {
    try {
      // 1. Fetch Public Courses (Always)
      const coursesRes = await fetch("/api/courses");
      if (coursesRes.ok) {
        updateCourses(await coursesRes.json());
      }

      // 2. Fetch Enrollments (Only if logged in)
      if (session?.user?.email) {
        const enrollRes = await fetch("/api/student/enrollments");
        if (enrollRes.ok) {
          updateEnrollments(await enrollRes.json());
        }
      }
    } catch (error) {
      console.error("Background data fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // On Mount: Load from Cache First (Instant), Then Sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedCourses = localStorage.getItem("cache_courses");
      const cachedEnrollments = localStorage.getItem("cache_enrollments");

      if (cachedCourses) setCourses(JSON.parse(cachedCourses));
      if (cachedEnrollments) setMyEnrollments(JSON.parse(cachedEnrollments));
    }
    
    // Always trigger background refresh
    fetchData();
  }, [session]); // Re-fetch when user logs in/out

  return (
    <DataContext.Provider value={{ courses, myEnrollments, refreshData: fetchData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};



