import express from "express";
const router = express.Router();
import createHttpError from "http-errors";
import * as assignmentService from "./assignment.service.js";
import { createAssignmentValidate } from "./assignment.validate.js";

router.get("/getAssignment", async (req, res) => {
    try {
        const assignment = await assignmentService.getAll();
        res.json(assignment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.get("/getAssignment/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const assignment = await assignmentService.show(id);
        res.json(assignment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.post("/createAssignment", async (req, res) => {
    try {
        const data = req.body;

        const isValid = await createAssignmentValidate.isValid({
            courseId: data.courseId,
            creatorId: data.creatorId,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            fileName: data.fileName,
            fileUrl: data.fileUrl,
        });

        if (!isValid) {
            throw createHttpError.Unauthorized("data invalid");
        }

        let assignment = await assignmentService.create(
            data.courseId,
            data.creatorId,
            data.title,
            data.description,
            data.dueDate,
            data.fileName,
            data.fileUrl
            );

        res.json(assignment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.put("/updateAssignment", async (req, res) => {
    const id = req.params.id;
    try {
        let assignment = await assignmentService.update(id, req.body.title, req.body.description);
        res.json(assignment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.delete("/deleteAssignment/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let assignment = await assignmentService.remove(id);
        res.json(assignment);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;