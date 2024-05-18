import { clearConfiguration } from "../configuration-util";
import { PrismaClient, Room } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  console.log("Received GET request from clietn ");

  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      nom: true,
      type: true,
      capacite: true,
      disponibilite: true,
    },
  });

  //return the rooms
  return NextResponse.json(rooms);
};

export const POST = async (req: NextRequest) => {
  // add the (following the db schema) room to the database
  const { nom, type, capacite, disponibilite } = await req.json();
  console.log(
    "Received POST request with body:",
    nom,
    type,
    capacite,
    disponibilite
  );

  if (
    typeof nom !== "string" ||
    typeof type !== "string" ||
    typeof capacite !== "number"
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

  const existingRoom = await prisma.room.findFirst({
    where: {
      nom, // Assuming "nom" is a unique identifier for a room
    },
  });

  if (existingRoom) {
    // If the room already exists, you can handle it accordingly
    return NextResponse.json(
      {
        message: "Room already exists",
      },
      {
        status: 500,
      }
    );
  } else {
    const room: Room = await prisma.room.create({
      data: {
        nom: nom,
        type: type,
        capacite: capacite,
        disponibilite: disponibilite.flatMap((day: any) => day.day),
      },
    });

    await clearConfiguration("schdule-generated");
    return NextResponse.json({ message: "created room", room });
  }
};

export const DELETE = async (req: NextRequest) => {
  // get id from the body
  const { id } = await req.json();

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

  console.log("Received DELETE request with id:", id);

  await prisma.room.delete({
    where: {
      id: id,
    },
  });

  await clearConfiguration("schdule-generated");

  return NextResponse.json({});
};

export const PUT = async (req: NextRequest) => {
  // get id from the body
  const { id, nom, type, capacite, disponibilite } = await req.json();

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

  // check if room exists
  const existingRoom = await prisma.room.findFirst({
    where: {
      id,
    },
  });

  if (!existingRoom) {
    return NextResponse.json(
      {
        message: "Room not found",
      },
      {
        status: 404,
      }
    );
  }

  console.log("Received PUT request with id:", id);

  const room = await prisma.room.update({
    where: {
      id: id,
    },
    data: {
      nom: nom,
      type: type,
      capacite: capacite,
      disponibilite: disponibilite.flatMap((day: any) => day.day),
    },
  });

  await clearConfiguration("schdule-generated");

  return NextResponse.json({ message: "updated room", room });
};
