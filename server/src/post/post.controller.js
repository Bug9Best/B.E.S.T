import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as postService from "./post.service.js";
import { createPost } from "./post.validate.js";


router.post("/createPost", async (req, res) => {
    try {
        const data = req.body;

        const isValid = await createPost.isValid({
            content: data.content
        });

        if (!isValid) {
            throw createHttpError.Unauthorized("data invalid");
        }

        let post = await postService.create(data.courseId, data.authorId, data.content);

        res.json(post);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deletePost/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let post = await postService.remove(id);
        res.json(post);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;