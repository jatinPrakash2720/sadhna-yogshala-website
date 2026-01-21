"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useAuthSync } from "@/hooks/useAuthSync";

// 1. Inner component to run the Auth Sync Hook
// We need this because hooks can only run INSIDE a component
const AuthSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  useAuthSync(); // <--- Runs the logic to sync NextAuth session -> Redux
  return <>{children}</>;
};

// 2. The Main Provider
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthSyncWrapper>
        {children}
      </AuthSyncWrapper>
    </Provider>
  );
}