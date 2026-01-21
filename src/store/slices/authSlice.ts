import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "@/services/auth.service";
import { User } from "@/types/api/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start loading to check session
};

// Async Thunk: Fetches fresh user data from DB
export const syncSession = createAsyncThunk("auth/syncSession", async () => {
  return await authService.getMe();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Call this if NextAuth says "unauthenticated"
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncSession.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(syncSession.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;