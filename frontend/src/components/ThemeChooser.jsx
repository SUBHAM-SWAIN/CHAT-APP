import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const themes = [
  { id: "dark", label: "Dark" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
  { id: "red", label: "Red" },
  { id: "purple", label: "Purple" },
];

export default function ThemeChooser() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="w-full max-w-xs mx-auto">
      <label
        htmlFor="theme-select"
        className="block mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200"
      >
        Select Theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="
          w-full
          px-5 py-3
          rounded-xl
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-900
          text-gray-900
          dark:text-gray-100
          text-lg
          font-semibold
          shadow-md
          appearance-none
          focus:outline-none
          focus:ring-4
          focus:ring-blue-400
          focus:border-blue-500
          transition
          duration-300
          ease-in-out
          cursor-pointer
          relative
        "
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg fill=\"%23666\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1.25rem",
          paddingRight: "3rem",
        }}
      >
        {themes.map(({ id, label }) => (
          <option
            key={id}
            value={id}
            className="hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
