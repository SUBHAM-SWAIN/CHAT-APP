const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId, io } = require("../lib/socket.js");

exports.getUsersForSideBar = async (req, res) => {
  try {
    const id = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );

    return res.status(200).json(filteredUser);
  } catch (error) {
    console.error("getUsersForSideBar error:", error);
    return res.status(500).json({ error: "Failed to fetch sidebar users" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const userToChatId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.json(messages);
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json({ error: "Failed to fetch messages" });
  }
};

exports.sendMessage = async (req, res) => {
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

    //realtime Logic
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId)
      io.to(receiverSocketId).emit("newMessage", newMessage);

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) io.to(senderSocketId).emit("newMessage", newMessage);

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
};
