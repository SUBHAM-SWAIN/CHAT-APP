// frontend/src/store/useAuthStore.js
import { create } from "zustand";
import { axiosInstans } from "../lib/axios";
import toast from "react-hot-toast";

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
      // response.data expected to be user object (no password)
      set({ authUser: response.data, isCheckingAuth: false });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstans.post("/auth/register", data);
      // register returns { message, user: {...} } — be resilient
      const user = res.data?.user || res.data;
      set({ authUser: user });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstans.post("/auth/login", data);
      // login returns user object directly
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstans.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    // data should be { profile: <base64 string> }
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstans.put("/auth/update-profile", data);
      // backend returns updated user object
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed");
      console.error("updateProfile error:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
