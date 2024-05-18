import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const clearConfiguration = async (id: string) => {
  const configuration = await prisma.configuration.findFirst({
    where: {
      key: id,
    },
  });

  if (!configuration) {
    return;
  }

  await prisma.configuration.deleteMany({
    where: {
      key: id,
    },
  });
};

export const upsertConfiguration = async (id: string, value: string) => {
  const configuration = await prisma.configuration.findFirst({
    where: {
      key: id,
    },
  });

  if (!configuration) {
    await prisma.configuration.create({
      data: {
        key: id,
        value,
      },
    });
    return;
  } else {
    await prisma.configuration.updateMany({
      where: {
        key: id,
      },
      data: {
        value,
      },
    });
  }
};
