// pages/api/enseignants.js

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    const data = await prisma.annee.findMany({
      include: {
        specialites: {
          include: {
            sections: {
              include: {
                groupes: true,
                modules: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          message: "No enseignants found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(data);
  }
};
