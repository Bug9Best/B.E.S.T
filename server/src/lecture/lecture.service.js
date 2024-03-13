const prisma = new PrismaClient();
import { PrismaClient} from "@prisma/client";
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

export const create = async (courseId, content, fileName, fileUrl) => {
    const newLecture = await prisma.lecture.create({
        data: {
            courseId: parseInt(courseId),
            content: content,
            fileName: fileName,
            fileUrl: fileUrl
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
        const sendMail = await mailService.onLecture(enroll.student.email, enroll.student.fullname, course.title);
    });


    return { newLecture, enroll };
};

export const update = async (lectureId, title, description) => {

    const updateAssignment = await prisma.lecture.update({
        where: { id: parseInt(lectureId) },
        data: {
            title: title,
            description: description,
        }
    })

    return updateAssignment;
}

export const remove = async (lectureId) => {
    const removeAssignment = await prisma.lecture.delete({
        where: { id: parseInt(lectureId) },
    });

    return removeAssignment;
}
