"use client";
import React from "react";
import PageContainer from "@/app/ui/dashboard/page-container";
import { columns } from "@/app/ui/salles/columns";
import { DataTable } from "@/app/ui/salles/data-table";
import AddRommModal from "@/app/ui/salles/add-room-modal";
import { useRooms } from "@/app/utils/fetchers";

//caluculate the rooms with type amphi (check lower case)

const SallesPage = () => {
  const { rooms, loading } = useRooms();

  const data: any = rooms.map((room: any) => {
    return {
      id: room.id,
      nom_salle: room.nom,
      type_salle: room.type.charAt(0).toUpperCase() + room.type.slice(1),
      capacity: room.capacite,
      disponibilite: room.disponibilite,
    };
  });

  return (
    <>
      <PageContainer>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="font-[600] text-[40px] text-left my-[30px] ">
              Salles
            </h1>
            <AddRommModal />
          </div>

          {
            <DataTable
              columns={columns}
              data={data ? data : []}
              isLoading={loading}
            />
          }
        </div>
      </PageContainer>
    </>
  );
};

export default SallesPage;
