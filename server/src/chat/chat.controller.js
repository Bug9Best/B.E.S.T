import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as chatservice from "./chat.service.js";

//create chat

router.post("/create", async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId) {
    res.status(400).json({ message: "sender is required" });
  }
  if (!receiverId) {
    res.status(400).json({ message: "receiver is required" });
  }
  const chat = await chatservice.create(senderId, receiverId);
  res.json(chat);
});

router.get("/message/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const message = await chatservice.getMessage(id);
    res.json(message);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
  }
});

router.post("/message", async (req, res) => {
  const { chatId, userId, message } = req.body;
  if (!chatId) {
    res.status(400).json({ message: "chatId is required" });
  }
  if (!userId) {
    res.status(400).json({ message: "senderId is required" });
  }
  if (!message) {
    res.status(400).json({ message: "message is required" });
  }
  const newMessage = await chatservice.createMessage(chatId, userId, message);
  res.json(newMessage);
});

export default router;
