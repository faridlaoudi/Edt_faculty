// pages/api/enseignants.js

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    // fettch years using prisma
    const years = await prisma.annee.findMany({
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

    if (!years) {
      return NextResponse.json(
        {
          message: "No data found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(years);
  }
};
