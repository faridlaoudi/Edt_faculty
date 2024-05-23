import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { upsertConfiguration } from "../configuration-util";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  // get id from the body
  const { id } = await req.json();

  console.log("Received POST request with id:", id);

  // check if id type is string
  if (typeof id !== "string") {
    return NextResponse.json(
      {
        message: "Error sqfdsqfdsqdf",
      },
      {
        status: 500,
      }
    );
  }

  console.log("Received DELETE request with id:", id);

  const configuration = await prisma.configuration.findFirst({
    where: {
      key: id,
    },
  });

  if (!configuration || !configuration.value) {
    return NextResponse.json(
      {
        key: id,
        value: null,
      },

      {
        status: 200,
      }
    );
  }

  return NextResponse.json(configuration);
};

export const PUT = async (req: NextRequest) => {
  // get id from the body
  const { id, value } = await req.json();

  // check if id type is string
  if (typeof id !== "string") {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      }
    );
  }

  await upsertConfiguration(id, value);

  return NextResponse.json({});
};
