const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import * as mailService from "../mail/mail.js";
import { io } from "../socket/index.js"

export const getAll = async (userId) => {
    const allEnroll = await prisma.enrollment.findMany({
        where: { userId: parseInt(userId) },
        include: {
            course: true,
        }
    });

    return allEnroll;
}

export const create = async (courseId, userId) => {
    const newEnroll = await prisma.enrollment.create({
        data: {
            courseId: courseId,
            userId: userId,
        },
    })

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            fullname: true,
            email: true,
        }
    });

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        select: {
            title: true,
        }
    });

    const sendMail = await mailService.onEnroller(user.email, user.fullname, course.title);

    io.emit("enroll")

    return { newEnroll, sendMail };
};

export const exit = async (courseId, userId) => {
    const exitCourse = await prisma.enrollment.delete({
        where: {
            AND: [
                {
                    courseId: parseInt(courseId),
                },
                {
                    userId: parseInt(userId),
                },
            ],
        },
    });

    return { exitCourse };
}