import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce shadow-lg shadow-primary/20">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Welcome */}
        <h2 className="text-3xl font-bold text-zinc-100">Welcome to Chatty!</h2>
        <p className="text-zinc-400">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
