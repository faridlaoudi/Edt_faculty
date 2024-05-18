"use client";

import generatePDF from "@/app/utils/generate-pdf";
import React, { use, useEffect } from "react";
import { useState } from "react";

const GenerationPage = async () => {
  const [schduleGenerated, setSchduleGenerated] = useState(null);
  const id = "schdule-generated";

  const updateHandler = async () => {
    await fetch("/api/configuration", {
      method: "PUT",
      body: JSON.stringify({ id, value: "true" }),
    });
  };

  const data = {
    name: "John Doe",
    speciality: "Computer Science",
    annee: 2024,
    schedule: [
      {
        slot: 1,
        time: "08:00 - 10:00",
        module: "Algorithms",
        teacher: "Prof. Smith",
      },
      {
        slot: 2,
        time: "10:00 - 12:00",
        module: "Data Structures",
        teacher: "Dr. Johnson",
      },
    ],
  };

  useEffect(() => {
    fetch(`/api/configuration`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);

        // setSchduleGenerated(data);
      });
    });
  }, []);

  return (
    <div>
      <button onClick={updateHandler}>Genrate</button>
      <button onClick={() => generatePDF(data)}>Download Timetable PDF</button>
    </div>
  );
};

export default GenerationPage;
