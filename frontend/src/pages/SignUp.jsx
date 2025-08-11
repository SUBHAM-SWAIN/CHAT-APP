import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 pt-[60px]">
      <div className="bg-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-5xl flex flex-col md:flex-row">
        
        {/* Left Form Section */}
        <div className="flex-1 md:pr-6">
          <h2 className="text-2xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-400 mb-6">Get started with your free account</p>

          {/* Full Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-sky-400 pr-10"
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

          {/* Create Account Button */}
          <button className="w-full bg-sky-400 hover:bg-sky-500 text-black font-semibold py-3 rounded-lg">
            Create Account
          </button>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-sky-400 hover:underline">
              Sign in
            </a>
          </p>
        </div>

        {/* Right Section (Hidden only on small screens) */}
        <div className="flex-1 hidden sm:flex flex-col items-center justify-center text-center p-6">
          <div className="grid grid-cols-3 gap-3 mb-4 max-w-[200px] md:max-w-[250px]">
            {Array(9)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 opacity-60"
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
    </div>
  );
}
