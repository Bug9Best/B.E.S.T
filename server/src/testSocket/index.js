import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import { io } from "../socket/index.js";

router.post("/testSocket", async (req, res) => {
    try {
        const data = req.body;
        io.emit("testSocket", data)
        res.json(data);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;