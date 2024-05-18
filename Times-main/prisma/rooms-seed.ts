import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roomData = [
  {
    nom: "Room A",
    type: "Conference",
    capacite: 50,
    disponibilite: [
      {
        day: "Monday",
        time: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:00" },
        ],
      },
      {
        day: "Tuesday",
        time: [
          { start: "10:00", end: "12:00" },
          { start: "15:00", end: "17:00" },
        ],
      },
    ],
  },
  {
    nom: "Room B",
    type: "Meeting",
    capacite: 20,
    disponibilite: [
      {
        day: "Wednesday",
        time: [
          { start: "08:00", end: "10:00" },
          { start: "13:00", end: "15:00" },
        ],
      },
      {
        day: "Thursday",
        time: [
          { start: "11:00", end: "13:00" },
          { start: "16:00", end: "18:00" },
        ],
      },
    ],
  },
];

async function seedRooms() {
  console.log("Seeding rooms...");
  for (const room of roomData) {
    const createdRoom = await prisma.room.create({
      data: {
        nom: room.nom,
        type: room.type,
        capacite: room.capacite,
        // extract days from the object and map them to the database as an array of strings
        disponibilite: room.disponibilite.flatMap((day) => day.day),
      },
    });
    console.log(`Room with ID ${createdRoom.id} seeded successfully.`);
  }
  console.log("Room seeding completed.");
}

async function main() {
  try {
    await seedRooms();
  } catch (error) {
    console.error("Error seeding rooms:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
