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
function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", { authUser });

  if (isCheckingAuth && !authUser) {
    return <LoadingPreview />;
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"}></Navigate>}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SetingPage />} />
        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to={"/login"}></Navigate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
