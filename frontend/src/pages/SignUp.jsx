import React, { useState, useEffect } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp, authUser } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to home after successful signup
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const validateForm = ({ fullName, email, password }) => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    signup(formData);
  };

  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 overflow-hidden">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-5xl flex flex-col sm:flex-row p-4 sm:p-8 overflow-hidden">
        
        {/* Left Form Section */}
        <div className="flex-1 md:pr-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-400 mb-6">
            Get started with your free account
          </p>
          <form onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="mb-4 relative">
              <UserIcon className="w-5 h-5 text-sky-400 absolute left-3 top-3.5" />
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                value={formData.fullName}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Email */}
            <div className="mb-4 relative">
              <EnvelopeIcon className="w-5 h-5 text-sky-400 absolute left-3 top-3.5" />
              <input
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <LockClosedIcon className="w-5 h-5 text-sky-400 absolute left-3 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-sky-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-sky-400 hover:bg-sky-500 text-black font-semibold py-3 rounded-lg disabled:opacity-60"
            >
              {isSigningUp ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-sky-400 hover:underline">
              Sign in
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 hidden sm:flex flex-col items-center justify-center text-center p-4">
          <div className="grid grid-cols-3 gap-3 mb-4 max-w-[180px] md:max-w-[250px]">
            {Array(9)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 opacity-60 animate-float"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
          </div>
          <h3 className="text-lg font-semibold text-sky-400">
            Join our community
          </h3>
          <p className="text-gray-400 mt-2 text-sm max-w-xs">
            Connect with friends, share moments, and stay in touch with your
            loved ones.
          </p>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
