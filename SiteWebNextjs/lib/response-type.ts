// types.ts
export interface ScheduleEntry {
  day: string;
  group: string;
  moduleName: string;
  room: string;
  sessionType: string;
  slot: number;
  teacher: string;
  time: string;
}

export interface SpecialitySection {
  name: string;
  schedule: ScheduleEntry[];
}

export interface Speciality {
  name: string;
  sections: SpecialitySection[];
}

export interface AcademicYear {
  year: number;
  specialities: Speciality[];
}
