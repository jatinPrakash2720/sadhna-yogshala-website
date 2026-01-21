import { apiClient } from "@/lib/apiConfig";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import { requestHandler } from "@/lib/requestHandler";
import { Course, Enrollment } from "@/types/api/course.types";
import { ScheduledClass } from "@/types/api/student.types";

export const courseService = {
  // Public List
  getAllCourses: () => 
    requestHandler<Course[]>(() => apiClient.get(API_ENDPOINTS.COURSES)),
  
  // Student Enrollments
  getMyEnrollments: () => 
    requestHandler<Enrollment[]>(() => apiClient.get(API_ENDPOINTS.STUDENT_ENROLLMENTS)),

  // ✅ Added: Single Course Details (Public)
  getCourseDetails: (id: string) => 
    requestHandler<Course>(() => apiClient.get(API_ENDPOINTS.COURSE_DETAILS(id))),

  // ✅ Added: Course Schedule Preview (Public)
  getCourseSchedule: (id: string) => 
    requestHandler<ScheduledClass[]>(() => apiClient.get(API_ENDPOINTS.COURSE_SCHEDULE(id))),
};