import PageContainer from "./dashboard/page-container";

const timeSlots = [
  { slot: 1, time: "8h:00 - 9h:30" },
  { slot: 2, time: "9h:40 - 9h:30" },
  { slot: 3, time: "11h:20 - 12h:50" },
  { slot: 4, time: "13h:00 - 14h:30" },
  { slot: 5, time: "14h:40 - 16h:10" },
  { slot: 6, time: "16h:10 - 17h:50" },
];

const className = "border min-w-36 py-5 px-3 w-28";

type response = {
  sections: section[];
};

type section = {
  section_name: string;
  specialite: string;
  annee: number;
  schedules: schedule[];
};

type schedule = {
  day: string;
  group?: string;
  moduleName: string;
  room: string;
  teacher: string;
  time: string;
  slot: number;
  session_type: string;
};

const Calendar = ({ info }) => {
  return (
    <PageContainer>
      <div className="flex justify-center items-center text-[#556476]">
        <div className="overflow-x-auto max-h-[701] bg-white">
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
              {[
                "Dimanche",
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Samedi",
              ].map((day, index) => (
                <tr key={index}>
                  <td className="py-10 w-2 text-center min-h-20 bg-[#FAFAFA]">
                    <div className="-rotate-90 font-semibold text-variable-collection-typography-2nd text-[14px]">
                      {day}
                    </div>
                  </td>
                  {timeSlots.map((time) => (
                    <td
                      key={time.slot}
                      className={`${className} min-h-20  border-dotted`}
                    >
                      {/* Render info data for each cell */}
                      {info.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="mt-2 flex justify-center items-center "
                          >
                            {item}
                          </div>
                        );
                      })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
};

export default Calendar;
