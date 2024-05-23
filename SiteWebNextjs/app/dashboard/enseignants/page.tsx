"use client";
import PageContainer from "@/app/ui/dashboard/page-container";
import React from "react";
import { Teacher, columns } from "@/app/ui/enseignants/columns";
import { DataTable } from "@/app/ui/enseignants/data-table";
import AddUser from "@/app/ui/enseignants/add_user-modal";
import { useenseignant } from "@/app/utils/fetchers";
import { useAppContext } from "@/app/store/context";

const EnseignantsPage = () => {
  const { enseignant, loading } = useenseignant();

  const data: Teacher[] = enseignant.map((enseignant: Teacher) => {
    return {
      id: enseignant.id,
      nom: `${enseignant.nom}`,
      email: enseignant.email,
      date_de_naissance: new Date(enseignant.date_de_naissance)
        .toISOString()
        .split("T")[0],
      gender: enseignant.gender,
      availability_prof: enseignant.availability_prof,
      numero_de_telephone: enseignant.numero_de_telephone,
      prenom: enseignant.prenom,
      phone: enseignant.numero_de_telephone,
      modules: enseignant.modules,
      grade: enseignant.grade,
    };
  });

  return (
    <PageContainer>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-[600] text-[40px] text-left my-[30px] ">
            Enseignants
          </h1>
          <AddUser />
        </div>

        <DataTable columns={columns} data={data} isLoading={loading} />
      </div>
    </PageContainer>
  );
};

export default EnseignantsPage;
