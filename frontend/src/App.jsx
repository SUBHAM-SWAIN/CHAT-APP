import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SetingPage from "./pages/SettingPage";
import ProfilePage from "./pages/profilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore.js";
import LoadingPreview from "./components/Loader.jsx";
import { Toaster } from "react-hot-toast"; // ✅ fixed import

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return <LoadingPreview />;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-[60px] z-50">
        <Navbar />
      </div>

      {/* Pages content below navbar */}
      <main className="flex-1 mt-[60px] h-[calc(100vh-60px)] overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setting" element={<SetingPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </main>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937", // Tailwind gray-800
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}

export default App;
