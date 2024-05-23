"use client";

import { useAppContext } from "@/app/store/context";
import PageContainer from "@/app/ui/dashboard/page-container";
import Loading from "@/app/ui/icon/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stars } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useState } from "react";

const GenerationPage = () => {
  const [schduleGenerated, setSchduleGenerated] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const id = "schdule-generated";

  const updateHandler = () => {
    fetch("/api/configuration", {
      method: "PUT",
      body: JSON.stringify({ id, value: "true" }),
    });
  };

  useEffect(() => {
    fetch(`/api/configuration`, {
      method: "POST",
      body: JSON.stringify({ id }),
    }).then((response) => {
      response.json().then((data) => {
        setSchduleGenerated(data);
      });
    });
  }, []);

  const {
    teachers_all,
    rooms,
    loadingRooms,
    loadingTeachers,
    loading,
    section: sections,
    amphi,
    sections: nbSection,
    teachers: nbTeacher,
    classValue: nbClass,
  } = useAppContext();

  const nbTotal = nbClass + amphi;

  //  preapare data
  const rooms_requst = rooms.map((room) => ({
    name: room.nom,
    availability: room.disponibilite,
    type: room.type === "cour" ? "Lecture" : room.type,
  }));

  const profs_request = teachers_all.map((teacher) => ({
    name: teacher.nom,
    modules: teacher.modules.map((module: any) => {
      return {
        name: module.nom_module,
        priority: module.priority,
      };
    }),
    availability: teacher.availability_prof,
  }));

  const aneee_request = sections.map((anee) => ({
    year: anee.annee,
    specialite: anee.specialites.map((spec) => ({
      name: spec.nom,
      sections: spec.sections.map((section) => ({
        name: section.nom,
        specialite: section.specialite_name,
        year: section.annee,
        groups: section.groupes.map((group) => group.nom),
        modules: section.modules.map((module) => {
          return {
            name: module.nom_module,
            lectures: module.nb_cours,
            td: module.td,
            tp: module.tp,
          };
        }),
      })),
    })),
  }));

  const [isLoading, setLoading] = useState(false);
  const route = useRouter();

  const data = {
    rooms: rooms_requst,
    teachers: profs_request,
    years: aneee_request,
  };
  const generateHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://mojnx.pythonanywhere.com/generate-schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Assuming `data` is defined and properly structured
        }
      );

      updateHandler();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData = await response.json();

      setFetchedData(fetchedData);

      // Send transformed data to your Next.js API endpoint
      const saveResponse = await fetch("/api/store-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fetchedData }),
      });

      updateHandler();
      location.reload();

      if (!saveResponse.ok) {
        throw new Error(`HTTP error! Status: ${saveResponse.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const sucess_status = (
    <div className="bg-[#E3F8EF] rounded-[13.437px] w-full sm:w-[336.6px] h-[60.1px] flex justify-center items-center text-xl sm:text-[20.993px] text-[#0EB17F] my-6">
      Généré avec succès
    </div>
  );

  const alerte_status = (
    <div className="bg-[#FFF1EF] rounded-[13.437px] w-full sm:w-[336.6px] h-[60.1px] flex justify-center items-center text-xl sm:text-[20.993px] text-[#FD750F] my-6">
      Nécessite régénération
    </div>
  );

  return (
    <PageContainer>
      <h1 className="font-[600] text-[40px] text-left my-[30px] ">
        Génération Emploi du Temps
      </h1>
      <div className="bg-white w-full h-full py-5 px-4 sm:px-8 rounded-lg">
        <h1 className="font-semibold text-2xl sm:text-3xl text-left">
          Paramètres de génération
        </h1>
        <div className="flex flex-col w-full my-6 gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row sm:gap-12 justify-center w-full">
            <div className="w-full sm:w-1/2 flex flex-col gap-4">
              <Label className="text-black text-lg">Nombre de salles</Label>
              <Input type="number" className="py-4" value={nbTotal} disabled />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-4">
              <Label className="text-black text-lg">Nombre de sections</Label>
              <Input
                type="number"
                className="py-4"
                value={nbSection}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-12 justify-center w-full">
            <div className="w-full sm:w-1/2 flex flex-col gap-4">
              <Label className="text-black text-lg">Nombre d’enseignants</Label>
              <Input
                type="number"
                className="py-4"
                value={nbTeacher}
                disabled
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-4">
              <Label className="text-black text-lg">
                Nombre de spécialités
              </Label>
              <Input type="number" className="py-4" value={"149"} disabled />
            </div>
          </div>
        </div>
        <h1 className="font-semibold text-2xl sm:text-3xl text-left">Status</h1>
        <div className="flex gap-36">
          {schduleGenerated &&
            schduleGenerated?.value === "true" &&
            sucess_status}
          {!schduleGenerated?.value && alerte_status}

          {isLoading && (
            <iframe
              src="https://giphy.com/embed/Dg4TxjYikCpiGd7tYs"
              width="10%"
              height="10%"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Button
            variant="default"
            className="bg-[linear-gradient(137deg,_#6C72FF_5.39%,_#484FFF_49.18%,_#8F00FF_87.04%,_#8F00FF_87.04%)] hover:bg-opacity-80 flex gap-1 text-white font-semibold text-lg sm:text-[20px] py-2 px-4 rounded-[13.437px] w-full sm:w-32 h-12"
            onClick={generateHandler}
            disabled={loadingRooms || loadingTeachers || loading || isLoading}
          >
            {isLoading ? (
              <Loading color="fill-[#6C72FF]" />
            ) : (
              <>
                <Stars />
                Générer
              </>
            )}
          </Button>
          <Button
            variant={"default"}
            className="bg-[#0EB17F] text-white font-semibold hover:bg-opacity-80 text-lg sm:text-[18px] py-2 px-4 rounded-[13.437px] w-full sm:w-32 h-12"
          >
            Télécharger
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default GenerationPage;
