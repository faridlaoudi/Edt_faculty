import { Clock1Icon, MoreHorizontal } from "lucide-react";
import React, { FC } from "react";
import { ScheduleEntry } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Lecture: FC<ScheduleEntry> = ({ moduleName, room, teacher }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="w-full h-16 bg-[#F6F6F8] text-[#0EB17F] flex flex-col gap-1 justify-center p-2 overflow-hidden rounded-lg cursor-pointer">
          <div className="flex justify-between items-center gap-1 truncate font-bold">
            <div className="flex gap-1 items-center">
              <Clock1Icon width={12} />
              <span className="w-20 truncate text-xs">Cour {moduleName}</span>
            </div>
            <MoreHorizontal />
          </div>
          <span className="truncate text-xs">
            {room} - {teacher}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-50">
        <div className="flex flex-col gap-2 p-2">
          <span className="font-bold text-sm">Module: {moduleName}</span>
          <span className="text-sm">Salle: {room}</span>
          <span className="text-sm">Enseignant: {teacher}</span>
          <span className="text-sm">Type: Cour</span>
          {/* Add more details as needed */}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Lecture;
