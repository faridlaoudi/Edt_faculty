import { PrismaClient } from "@prisma/client";
import { teacherData } from "./teacher-data";

const prisma = new PrismaClient();

async function seedProfessors() {
  // Clear existing professor data
  await prisma.professor.deleteMany();

  console.log("Seeding professors...");
  for (const professor of teacherData) {
    const createdProfessor = await prisma.professor.create({
      data: {
        nom: professor.nom,
        prenom: professor.prenom,
        gender: professor.gender,
        email: professor.email,
        numero_de_telephone: professor["numero de telephone"],
        date_de_naissance: new Date(professor["Date de naissance"]),
        grade: professor.grade,
        availability_prof: {
          set: professor.availability_prof,
        },
        modules: {
          set: professor.modules,
        },
      },
    });
    console.log(`Professor with ID ${createdProfessor.id} seeded successfully.`);
  }
  console.log("Professor seeding completed.");
}

async function main() {
  try {
    await seedProfessors();
  } catch (error) {
    console.error("Error seeding professors:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
