import {create} from "zustand";
import { axiosInstans } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstans.get("/auth/check");
      set({ authUser: response.data, isCheckingAuth: false });
    } catch (error) {
        console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },
}));
