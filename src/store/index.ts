import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import adminReducer from "./slices/adminSlice";
import paymentReducer from "./slices/paymentSlice"; // <--- Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    admin: adminReducer,
    payment: paymentReducer, // <--- Add
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;