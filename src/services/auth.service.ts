import { apiClient } from "@/lib/apiConfig";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import { requestHandler } from "@/lib/requestHandler";
import { User } from "@/types/api/auth.types";

export const authService = {
  getMe: () => requestHandler<User>(() => apiClient.get(API_ENDPOINTS.ME)),
  
  // Example: If you need to manually update profile
  updateProfile: (data: Partial<User>) => 
    requestHandler<User>(() => apiClient.patch(API_ENDPOINTS.UPDATE_PROFILE, data)),
  checkAdminStatus: () => 
    requestHandler<{ isAdmin: boolean }>(() => apiClient.get(API_ENDPOINTS.CHECK_ADMIN)),
};