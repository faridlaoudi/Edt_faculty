// pages/api/enseignants.js

import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { clearConfiguration } from "../configuration-util";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method === "GET") {
    const enseignants = await prisma.professor.findMany({
      include: {
        modules: {
          select: {
            nom_module: true,
            priority: true,
          },
        },
      },
    });

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

export const POST = async (req: NextRequest) => {
  const {
    nom,
    prenom,
    gender,
    email,
    telephone,
    dateNaissance,
    grade,
    disponibilite,
    modules, // Expecting an array of modules with properties: nom_module and priority
  } = await req.json();

  console.log("received data: " + JSON.stringify(req.json));

  const existingProfessor = await prisma.professor.findFirst({
    where: {
      email, // Assuming "email" is a unique identifier for a professor
    },
  });

  if (existingProfessor) {
    return NextResponse.json(
      {
        message: "Professor already exists",
      },
      {
        status: 500,
      }
    );
  } else {
    const professor = await prisma.professor.create({
      data: {
        nom,
        prenom,
        gender,
        email,
        numero_de_telephone: telephone,
        date_de_naissance: new Date(dateNaissance),
        grade,
        availability_prof: disponibilite,
        modules: {
          create: modules.map(
            (module: { nom_module: string; priority: number }) => ({
              nom_module: module.nom_module,
              priority: module.priority,
            })
          ),
        },
      },
    });

    // Optional: Clear any related configurations, if necessary
    // await clearConfiguration("some-configuration-key");

    await clearConfiguration("schdule-generated");
    return NextResponse.json({
      message: "Created professor with modules",
      professor,
    });
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { id } = await req.json();

    if (typeof id !== "string") {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Delete related module assignments first
    await prisma.moduleAssignment.deleteMany({
      where: { professorId: id },
    });

    // Delete the professor
    const enseignant = await prisma.professor.delete({
      where: { id },
    });

    await clearConfiguration("schdule-generated");
    return NextResponse.json(enseignant, { status: 200 });
  } catch (error) {
    // Cast error to an instance of Error to access the message property
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error deleting professor", error: errorMessage },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const {
    id, // Assuming the professor's ID is provided to identify which professor to update
    nom,
    prenom,
    gender,
    email,
    telephone,
    date_de_naissance,
    grade,
    availability_prof,
    modules, // Expecting an array of modules with properties: id (if updating), nom_module and priority
  } = await req.json();

  console.log("received data: " + JSON.stringify(req.json));

  // Check if the professor exists
  const existingProfessor = await prisma.professor.findFirst({
    where: { id },
  });

  if (!existingProfessor) {
    return NextResponse.json(
      { message: "Professor not found" },
      { status: 404 }
    );
  }

  // Update the professor and their related modules
  const updatedProfessor = await prisma.professor.update({
    where: { id },
    data: {
      nom,
      prenom,
      gender,
      email,
      numero_de_telephone: telephone,
      date_de_naissance: new Date(date_de_naissance),
      grade,
      availability_prof,
      modules: {
        deleteMany: {}, // Delete existing module assignments
        create: modules.map(
          (module: { nom_module: string; priority: number }) => ({
            nom_module: module.nom_module,
            priority: module.priority,
          })
        ),
      },
    },
  });

  await clearConfiguration("schdule-generated");
  return NextResponse.json({
    message: "Updated professor and modules",
    professor: updatedProfessor,
  });
};
