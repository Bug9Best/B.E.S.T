import express from "express";
const router = express.Router();
import * as userservice from "./user.service.js";

router.get("/assignment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const assignment = await userservice.getAssignment(id);

    res.json(assignment);
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).json({ message: e.message });
  }
});

router.get("/chat/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const chat = await userservice.getChat(id);
    res.json(chat);
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).json({ message: e.message });
  }
});

export default router;
