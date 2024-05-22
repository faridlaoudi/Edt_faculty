"use client";

import { FC } from "react";
import { ScheduleEntry } from "@prisma/client";
import Lecture from "./lecture-item";
import TD from "./td-item";
import TP from "./tp-item";
import generatePDF from "@/app/utils/generate-pdf";

const timeSlots = [
  { slot: 1, time: "8h:00 - 9h:30" },
  { slot: 2, time: "9h:40 - 11h:10" },
  { slot: 3, time: "11h:20 - 12h:50" },
  { slot: 4, time: "13h:00 - 14h:30" },
  { slot: 5, time: "14h:40 - 16h:10" },
  { slot: 6, time: "16h:10 - 17h:50" },
];

const className = "border w-[160.774px] max-w-[170.774px] px-1 max-h-24"; // Static height and width

interface CalendarProps {
  schedule: ScheduleEntry[];
  year: number;
  specialty: string;
  section: string;
}

const Calendar: FC<CalendarProps> = ({
  schedule,
  year,
  specialty,
  section,
}) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Samedi",
  ];

  const getScheduleForSlotAndDay = (
    slot: number,
    day: string
  ): ScheduleEntry[] => {
    return schedule.filter(
      (entry) =>
        entry.slot === slot && entry.day.toLowerCase() === day.toLowerCase()
    );
  };

  const renderScheduleEntry = (entry: ScheduleEntry) => {
    switch (entry.sessionType) {
      case "Lecture":
        return <Lecture key={entry.id} {...entry} />;
      case "TD":
        return <TD key={entry.id} {...entry} group={entry.group} />;
      case "TP":
        return <TP key={entry.id} {...entry} group={entry.group} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center flex-col text-[#556476]">
      <div className="max-h-[701px] bg-white">
        <table className="table-auto border-collapse border">
          <thead className="bg-[#FAFAFA]">
            <tr>
              <th className="w-2 rotate-45">
                <span className="text-[8px]">Crenaux</span>
                <hr />
                <span className="text-[8px]">Jours</span>
              </th>
              {timeSlots.map((time) => (
                <th
                  key={time.slot}
                  className={`${className} font-semibold text-[14px] tracking-[0] leading-[normal] border-0`}
                >
                  {time.time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, index) => (
              <tr key={index}>
                <td className="py-10 w-2 text-center min-h-20 bg-[#FAFAFA]">
                  <div className="-rotate-90 font-semibold text-variable-collection-typography-2nd text-[14px]">
                    {day}
                  </div>
                </td>
                {timeSlots.map((time) => (
                  <td
                    key={time.slot}
                    className={`${className} border-dotted overflow-hidden`}
                  >
                    {getScheduleForSlotAndDay(time.slot, day).map(
                      renderScheduleEntry
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
