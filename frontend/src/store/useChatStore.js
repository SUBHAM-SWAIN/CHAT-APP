import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstans } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  editingMessage: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstans.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstans.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return toast.error("No user selected");
    try {
      const res = await axiosInstans.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  updateMessage: async (messageId, { text, image }) => {
    try {
      const res = await axiosInstans.put(`/messages/${messageId}`, {
        newText: text,
        image,
      });
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? res.data : msg
        ),
        editingMessage: null,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update message");
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstans.delete(`/messages/${messageId}`);
      set({
        messages: get().messages.filter((msg) => msg._id !== messageId),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;
      set({ messages: [...get().messages, newMessage] });
    });

    socket.on("messageEdited", (updatedMessage) => {
      set({
        messages: get().messages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        ),
      });
    });

    socket.on("messageDeleted", (deletedMessageId) => {
      set({
        messages: get().messages.filter((msg) => msg._id !== deletedMessageId),
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("messageDeleted");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setEditingMessage: (message) => set({ editingMessage: message }),
}));
