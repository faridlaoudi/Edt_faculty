interface Module {
  moduleName: string;
  lectures: number;
  td: boolean;
  tp: boolean;
}

interface Section {
  name: string;
  speciality: string;
  groups: string[];
  modules: {
    modules: Module[];
  }[];
  schedule?: any[];
  capacity?: number;
}

interface Year {
  sections: Section[];
}

interface TeacherModule {
  name: string;
  priority: number;
}

interface Teacher {
  name: string;
  modules: TeacherModule[];
  availability: string[];
}

interface Room {
  name: string;
  availability: string[];
  type: string;
}

interface ApiResponse {
  years: {
    [key: string]: Year;
  };
  teachers: Teacher[];
  rooms: Room[];
}
