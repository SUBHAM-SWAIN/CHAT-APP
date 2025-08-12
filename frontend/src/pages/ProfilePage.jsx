// frontend/src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";
import profilPic from "../assets/avatar.png"; // ensure this file exists at this path

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: validate file size/type here

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result; // includes data:<mime>;base64,....
      // update preview immediately
      setImagePreview(base64Image);

      // send to backend
      await updateProfile({ profile: base64Image });
      // after updateProfile completes, store will be updated with backend URL (authUser.profile)
      // If you want to ensure preview uses server URL: you can clear imagePreview here and rely on authUser.profile
    };

    reader.onerror = () => {
      console.error("Error reading file");
    };
  };

  if (!authUser) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Please log in to view your profile.
      </div>
    );
  }

  // prefer server value (authUser.profile); if just uploaded, use local preview
  const displayedImage = imagePreview || authUser.profile || profilPic;

  return (
    <div className="flex flex-col items-center py-10 text-white bg-gray-950 min-h-screen">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-sky-400">Profile</h1>
        <p className="text-center text-gray-400 mb-6">Your profile information</p>

        <div className="relative flex justify-center mb-6">
          <img
            src={displayedImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-sky-400 object-cover"
          />
          <label className="absolute bottom-0 right-[35%] bg-sky-400 p-2 rounded-full cursor-pointer hover:bg-sky-300 transition">
            <Camera size={18} className="text-black" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
          {isUpdatingProfile && (
            <span className="absolute bottom-[-25px] text-xs text-gray-400">
              Uploading...
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <div className="flex items-center bg-gray-800 rounded-md px-3">
            <User size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              defaultValue={authUser.fullName}
              className="w-full bg-transparent py-2 outline-none text-white"
              readOnly
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Email Address</label>
          <div className="flex items-center bg-gray-800 rounded-md px-3">
            <Mail size={16} className="text-gray-500 mr-2" />
            <input
              type="email"
              defaultValue={authUser.email}
              className="w-full bg-transparent py-2 outline-none text-white"
              readOnly
            />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-sky-400 font-semibold mb-2">Account Information</h2>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Member Since</span>
            <span>{new Date(authUser.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Account Status</span>
            <span className="text-cyan-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
