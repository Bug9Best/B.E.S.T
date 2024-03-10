import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as lectureService from "./lecture.service.js";
import { createLectureValidate } from "./lecture.validate.js";

router.post("/createLecture", async (req, res) => {
    try {
        const data = req.body;

        const isValid = await createLectureValidate.isValid({
            courseId: data.courseId,
            content: data.content,
            fileName: data.fileName,
            fileUrl: data.fileUrl
        });

        if (!isValid) {
            throw createHttpError.Unauthorized("data invalid");
        }

        let lecture = await lectureService.create(data.courseId, data.content, data.fileName, data.fileUrl);

        res.json(lecture);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.put("/updateLecture/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let lecture = await lectureService.update(id, req.body.title, req.body.description);
        res.json(lecture);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deleteLecture/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let lecture = await lectureService.remove(id);
        res.json(lecture);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;