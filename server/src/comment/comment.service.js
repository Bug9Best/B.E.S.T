const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";

export const create = async (postId, authorId, content) => {
    const newPost = await prisma.comments.create({
        data: {
            postId: parseInt(postId),
            authorId: parseInt(authorId),
            content: content,
        }
    })

    return { newPost };
};

export const remove = async (commentId) => {
    const removePost = await prisma.comments.delete({
        where: { id: parseInt(commentId) },
    });

    return { removePost };
}
