// utils/generatePDF.ts
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ScheduleEntry } from "@prisma/client";

// Replace the placeholder with your actual base64 string
const usthbLogoBase64 =
  "data:image/jpeg;base64,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"; // shortened for brevity

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (
  schedule: ScheduleEntry[],
  year: number,
  specialty: string,
  section: string
) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Samedi",
  ];

  const shortDaysOfWeek = daysOfWeek.map((day) => day.substring(0, 3));

  const timeSlots = [
    { slot: 1, time: "8h:00 - 9h:30" },
    { slot: 2, time: "9h:40 - 11h:10" },
    { slot: 3, time: "11h:20 - 12h:50" },
    { slot: 4, time: "13h:00 - 14h:30" },
    { slot: 5, time: "14h:40 - 16h:10" },
    { slot: 6, time: "16h:10 - 17h:50" },
  ];

  const getScheduleForSlotAndDay = (slot: number, day: string) => {
    return schedule.filter(
      (entry) =>
        entry.slot === slot && entry.day.toLowerCase() === day.toLowerCase()
    );
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  const documentDefinition: any = {
    pageOrientation: "landscape",
    content: [
      {
        columns: [
          {
            image: usthbLogoBase64,
            width: 50,
          },
          {
            text: [
              {
                text: `Université des Sciences et de la Technologie Houari Boumediene\n`,
                style: "title",
              },
              {
                text: `Vice Rectorat chargé de la Scolarité et de la pédagogie\n`,
                style: "subtitle",
              },
              {
                text: `Emplois du temps de la ${year} année ${specialty} ${section}\n`,
                style: "sectionTitle",
              },
              {
                text: `Année Universitaire: 2024/2025 Semestre: 1 Date: ${formattedDate}\n`,
                style: "date",
              },
            ],
            width: "*",
            alignment: "center",
          },
        ],
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: [40, "*", "*", "*", "*", "*", "*"],
          body: [
            [
              { text: "Day/Time", style: "tableHeader" },
              { text: "08:00 - 09:30", style: "tableHeader" },
              { text: "09:40 - 11:10", style: "tableHeader" },
              { text: "11:20 - 12:50", style: "tableHeader" },
              { text: "13:00 - 14:30", style: "tableHeader" },
              { text: "14:40 - 16:10", style: "tableHeader" },
              { text: "16:10 - 17:50", style: "tableHeader" },
            ],
            ...shortDaysOfWeek.map((shortDay, index) => [
              { text: shortDay, style: "tableHeader" },
              ...timeSlots.map((time) => ({
                text: getScheduleForSlotAndDay(time.slot, daysOfWeek[index])
                  .map(
                    (entry) =>
                      `${entry.moduleName} (${entry.sessionType}${
                        entry.group ? ", " + entry.group : ""
                      })\n${entry.room}, ${entry.teacher}`
                  )
                  .join("\n\n"), // Add space between different entries
                style: "tableCell",
              })),
            ]),
          ],
        },
      },
    ],
    styles: {
      title: {
        fontSize: 16,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 5],
      },
      subtitle: {
        fontSize: 14,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 5],
      },
      date: {
        fontSize: 10,
        alignment: "center",
        margin: [0, 0, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "black",
        alignment: "center",
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableCell: {
        fontSize: 8,
        alignment: "left",
        margin: [2, 2, 2, 2], // Reduced margin
      },
      highlight: {
        background: "yellow",
        margin: [0, 0, 0, 0],
      },
    },
  };

  pdfMake.createPdf(documentDefinition).download("Timetable.pdf");
};

export default generatePDF;
