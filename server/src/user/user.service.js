const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

export const getAssignment = async (userId) => {
  const asssignement = await prisma.user.findUniqueOrThrow({
    where: { id: parseInt(userId) },
    select: {
      assignments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!asssignement) {
    throw createHttpError.BadRequest("this Assignment not found.");
  }

  return asssignement.assignments;
};

export const getChat = async (userId) => {
  const myChat = await prisma.user.findUniqueOrThrow({
    where: { id: parseInt(userId) },
    select: {
      Receiver: {
        include: {
          sender: {
            select: {
              fullname: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      Sender: {
        include: {
          receive: {
            select: {
              fullname: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!myChat) {
    throw createHttpError.BadRequest("this chat not found.");
  }

  const mixChat = [...myChat.Receiver, ...myChat.Sender];
  return mixChat;
};


