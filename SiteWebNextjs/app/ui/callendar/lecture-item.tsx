import { Clock1Icon, MoreHorizontal } from "lucide-react";
import React, { FC } from "react";
import { ScheduleEntry } from "@prisma/client";

const Lecture: FC<ScheduleEntry> = ({ moduleName, room, teacher }) => {
  return (
    <div className="w-full h-16 bg-[#F6F6F8] text-[#0EB17F] flex flex-col gap-1 justify-center p-2 overflow-hidden rounded-lg">
      <span className="flex justify-between items-center gap-1 truncate font-bold">
        <span className="flex gap-1 items-center">
          <Clock1Icon width={12} />
          <span className="w-20 truncate text-xs">Cour {moduleName}</span>
        </span>
        <MoreHorizontal />
      </span>
      <span className="truncate text-xs">{room} - {teacher}</span>
    </div>
  );
};

export default Lecture;
