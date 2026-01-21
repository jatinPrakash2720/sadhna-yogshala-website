import { apiClient } from "@/lib/apiConfig";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import { requestHandler } from "@/lib/requestHandler";
import { OrderResponse } from "@/types/api/payment.types";

export const paymentService = {
  // 1. Call Backend to create Razorpay Order
  createOrder: (courseId: string) => 
    requestHandler<OrderResponse>(() => 
      apiClient.post(API_ENDPOINTS.CREATE_ORDER, { courseId })
    ),
};