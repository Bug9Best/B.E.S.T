import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as commentService from "./comment.service.js";
import { createComment } from "./comment.validate.js";


router.post("/createComment", async (req, res) => {
    try {
        const data = req.body;

        const isValid = await createComment.isValid({
            content: data.content
        });

        if (!isValid) {
            throw createHttpError.Unauthorized("data invalid");
        }

        let comment = await commentService.create(data.postId, data.authorId, data.content);

        res.json(comment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deleteComment", async (req, res) => {
    try {
        let comment = await commentService.remove(req.courseId);
        res.json(comment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;