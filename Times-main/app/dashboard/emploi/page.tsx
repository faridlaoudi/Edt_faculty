"use client";
import { useState, useEffect } from "react";
import Calendar from "@/app/ui/calendar";
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

interface Specialty {
  id: string;
  label: string;
  timetable: { slot: number; time: string; info: string }[];
}

interface SectionsData {
  [key: string]: Specialty[];
}

interface YearData {
  year: number;
  specialties: Specialty[];
}
type data = {
  name: string;
  speciality: string;
  annee: number;
  schdule: schdule[];
};

type schdule = {
  slot: number;
  time: string;
  module: string;
  techer: string;
};

const ParentComponent = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [infoData, setInfoData] = useState<
    { slot: number; time: string; info: string }[]
  >([]);

  // Sample data for university specialties
  const specialtiesData: Specialty[] = [
    // Sample data for specialties. You can replace it with actual data.
    { id: "specialty1", label: "Computer Science" },
    { id: "specialty2", label: "Engineering" },
    // Add more specialties as needed
  ];

  // Sample data for sections (dependent on the selection from the specialties)
  const sectionsData: SectionsData = {
    specialty1: [
      // Sample data for sections. You can replace it with actual data.
      {
        id: "section1",
        label: "Section A - Computer Science",
        timetable: [
          { slot: 1, time: "8:00 - 9:30", info: "Info for Slot 1" },
          { slot: 2, time: "9:40 - 11:10", info: "Info for Slot 2" },
          // Add more slots as needed
        ],
      },
      // Add more sections as needed
    ],
    specialty2: [
      // Sample data for sections. You can replace it with actual data.
      {
        id: "section3",
        label: "Section C - Engineering",
        timetable: [
          { slot: 1, time: "9:00 - 10:30", info: "Info for Slot 1" },
          { slot: 2, time: "10:40 - 12:10", info: "Info for Slot 2" },
          // Add more slots as needed
        ],
      },
      // Add more sections as needed
    ],
    // Add more specialties and corresponding sections as needed
  };

  // Sample data for years, each containing specialties
  const yearsData: YearData[] = [
    {
      year: 1,
      specialties: specialtiesData,
    },
    // Add more years as needed
  ];

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
    if (selectedSection) {
      const selectedSectionData = sectionsData[selectedSpecialty]?.find(
        (section: Specialty) => section.id === selectedSection
      );
      if (selectedSectionData) {
        setInfoData(selectedSectionData.timetable);
      }
    }
  }, [selectedSection]);

  return (
    <PageContainer>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex flex-col  my-[30px] ">
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
                Select a Specialty and a Section
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Year selector */}
            <Select
              onValueChange={(value) => handleYearChange(Number(value))}
              value={selectedYear.toString()}
            >
              <SelectTrigger className=" bg-[#4A58EC] text-white text-center w-[148px] h-[51px] font-semibold text-lg">
                <SelectValue placeholder="Select a Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  {yearsData.map(({ year }) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Specialty selector */}
            <Select
              onValueChange={(value) => handleSpecialtyChange(value)}
              value={selectedSpecialty}
            >
              <SelectTrigger className=" bg-[#4A58EC] text-white w-[148px] h-[51px] font-semibold text-lg">
                <SelectValue placeholder="Specialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Specialty</SelectLabel>
                  {yearsData
                    .find(({ year }) => year === selectedYear)
                    ?.specialties.map(({ id, label }) => (
                      <SelectItem key={id} value={id}>
                        {label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Section selector (dependent on the selection from the specialty selector) */}
            <Select
              onValueChange={(value) => handleSectionChange(value)}
              value={selectedSection}
            >
              <SelectTrigger className=" bg-[#4A58EC] text-white w-[148px] h-[51px] font-semibold text-lg">
                <SelectValue placeholder="Section" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Section</SelectLabel>
                  {sectionsData[selectedSpecialty]?.map(({ id, label }) => (
                    <SelectItem key={id} value={id}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Calendar
            info={infoData.map(({ time, info }) => `${time}: ${info}`)}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default ParentComponent;
