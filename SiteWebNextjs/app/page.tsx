"use client";
import { PrismaClient } from "@prisma/client";
import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const Page = async () => {
  const { data: session, status } = await useSession();
  if (status === "unauthenticated") {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  console.log(session);

  // get the data from the database
  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      nom: true,
      type: true,
      capacite: true,
      disponibilite: true,
    },
  });
  const enseignants = await prisma.professor.findMany();

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

  const rooms_requst = rooms.map((room) => {
    return {
      name: room.nom,
      type: room.type,
      availability: room.disponibilite,
    };
  });
  const profs_request = enseignants.map((prof) => {
    return {
      name: prof.nom,
      modules: prof.modules.map((module, index) => {
        return {
          priority: index + 1,
          name: module,
        };
      }),
      availability: prof.availability_prof,
    };
  });

  const request = data.map((year) => {
    return {
      year: year.annee,
      specialite: year.specialites.map((specialite) => {
        return {
          name: specialite.nom,
          sections: specialite.sections.map((section) => {
            return {
              name: section.nom,
              groups: section.groupes.map((groupe) => groupe.nom),
              modules: section.modules.map((module) => {
                return {
                  name: module.nom_module,
                  lectures: module.nb_cours,
                  td: module.td,
                  tp: module.tp,
                };
              }),
            };
          }),
        };
      }),
    };
  });

  console.log(request);

  // extract the available yeras
  const years = data.map((year) => year.annee);
  //extract the available specialities names
  const specialities = data.map((year) => {
    return year.specialites.map((specialite) => specialite.nom);
  });

  console.log(years, specialities);

  type years = {
    year: year[];
  };

  type year = {
    year: number;
    specialite: specialite[];
  };

  const allSections: ({
    modules: {
      id: string;
      nom_module: string;
      nb_cours: number | null;
      td: boolean;
      tp: boolean;
      sectionId: string;
    }[];
    groupes: { id: string; nom: string; sectionId: string }[];
  } & {
    id: string;
    nom: string;
    specialiteId: string;
    annee: number;
    capacite: number | null;
  })[] = [];

  data.forEach((annee) => {
    annee.specialites.forEach((specialite) => {
      allSections.push(...specialite.sections);
    });
  });

  const extractedData = allSections.map((section) => {
    return {
      name: section.nom,
      groups: section.groupes.map((groupe) => groupe.nom),
      schedule: [],
      capacity: 100,
      modules: [
        {
          modules: section.modules.map((module) => ({
            moduleName: module.nom_module,
            lectures: module.nb_cours || 0,
            td: module.td,
            tp: module.tp,
          })),
        },
      ],
    };
  });
  const finalData = {
    rooms: rooms_requst,
    teachers: profs_request,
    sections: extractedData,
  };

  let fetchedData;
  try {
    const response = await fetch(
      "https://mojnx.pythonanywhere.com/generate-schedule",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );
    console.log(response.status);
    fetchedData = await response.json();
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {/* display the data on the page in json */}
      <pre>{JSON.stringify(request, null, 2)}</pre>
      <p>
        -----------------------------------------------------------------------------------------
      </p>
    </div>
  );
};

export default Page;
