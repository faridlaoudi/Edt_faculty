"use client";
import React from "react";
import { Annee, Specialite, Section } from "./types"; // Importing the types
import { useSection } from "@/app/utils/fetchers";
import PageContainer from "@/app/ui/dashboard/page-container";
import { DataTable } from "@/app/ui/sections/data-table";
import { columns } from "@/app/ui/sections/columns";

const SectionsPage = () => {
  const { section, loading } = useSection();

  const allSections: Section[] = [];

  section.forEach((annee: Annee) => {
    if (annee.specialites) {
      annee.specialites.forEach((specialite: Specialite) => {
        if (specialite.sections) {
          allSections.push(...specialite.sections);
        }
      });
    }
  });

  type ExtractedData = {
    name: string;
    year: string;
    speciality: string;
    groups: string[];
    schedule: any[];
    capacity: number;
    modules: number;
  };

  const extractedData: ExtractedData[] = allSections.map((section: Section) => {
    return {
      name: section.nom,
      year: formatYear(section.annee),
      speciality: section.specialite_name,
      groups: (section.groupes ?? []).map((groupe) => groupe.nom),
      schedule: [],
      capacity: 100,
      modules: section.modules?.length || 0, // Add a default value for undefined modules
    };
  });

  console.log(extractedData);

  // Function to format the year based on the numeric value
  function formatYear(year: number): string {
    switch (year) {
      case 1:
        return "1ere annee";
      case 2:
        return "2eme annee";
      case 3:
        return "3eme annee";
      case 4:
        return "4eme annee";
      case 5:
        return "5eme annee";
      default:
        return `${year}eme annee`; // fallback for other years
    }
  }

  console.log(loading);

  return (
    <>
      <PageContainer>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-[600] text-[40px] text-left my-[30px] ">
              Sections
            </h1>
          </div>

          {
            <DataTable
              columns={columns}
              data={extractedData}
              isLoading={loading}
            />
          }
        </div>
      </PageContainer>
    </>
  );
};

export default SectionsPage;
