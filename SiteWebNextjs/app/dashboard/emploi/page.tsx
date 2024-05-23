"use client";
import { useState, useEffect } from "react";
import Calendar from "@/app/ui/callendar/calendar";
import PageContainer from "@/app/ui/dashboard/page-container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AcademicYear, ScheduleEntry } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import generatePDF from "@/app/utils/generate-pdf"; // Import the generatePDF function

const ParentComponent = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [infoData, setInfoData] = useState<ScheduleEntry[]>([]);
  const [data, setData] = useState<AcademicYear[]>([]);

  useEffect(() => {
    fetch("/api/store-schedule")
      .then((res) => res.json())
      .then((data) => {
        const transformedData: AcademicYear[] = data.map((year: any) => ({
          year: year.year,
          specialities: year.specialities.map((speciality: any) => ({
            name: speciality.name,
            sections: speciality.sections.map((section: any) => ({
              name: section.name,
              schedule: section.schedule.map((entry: any) => ({
                day: entry.day,
                group: entry.group || "",
                moduleName: entry.moduleName,
                room: entry.room,
                sessionType: entry.sessionType,
                slot: entry.slot,
                teacher: entry.teacher,
                time: entry.time,
              })),
            })),
          })),
        }));
        setData(transformedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle change in the year selector
  const handleYearChange = (selectedYear: number) => {
    setSelectedYear(selectedYear);
    setSelectedSpecialty(""); // Reset the specialty when the year changes
    setSelectedSection(""); // Reset the section when the year changes
  };

  // Handle change in the specialty selector
  const handleSpecialtyChange = (selectedSpecialty: string) => {
    setSelectedSpecialty(selectedSpecialty);
    setSelectedSection(""); // Reset the section when the specialty changes
  };

  // Handle change in the section selector
  const handleSectionChange = (selectedSection: string) => {
    setSelectedSection(selectedSection);
  };

  // Update info data based on selected section
  useEffect(() => {
    if (selectedSection && selectedSpecialty && selectedYear !== null) {
      const yearData = data.find((year) => year.year === selectedYear);
      const specialtyData = yearData?.specialities.find(
        (speciality) => speciality.name === selectedSpecialty
      );
      const sectionData = specialtyData?.sections.find(
        (section) => section.name === selectedSection
      );
      if (sectionData) {
        setInfoData(sectionData.schedule);
      }
    }
  }, [selectedSection, selectedSpecialty, selectedYear, data]);

  // Handle PDF download
  const downloadHandler = () => {
    generatePDF(infoData, selectedYear, selectedSpecialty, selectedSection);
  };

  const getYearLabel = (year) => {
    switch (year) {
      case 1:
        return "1ère année";
      case 2:
        return "2ème année";
      case 3:
        return "3ème année";
      case 4:
        return "4ème année";
      case 5:
        return "5ème année";
      default:
        return `${year}ème année`;
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col my-[30px]">
            <h1 className="font-[600] text-[40px] text-left">
              Emplois du temps
            </h1>

            {selectedSection !== "" ? (
              selectedSpecialty !== "" && (
                <p className="text-blue-950 text-base font-semibold ">
                  {selectedSpecialty} / {selectedSection}
                </p>
              )
            ) : (
              <p className="text-blue-950 text-base font-semibold ">
                Choisissez une spécialité et une section
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {/* PDF download button */}
            <Button
              className="h-[51px] w-[51px] bg-[#0EB17F] text-white"
              variant={"default"}
              onClick={downloadHandler}
            >
              <Printer height={60} width={60} />
            </Button>
            {/* Year selector */}
            <Select
              onValueChange={(value) => handleYearChange(Number(value))}
              value={selectedYear?.toString() || ""}
            >
              <SelectTrigger className="bg-[#4A58EC] text-white text-center w-[148px] h-[51px] font-semibold text-lg rounded-xl">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Année</SelectLabel>
                  {data.map(({ year }) => (
                    <SelectItem key={year} value={year.toString()}>
                      {getYearLabel(year)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Specialty selector */}
            <Select
              onValueChange={(value) => handleSpecialtyChange(value)}
              value={selectedSpecialty}
              disabled={selectedYear === null}
            >
              <SelectTrigger className="bg-[#4A58EC] text-white w-[148px] h-[51px] font-semibold text-lg rounded-xl">
                <SelectValue placeholder="Specialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Specialty</SelectLabel>
                  {data
                    .find(({ year }) => year === selectedYear)
                    ?.specialities.map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Section selector (dependent on the selection from the specialty selector) */}
            <Select
              onValueChange={(value) => handleSectionChange(value)}
              value={selectedSection}
              disabled={selectedSpecialty === ""}
            >
              <SelectTrigger className="bg-[#4A58EC] text-white w-[148px] h-[51px] font-semibold text-lg rounded-xl">
                <SelectValue placeholder="Section" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Section</SelectLabel>
                  {data
                    .find(({ year }) => year === selectedYear)
                    ?.specialities.find(
                      ({ name }) => name === selectedSpecialty
                    )
                    ?.sections.map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Calendar
            schedule={infoData}
            year={selectedYear}
            specialty={selectedSpecialty}
            section={selectedSection}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default ParentComponent;
