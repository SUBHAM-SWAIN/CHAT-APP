import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white shadow-md flex items-center justify-between z-50">
      {/* Logo */}
      <div className="text-xl font-bold text-sky-400 ml-4">MyApp</div>

      {/* Links */}
      <ul className="flex space-x-6 mr-4 text-sm font-medium">
        <li>
          <a href="/" className="hover:text-sky-400 transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="/signup" className="hover:text-sky-400 transition-colors">
            Sign Up
          </a>
        </li>
        <li>
          <a href="/login" className="hover:text-sky-400 transition-colors">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}
