const prisma = new PrismaClient();
import { PrismaClient, Prisma } from "@prisma/client";

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
    throw createHttpError.Unauthorized("this Assignment not found.");
  }

  return asssignement.assignments;
};
