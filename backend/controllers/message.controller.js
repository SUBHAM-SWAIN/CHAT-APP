// backend/controllers/message.controller.js
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Get users for sidebar
export const getUsersForSideBar = async (req, res) => {
  try {
    const id = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: id } }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sidebar users" });
  }
};

// Get all messages between two users
export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const userToChatId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Send new message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) io.to(senderSocketId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// Edit existing message
export const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { newText, image } = req.body;

    if (!messageId || typeof newText !== "string") {
      return res.status(400).json({ message: "messageId and newText are required" });
    }

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this message" });
    }

    message.text = newText;
    if (image !== undefined) message.image = image;
    message.isEdited = true;
    await message.save();

    const senderSocketId = getReceiverSocketId(message.senderId.toString());
    const receiverSocketId = getReceiverSocketId(message.receiverId.toString());

    if (senderSocketId) io.to(senderSocketId).emit("messageEdited", message);
    if (receiverSocketId) io.to(receiverSocketId).emit("messageEdited", message);

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!messageId) return res.status(400).json({ message: "messageId is required" });

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.senderId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();

    const senderSocketId = getReceiverSocketId(message.senderId.toString());
    const receiverSocketId = getReceiverSocketId(message.receiverId.toString());

    if (senderSocketId) io.to(senderSocketId).emit("messageDeleted", messageId);
    if (receiverSocketId) io.to(receiverSocketId).emit("messageDeleted", messageId);

    res.json({ success: true, id: messageId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
