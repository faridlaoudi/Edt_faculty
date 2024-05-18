// pages/api/enseignants.js

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    const enseignants = await prisma.professor.findMany();

    if (!enseignants) {
      return NextResponse.json(
        {
          message: "No enseignants found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(enseignants);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "POST") {
    const {
      nom,
      prenom,
      email,
      date_de_naissance,
      numero_de_telephone,
      grade,
    } = await req.json();

    if (
      typeof nom !== "string" ||
      typeof prenom !== "string" ||
      typeof email !== "string" ||
      typeof date_de_naissance !== "string" ||
      typeof numero_de_telephone !== "string" ||
      typeof grade !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Error",
        },
        {
          status: 500,
        }
      );
    }

    // check email with name or email
    const existingEnseignant = await prisma.professor.findFirst({
      where: {
        OR: [
          {
            nom,
          },
          {
            email,
          },
        ],
      },
    });

    if (existingEnseignant) {
      return NextResponse.json(
        {
          message: "Enseignant already exists",
        },
        {
          status: 400,
        }
      );
    }

    const enseignant = await prisma.professor.create({
      data: {
        nom,
        prenom,
        email,
        date_de_naissance,
        numero_de_telephone,
        grade,
      },
    });

    return NextResponse.json(enseignant);
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "DELETE") {
    const { id } = await req.json();

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

    const enseignant = await prisma.professor.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(enseignant);
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "PUT") {
    const { id, nom, prenom, email, date_de_naissance, numero_de_telephone, grade } = await req.json();

    if (
      typeof id !== "string" ||
      typeof nom !== "string" ||
      typeof prenom !== "string" ||
      typeof email !== "string" ||
      typeof date_de_naissance !== "string" ||
      typeof numero_de_telephone !== "string" ||
      typeof grade !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Error",
        },
        {
          status: 500,
        }
      );
    }

    const enseignant = await prisma.professor.update({
      where: {
        id,
      },
      data: {
        nom,
        prenom,
        email,
        date_de_naissance,
        numero_de_telephone,
        grade,
      },
    });

    return NextResponse.json(enseignant);
  }
};
