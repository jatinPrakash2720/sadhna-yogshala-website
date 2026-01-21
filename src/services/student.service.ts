import { apiClient } from "@/lib/apiConfig";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import { requestHandler } from "@/lib/requestHandler";
import { ScheduledClass } from "@/types/api/student.types";

export const studentService = {
  // Fetches the timeline of upcoming classes
  getMySchedule: () => 
    requestHandler<ScheduledClass[]>(() => apiClient.get(API_ENDPOINTS.STUDENT_SCHEDULE)),
};