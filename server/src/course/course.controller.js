import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as courseService from "./course.service.js";
import * as ownerService from "../owner/owner.service.js";
import { createCourseValidate } from "./course.validate.js";

router.get("/getCourse", async (req, res) => {
    try {
        const course = await courseService.getAll();

        res.json(course);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.get("/getCourse/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const course = await courseService.show(id);

        res.json(course);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.post("/createCourse", async (req, res) => {
    try {
        const data = req.body;

        const isValid = await createCourseValidate.isValid({
            code: data.code,
            term: data.term,
            title: data.title,
            description: data.description,
        });
        if (!isValid) throw createHttpError.Unauthorized("data invalid");

        let course = await courseService.create(data.code, data.term, data.title, data.description, data.owner);

        res.json([course]);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.put("/updateCourse/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        let course = await courseService.update(id, ...data);

        res.json(course);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deleteCourse/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let course = await courseService.remove(id);

        res.json(course);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;