import { Clock1Icon, MoreHorizontal } from "lucide-react";
import React, { FC } from "react";
import { ScheduleEntry } from "@prisma/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TDProps extends ScheduleEntry {
  group: string;
}

const TD: FC<TDProps> = ({ moduleName, room, teacher, group }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="w-full h-[45px] bg-[#FFF1EF] text-[#FD750F] flex flex-col justify-center p-2 overflow-hidden rounded-lg my-1 cursor-pointer">
          <span className="flex items-center justify-between text-xs truncate font-bold">
            <span className="flex items-center gap-1">
              <Clock1Icon width={12} />
              <span className="w-20 truncate">TD {moduleName}</span>
            </span>
            <MoreHorizontal />
          </span>
          <span className="truncate text-xs">
            {room} - {teacher} - {group}
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-50">
        <div className="flex flex-col gap-2 p-2">
          <span className="font-bold text-sm">Module: {moduleName}</span>
          <span className="text-sm">Room: {room}</span>
          <span className="text-sm">Enseignant: {teacher}</span>
          <span className="text-sm">Group: {group}</span>
          <span className="text-sm">Type: TD</span>
          {/* Add more details as needed */}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TD;
