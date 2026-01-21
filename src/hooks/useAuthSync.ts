import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { syncSession, logout } from "@/store/slices/authSlice";

/**
 * Automatically syncs NextAuth session with Redux Store.
 * Place this once in your Root Layout or App wrapper.
 */
export const useAuthSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // 1. Session exists: Fetch fresh user data into Redux
      dispatch(syncSession());
    } else if (status === "unauthenticated") {
      // 2. Session expired/missing: Clear Redux state
      dispatch(logout());
    }
  }, [status, session, dispatch]);
};