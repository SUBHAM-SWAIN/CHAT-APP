import React from "react";
import {
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white shadow-md flex items-center justify-between px-4 z-50">
      {/* Logo + App Name */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-sky-400" />
        <span className="text-lg font-bold text-sky-400">PulseChat</span>
      </div>

      {/* Right Side Navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/setting")}
          className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
        >
          <Cog6ToothIcon className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Settings</span>
        </button>

        {authUser && (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
            >
              <UserCircleIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">
                Profile
              </span>
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center space-x-1 hover:text-red-400 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">
                Logout
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
