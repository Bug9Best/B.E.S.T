const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import * as mailService from "../mail/mail.js";
import createHttpError from "http-errors";

export const getAll = async () => {
    try {
        const allAssignment = await prisma.lecture.findMany();
        return { allAssignment };
    } catch (error) {
        throw createHttpError.Unauthorized("this Course not found.");
    }
}

export const show = async (id) => {
    const oneAssignment = await prisma.lecture.findUnique({
        where: { id: id },
    });

    if (!oneAssignment) {
        throw createHttpError.Unauthorized("this Course not found.");
    }

};

export const create = async (courseId, content) => {
    const newLecture = await prisma.lecture.create({
        data: {
            courseId: parseInt(courseId),
            content: content,
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

    // enroll.forEach(async (enroll) => {
    //     const sendMail = await mailService.onAssign(enroll.student.email, enroll.student.fullname, course.title);
    // });

    // io.emit("enroll")

    return { newLecture, enroll };
};

export const update = async (courseId, title, dexcription) => {

    const updateAssignment = await prisma.assignment.update({
        where: { courseId: courseId },
        data: {

            title: title,
            description: dexcription,
        }
    })

    return updateAssignment;
}

export const remove = async (courseId) => {
    const removeAssignment = await prisma.assignment.delete({
        where: { courseId: courseId },
    });

    return removeAssignment;
}