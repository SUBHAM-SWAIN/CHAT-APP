import React from "react";
import ThemeChooser from "../components/ThemeChooser";

export default function SettingsPage() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-tr
        from-gray-100
        to-gray-200
        dark:from-gray-900
        dark:to-gray-800
        px-6
        py-12
      "
    >
      <div
        className="
          max-w-lg
          w-full
          bg-white
          dark:bg-gray-900
          rounded-3xl
          shadow-2xl
          p-12
          transition-colors
          duration-500
          border
          border-gray-200
          dark:border-gray-700
          flex
          flex-col
        "
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        <h2
          className="text-4xl font-extrabold mb-10 text-center tracking-tight"
          style={{ color: "var(--color-primary)" }}
        >
          Settings
        </h2>

        <section className="mb-12 flex flex-col">
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Theme
          </h3>
          <ThemeChooser />
        </section>

        {/* Future settings sections can be added here */}
      </div>
    </div>
  );
}
