const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

export const getAll = async () => {
    try {
        const allCourse = await prisma.course.findMany();
        return { allCourse };
    } catch (error) {
        throw createHttpError.Unauthorized("this Course not found.");
    }
}

export const show = async (id) => {
    const oneCourse = await prisma.course.findUnique({
        where: { id: id },
    });

    if (!oneCourse) {
        throw createHttpError.Unauthorized("this Course not found.");
    }

    return { oneCourse };
};

export const create = async (courseId, title, dexcription) => {
    const findCourseId = await prisma.course.findUnique({
        where: { courseId: courseId },
    });

    if (findCourseId) {
        throw createHttpError.Unauthorized("this Course have alrady.");
    }

    const newCourse = await prisma.course.create({
        data: {
            courseId: courseId,
            title: title,
            description: dexcription,
        }
    })

    return { newCourse };
};

export const update = async (courseId, title, dexcription) => {

    const updateCourse = await prisma.course.update({
        where: { courseId: courseId },
        data: {

            title: title,
            description: dexcription,
        }
    })

    return { updateCourse };
}

export const remove = async (courseId) => {
    const removeCourse = await prisma.course.delete({
        where: { courseId: courseId },
    });

    return { removeCourse };
}
