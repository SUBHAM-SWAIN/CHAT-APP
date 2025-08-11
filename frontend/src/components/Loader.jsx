// GalaxyLoader.jsx
import React from "react";

const GalaxyLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-24 h-24">
        {/* Center core */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] transform -translate-x-1/2"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_rgba(244,114,182,0.8)] transform -translate-x-1/2"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s" }}>
          <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] transform -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default GalaxyLoader;
