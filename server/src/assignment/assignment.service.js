const prisma = new PrismaClient();
import { PrismaClient} from "@prisma/client";
import * as mailService from "../mail/mail.js";
import createHttpError from "http-errors";

export const getAll = async () => {
    try {
        const allAssignment = await prisma.assignment.findMany();
        return allAssignment;
    } catch (error) {
        throw createHttpError.Unauthorized("this Course not found.");
    }
}

export const show = async (id) => {
    const oneAssignment = await prisma.assignment.findUnique({
        where: { id: id },
    });

    if (!oneAssignment) {
        throw createHttpError.Unauthorized("this Course not found.");
    }

};

export const create = async (courseId, creatorId, title, description, dueDate, fileName, fileUrl) => {
    const newAssignment = await prisma.assignment.create({
        data: {
            courseId: parseInt(courseId),
            creatorId: parseInt(creatorId),
            title: title,
            description: description,
            dueDate: dueDate,
            fileName: fileName,
            fileUrl: fileUrl,
        }
    })

    const course = await prisma.course.findUnique({
        where: { id: parseInt(courseId) },
        select: {
            title: true,
        }
    });

    const enroll = await prisma.enrollment.findMany({
        where: { courseId: parseInt(courseId) },
        include: {
            student: true
        }
    });

    enroll.forEach(async (enroll) => {
        const sendMail = await mailService.onAssign(enroll.student.email, enroll.student.fullname, course.title);
    });

    return { newAssignment, enroll };
};

export const update = async (assignmentId, title, description) => {
    const updateAssignment = await prisma.assignment.update({
        where: { id: parseInt(assignmentId) },
        data: {
            title: title,
            description: description,
        }
    })

    return updateAssignment;
}

export const remove = async (assignmentId) => {
    const removeAssignment = await prisma.assignment.delete({
        where: { id: parseInt(assignmentId) },
    });

    return removeAssignment;
}
