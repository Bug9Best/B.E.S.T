const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";

export const create = async (courseId, authorId, content) => {
    const newPost = await prisma.post.create({
        data: {
            courseId: parseInt(courseId),
            authorId: parseInt(authorId),
            content: content,
        }
    })

    return { newPost };
};

export const remove = async (postId) => {
    const removePost = await prisma.post.delete({
        where: { id: parseInt(postId) },
    });

    return { removePost };
}
