// frontend/src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage"; // make sure filename matches
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore.js";
import LoadingPreview from "./components/Loader.jsx";
import { Toaster } from "react-hot-toast";

// Import your zustand theme store and CSS
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  // Theme state from zustand
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    checkAuth();
  }, []);

  // On app mount, set theme from localStorage or fallback "light"
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, [setTheme]);

  if (isCheckingAuth && !authUser) {
    return <LoadingPreview />;
  }

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <div className="fixed top-0 left-0 right-0 h-[60px] z-50">
        <Navbar />
      </div>

      <main className="flex-1 mt-[60px] h-[calc(100vh-60px)] overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </main>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-bg)",
            color: "var(--color-text)",
            borderRadius: "8px",
            boxShadow:
              theme === "dark"
                ? "0 0 10px rgba(255,255,255,0.1)"
                : "0 0 10px rgba(0,0,0,0.1)",
          },
        }}
      />
    </div>
  );
}

export default App;
