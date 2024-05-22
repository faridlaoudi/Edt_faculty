import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  // get data
  const { fetchedData } = await req.json();

  // clear data from the database
  console.log(`Start clearing data...`);
  await prisma.scheduleEntry.deleteMany();
  await prisma.specialitySection.deleteMany();
  await prisma.speciality.deleteMany();
  await prisma.academicYear.deleteMany();

  //    post data to the database
  for (const year of fetchedData) {
    await prisma.academicYear.create({
      data: {
        year: year.year,
        specialities: {
          create: year.specialite.map((speciality: any) => ({
            name: speciality.name,
            sections: {
              create: speciality.sections.map((section: any) => ({
                name: section.name,
                schedule: {
                  create: section.schedule.map((entry: any) => ({
                    day: entry.day,
                    group: entry.group || "",
                    moduleName: entry.moduleName,
                    room: entry.room,
                    sessionType: entry.session_type,
                    slot: entry.slot,
                    teacher: entry.teacher,
                    time: entry.time,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }

  return NextResponse.json({ message: "created successfully" });
};

export const GET = async (req: NextRequest) => {
  try {
    // Retrieve all academic years along with related data
    const academicYears = await prisma.academicYear.findMany({
      include: {
        specialities: {
          include: {
            sections: {
              include: {
                schedule: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(academicYears);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Error retrieving data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
