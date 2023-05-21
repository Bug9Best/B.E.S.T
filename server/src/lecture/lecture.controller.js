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
            creatorId: data.creatorId,
            title: data.title,
            description: data.description,
        });

        if (!isValid) {
            throw createHttpError.Unauthorized("data invalid");
        }

        let lecture = await lectureService.create(data.courseId, data.creatorId, data.title, data.description);

        res.json(lecture);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.put("/updateLecture", async (req, res) => {
    try {
        let lecture = await lectureService.update(req.courseId, req.title, req.description);
        res.json(lecture);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deleteLecture", async (req, res) => {
    try {
        let lecture = await lectureService.remove(req.courseId);
        res.json(lecture);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;