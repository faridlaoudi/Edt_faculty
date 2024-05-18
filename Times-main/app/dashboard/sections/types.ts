// Annee model
export interface Annee {
    id: string;
    annee: number;
    specialites?: Specialite[];
  }
  
  // Specialite model
  export interface Specialite {
    id: string;
    nom: string;
    anneeId: string;
    annee: Annee;
    sections?: Section[];
  }
  
  // Section model
  export interface Section {
    id: string;
    nom: string;
    specialite: Specialite;
    specialite_name: string;
    specialiteId: string;
    annee: number;
    groupes?: Groupe[];
    modules?: Module[];
    capacite?: number | null;
  }
  
  // Groupe model
  export interface Groupe {
    id: string;
    nom: string;
    section: Section;
    sectionId: string;
  }
  
  // Module model
  export interface Module {
    id: string;
    nom_module: string;
    nb_cours?: number | null;
    td: boolean;
    tp: boolean;
    section: Section;
    sectionId: string;
  }
  