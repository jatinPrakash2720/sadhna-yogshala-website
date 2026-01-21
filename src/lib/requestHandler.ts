import { AxiosResponse, AxiosError } from "axios";
import { ApiResponse } from "@/types/api/common"; // Import the single strict type

/**
 * A generic wrapper for API calls.
 * It unwraps the standardized response or throws a clean error message.
 */
export const requestHandler = async <T>(
  apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<T> => {
  try {
    const response = await apiCall();

    // 1. Logic Check: Ensure the backend actually said "success: true"
    // Even if status is 200, the logical operation might have failed
    if (!response.data.success) {
      throw new Error(response.data.message || "Operation failed");
    }

    // 2. Return the actual data payload
    return response.data.data;

  } catch (error: unknown) {
    // Cast error to match our standardized backend error structure
    // We use ApiResponse<null> because failed requests usually don't have data
    const axiosError = error as AxiosError<ApiResponse<null>>;
    
    // A. Backend threw a standard ApiError (e.g., 400, 401, 500)
    if (axiosError.response?.data) {
      const { message, errors } = axiosError.response.data;
      
      // If we have an array of specific errors (like form validation), show them
      if (errors && errors.length > 0) {
        // e.g., "Validation Failed: Invalid Email, Password too short"
        throw new Error(`${message}: ${errors.join(", ")}`); 
      }
      
      // Otherwise just throw the main message
      throw new Error(message || "Something went wrong");
    }

    // B. Network/System Error (Backend didn't send a response at all)
    throw new Error(axiosError.message || "Network Error");
  }
};