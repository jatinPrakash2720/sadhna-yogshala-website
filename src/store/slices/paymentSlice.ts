import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentService } from "@/services/payment.service";
import { OrderResponse } from "@/types/api/payment.types";

interface PaymentState {
  currentOrder: OrderResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  currentOrder: null,
  loading: false,
  error: null,
};

// Create Razorpay Order
export const createOrder = createAsyncThunk("payment/createOrder", async (courseId: string) => {
  return await paymentService.createOrder(courseId);
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Payment init failed";
      });
  },
});

export const { clearOrder } = paymentSlice.actions;
export default paymentSlice.reducer;