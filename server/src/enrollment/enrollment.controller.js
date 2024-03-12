import express from "express";
const router = express.Router();
import * as enrollmentService from "./enrollment.service.js";

router.get("/getEnroll", async (req, res) => {
    const id = req.query.id;
    try {
        const enroll = await enrollmentService.getAll(id);

        res.json(enroll);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.post("/createEnroll", async (req, res) => {
    try {
        const data = req.body;

        let course = await enrollmentService.create(data.courseId, data.userId);

        res.json([course]);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

router.post("/exitCourse", async (req, res) => {
    try {
        const data = req.body;

        let exitCourse = await enrollmentService.exit(data.courseId, data.userId);

        res.json(exitCourse);
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message });
    }
});

export default router;