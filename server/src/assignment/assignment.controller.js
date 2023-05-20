import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as courseService from "./assignment.service.js";
import { createCourseValidate } from "./assignment.validate.js";

router.get("/getAssignment", async (req, res) => {
    try {
        const course = await courseService.getAll();
        res.json(course);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.get("/getAssignment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.show(id);
        res.json(course);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.post("/createAssignment", async (req, res) => {
    try {
        const data = req.body;

        const isValid = await createCourseValidate.isValid({
            courseId: data.courseId,
            title: data.title,
            description: data.description
        });

        if (!isValid) {
            throw createHttpError.Unauthorized("data invalid");
        }

        let login = await courseService.create(data.courseId, data.title, data.description);

        res.json(login);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.put("/updateAssignment", async (req, res) => {
    try {
        let login = await courseService.update(req.courseId, req.title, req.description);
        res.json(login);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deleteAssignment", async (req, res) => {
    try {
        let login = await courseService.remove(req.courseId);
        res.json(login);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;