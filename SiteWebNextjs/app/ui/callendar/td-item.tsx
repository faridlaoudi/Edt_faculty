import { Clock1Icon, MoreHorizontal } from "lucide-react";
import React, { FC } from "react";
import { ScheduleEntry } from "@prisma/client";

interface TDProps extends ScheduleEntry {
  group: string;
}

const TD: FC<TDProps> = ({ moduleName, room, teacher, group }) => {
  return (
    <div className="w-full h-[45px] bg-[#FFF1EF] text-[#FD750F] flex flex-col justify-center p-2 overflow-hidden rounded-lg my-1">
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
  );
};

export default TD;
