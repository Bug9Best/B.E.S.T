const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

export const getAll = async () => {
    const allCourse = await prisma.course.findMany();
    if (!allCourse) throw createHttpError.Unauthorized("This Course not found.");

    return { allCourse };
}

export const show = async (id) => {
    const course = await prisma.course.findUnique({
        where: { id: id },
    });
    if (!course) throw createHttpError.Unauthorized("This Course not found.");

    return { course };
};

export const create = async (code, title, description) => {
    const findCourseId = await prisma.course.findUnique({
        where: { code: code },
    });

    if (findCourseId) throw createHttpError.Unauthorized("This Course have alrady.");

    const newCourse = await prisma.course.create({
        data: {
            code: code,
            title: title,
            description: description,
        }
    })

    return { newCourse };
};

export const update = async (id, code, title, description) => {
    const updateCourse = await prisma.course.update({
        where: { id: id },
        data: {
            code: code,
            title: title,
            description: description,
        }
    })

    return { updateCourse };
}

export const remove = async (id) => {
    const removeCourse = await prisma.course.delete({
        where: { id: id },
    });

    return { removeCourse };
}
