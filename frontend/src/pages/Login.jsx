import React, { useState, useEffect } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, authUser } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const validateForm = ({ email, password }) => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
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
    login(formData);
  };

  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 overflow-hidden">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-5xl flex flex-col sm:flex-row p-4 sm:p-8 overflow-hidden">
        
        {/* Left Form Section */}
        <div className="flex-1 md:pr-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
          <p className="text-gray-400 mb-6">Log in to your account</p>
          <form onSubmit={handleSubmit}>
            
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
              disabled={isLoggingIn}
              className="w-full bg-sky-400 hover:bg-sky-500 text-black font-semibold py-3 rounded-lg disabled:opacity-60"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-gray-400">
            Don’t have an account?{" "}
            <a href="/signup" className="text-sky-400 hover:underline">
              Sign up
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
            Welcome to PulseChat
          </h3>
          <p className="text-gray-400 mt-2 text-sm max-w-xs">
            Stay connected with friends and chat in real time.
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
