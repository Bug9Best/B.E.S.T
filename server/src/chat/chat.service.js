import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import createHttpError from "http-errors";
import { io } from "../socket/index.js"

const findUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const create = async (senderId, receiverId) => {
  try {
    const findReceiver = await findUser(receiverId);

    if (!senderId) {
      throw createHttpError.BadRequest("sender is required");
    }

    if (!(await findUser(receiverId))) {
      throw createHttpError.BadRequest("receiver is required");
    }

    const check = await prisma.roomChat.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                senderId: senderId,
              },
              {
                senderId: receiverId,
              },
            ],
          },
          {
            OR: [
              {
                receiveId: receiverId,
              },
              {
                receiveId: senderId,
              },
            ],
          },
        ],
      },
    });

    if (check) {
      return check;
    }

    const chat = await prisma.roomChat.create({
      data: {
        name: findReceiver.fullname,
        senderId: senderId,
        receiveId: receiverId,
      },
    });

    io.emit("createChat");

    return chat;
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (chatId) => {
  const message = await prisma.message.findMany({
    where: {
      chatId: parseInt(chatId),
    },
    include: {
      user: {
        select: {
          fullname: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!message) {
    throw createHttpError.BadRequest("this message not found.");
  }

  return message;
};

export const createMessage = async (chatId, userId, message) => {
  try {
    const createMessage = await prisma.message.create({
      data: {
        chatId: parseInt(chatId),
        userId: parseInt(userId),
        content: message,
      },
    });

    io.emit("sendMessage");

    return createMessage;
  } catch (error) {
    throw new Error(error);
  }
};
