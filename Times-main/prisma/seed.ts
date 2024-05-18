import { PrismaClient, Prisma } from "@prisma/client";
import { userData } from "./user-data";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start clearing data...`);

  // Clear data from collections
  await prisma.groupe.deleteMany();
  await prisma.module.deleteMany();
  await prisma.section.deleteMany();
  await prisma.specialite.deleteMany();
  await prisma.annee.deleteMany();

  console.log(`Data cleared.`);

  console.log(`Start seeding ...`);
  for (const userDataItem of userData) {
    const createdAnnee = await prisma.annee.create({
      data: {
        annee: userDataItem.annee,
        specialites: {
          create: userDataItem.specialites.map((specialite) => ({
            nom: specialite.nom,
            sections: {
              create: specialite.sections.map((section) => ({
                nom: section.nom,
                annee: section.annee,
                specialite_name: section.specialite,
                groupes: {
                  create: section.groupes.map((groupe) => ({
                    nom: groupe.nom,
                  })),
                },
                modules: {
                  // Add modules creation
                  create: section.modules.map((module) => ({
                    nom_module: module.nom_module,
                    nb_cours: module.nb_cours,
                    td: module.td,
                    tp: module.tp,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        specialites: {
          include: {
            sections: {
              include: {
                groupes: true,
                modules: true, // Include modules in the response
              },
            },
          },
        },
      },
    });
    console.log(`Annee with ID ${createdAnnee.id} seeded successfully.`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
