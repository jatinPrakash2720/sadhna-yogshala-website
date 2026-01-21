import { apiClient } from "@/lib/apiConfig";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import { requestHandler } from "@/lib/requestHandler";
import { DashboardStats, Student } from "@/types/api/admin.types";
import { Course } from "@/types/api/course.types";

// ✅ 1. Export these interfaces so adminSlice.ts can use them
export interface CreateCoursePayload {
  title: string;
  description: string;
  price: number;
  type: "COURSE" | "WORKSHOP";
  thumbnail?: string;
}

export interface CreateClassPayload {
  courseId: string;
  title: string;
  description?: string;
  startTime: string; // ISO String
}

// ✅ 2. Define Transaction Interface locally or import if you have it in types
interface Transaction {
  id: string;
  user: string;
  course: string;
  amount: number;
  date: string;
}

export const adminService = {
  // --- READ ---
  getStats: () => 
    requestHandler<DashboardStats>(() => apiClient.get(API_ENDPOINTS.ADMIN_STATS)),
    
  getStudents: () => 
    requestHandler<Student[]>(() => apiClient.get(API_ENDPOINTS.ADMIN_STUDENTS)),

  // ✅ Added missing method
  getTransactions: () => 
    requestHandler<Transaction[]>(() => apiClient.get(API_ENDPOINTS.ADMIN_TRANSACTIONS)),

  getAdminCourses: () => 
    requestHandler<Course[]>(() => apiClient.get(API_ENDPOINTS.ADMIN_COURSES)),
  
  // --- COURSES (Write) ---
  createCourse: (data: CreateCoursePayload) => 
    requestHandler<Course>(() => apiClient.post(API_ENDPOINTS.ADMIN_COURSES, data)),

  updateCourse: (id: string, data: Partial<CreateCoursePayload>) =>
    requestHandler<Course>(() => apiClient.patch(API_ENDPOINTS.ADMIN_COURSE_DETAILS(id), data)),

  deleteCourse: (id: string) => 
    requestHandler<{ success: boolean }>(() => apiClient.delete(API_ENDPOINTS.ADMIN_COURSE_DETAILS(id))),

  // --- CLASSES (Write) ---
  createClass: (data: CreateClassPayload) => 
    requestHandler<{ success: boolean }>(() => apiClient.post(API_ENDPOINTS.ADMIN_CLASSES, data)),

  deleteClass: (id: string) => 
    requestHandler<{ success: boolean }>(() => apiClient.delete(API_ENDPOINTS.ADMIN_CLASS_DETAILS(id))),
};