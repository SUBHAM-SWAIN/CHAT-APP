import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import avatar from "../assets/avatar.png";
import React from "react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    setEditingMessage,
    deleteMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    messageId: null,
    text: "",
  });

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Right-click handler (only on my messages)
  const handleRightClick = (e, message) => {
    if (message.senderId !== authUser._id) return;
    e.preventDefault();

    const menuWidth = 160;
    const menuHeight = 90;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let posX = e.clientX;
    let posY = e.clientY;

    if (posX + menuWidth > screenWidth) posX = screenWidth - menuWidth - 10;
    if (posY + menuHeight > screenHeight) posY = screenHeight - menuHeight - 10;

    setContextMenu({
      visible: true,
      x: posX,
      y: posY,
      messageId: message._id,
      text: message.text,
    });
  };

  const handleEdit = () => {
    setEditingMessage({
      _id: contextMenu.messageId,
      text: contextMenu.text,
    });
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleDelete = async () => {
    await deleteMessage(contextMenu.messageId);
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const closeMenu = () => {
    if (contextMenu.visible) {
      setContextMenu((prev) => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [contextMenu]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto relative">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              onContextMenu={(e) => handleRightClick(e, message)}
            >
              {!isOwnMessage && (
                <img
                  src={selectedUser?.profile || avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md relative ${
                  isOwnMessage
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                    : "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white"
                }`}
              >
                {message.text}
                <div className="text-xs opacity-80 mt-1">
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="absolute bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl rounded-xl border border-blue-500 w-40 z-50 overflow-hidden"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: "fixed",
          }}
        >
          <button
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-blue-600 transition-colors duration-150"
            onClick={handleEdit}
          >
            ✏ <span>Edit</span>
          </button>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-red-300 hover:bg-red-600 hover:text-white transition-colors duration-150"
            onClick={handleDelete}
          >
            🗑 <span>Delete</span>
          </button>
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
