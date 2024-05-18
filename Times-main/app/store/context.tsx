"use client";
import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { useRooms, useSection, useenseignant } from "../utils/fetchers";
import { Annee, Section, Specialite } from "@prisma/client";

// Define the shape of your context data
interface AppContextData {
  sections: number;
  teachers: number;
  amphi: number;
  classValue: number;
  randomTeachers: any[];
  updateAmphi: (value: number) => void;
  updateClassValue: (value: number) => void;
}

// Create a new context instance
const AppContext = createContext<AppContextData | undefined>(undefined);

// Create a custom hook to access the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

// Utility function to shuffle an array and select the first 4 items
const getRandomTeachers = (teachers: any[]) => {
  const shuffled = [...teachers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};

// Create a provider component to wrap your app with
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { enseignant: teachers_all, loading: loadingTeachers } =
    useenseignant();
  const { rooms, loading: loadingRooms } = useRooms();
  const { section, loading } = useSection();

  const [amphi, setAmphi] = useState(0);
  const [classValue, setClassValue] = useState(0);
  const [sections, setSections] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [randomTeachers, setRandomTeachers] = useState<any[]>([]);

  useEffect(() => {
    const amphitheaters: number = rooms.filter((room: any) =>
      room.nom.toLowerCase().includes("amphi")
    ).length;

    const classrooms: number = rooms.filter(
      (room: any) =>
        room.type.toLowerCase() === "td" || room.type.toLowerCase() === "tp"
    ).length;

    setAmphi(amphitheaters);
    setClassValue(classrooms);
  }, [rooms]);

  useEffect(() => {
    setTeachers(teachers_all.length);
    setRandomTeachers(getRandomTeachers(teachers_all)); // Generate random list of 4 teachers
  }, [teachers_all]);

  const updateAmphi = (newAmphi: number) => {
    setAmphi(newAmphi);
  };

  const updateClassValue = (newClassValue: number) => {
    setClassValue(newClassValue);
  };

  useEffect(() => {
    const allSections: Section[] = [];

    section.forEach((annee: Annee & { specialites?: Specialite[] }) => {
      if (annee.specialites) {
        annee.specialites.forEach(
          (specialite: Specialite & { sections?: Section[] }) => {
            if (specialite.sections) {
              allSections.push(...specialite.sections);
            }
          }
        );
      }
    });

    setSections(allSections.length);
  }, [section]);

  return (
    <AppContext.Provider
      value={{
        amphi,
        classValue,
        updateAmphi,
        updateClassValue,
        sections,
        teachers,
        randomTeachers, // Add randomTeachers to the context value
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
