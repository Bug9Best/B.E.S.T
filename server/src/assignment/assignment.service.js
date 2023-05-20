const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

export const getAll = async () => {
    try {
        const allAssignment = await prisma.assignment.findMany();
        return { allAssignment };
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

export const create = async (courseId, creatorId, title, description, dueDate) => {
    const findAssignmentId = await prisma.assignment.findUnique({
        where: { courseId: courseId },
    });

    if (findAssignmentId) {
        throw createHttpError.Unauthorized("this Course have alrady.");
    }

    const newAssignment = await prisma.assignment.create({
        data: {
            courseId: courseId,
            creatorId: creatorId,
            title: title,
            description: description,
            dueDate: dueDate,
        }
    })

    return newAssignment;
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
