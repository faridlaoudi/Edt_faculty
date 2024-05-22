// const rooms = await prisma.room.findMany({
//   include: {
//     disponibilite: {
//       include: {
//         times: true,
//       },
//     },
//   },
// });

// const enseignants = await prisma.professor.findMany();

// const data = await prisma.annee.findMany({
//   include: {
//     specialites: {
//       include: {
//         sections: {
//           include: {
//             groupes: true,
//             modules: true,
//           },
//         },
//       },
//     },
//   },
// });

// const rooms_requst = rooms.map((room) => {
//   return {
//     name: room.nom,
//     type: room.type,
//     availability: room.disponibilite.map((dispo) => {
//       return dispo.day;
//     }),
//   };
// });

// const profs_request = enseignants.map((prof) => {
//   return {
//     name: prof.nom,
//     modules: prof.modules.map((module, index) => {
//       return {
//         priority: index + 1,
//         name: module,
//       };
//     }),
//     availability: prof.availability_prof,
//   };
// });

// const allSections: ({
//   modules: {
//     id: string;
//     nom_module: string;
//     nb_cours: number | null;
//     td: boolean;
//     tp: boolean;
//     sectionId: string;
//   }[];
//   groupes: { id: string; nom: string; sectionId: string }[];
// } & {
//   id: string;
//   nom: string;
//   specialiteId: string;
//   annee: number;
//   capacite: number | null;
// })[] = [];

// data.forEach((annee) => {
//   annee.specialites.forEach((specialite) => {
//     allSections.push(...specialite.sections);
//   });
// });

// const extractedData = allSections.map((section) => {
//   return {
//     name: section.nom,
//     groups: section.groupes.map((groupe) => groupe.nom),
//     schedule: [],
//     capacity: 100,
//     modules: [
//       {
//         modules: section.modules.map((module) => ({
//           moduleName: module.nom_module,
//           lectures: module.nb_cours || 0,
//           td: module.td,
//           tp: module.tp,
//         })),
//       },
//     ],
//   };
// });

// const finalData = {
//   rooms: rooms_requst,
//   teachers: profs_request,
//   sections: extractedData,
// };

// try {
//   const response = await fetch(
//     "https://mojnx.pythonanywhere.com/generate-schedule",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(finalData),
//     }
//   );
//   console.log(response.status);
//   const data = await response.json();
//   console.log(data);
// } catch (error) {
//   console.log(error);
// }
