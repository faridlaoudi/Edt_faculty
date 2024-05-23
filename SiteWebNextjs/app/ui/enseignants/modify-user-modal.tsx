"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MultipleSelectorData from "../multiple-select";
import MultipleSelectorModules from "../multiple-select-modules";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modules } from "@/app/utils/modulesList";
import Loading from "../icon/loading";

const daysArray = [
  { label: "Lundi", value: "Lundi" },
  { label: "Mardi", value: "Mardi" },
  { label: "Mercredi", value: "Mercredi" },
  { label: "Jeudi", value: "Jeudi" },
  { label: "Samedi", value: "Samedi" },
  { label: "Dimanche", value: "Dimanche" },
];

const moduleOptions = modules.map((module) => ({
  label: module,
  value: module,
}));

type ModifyEnseignantDialogProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  enseignant: {
    id: string;
    prenom: string;
    nom: string;
    email: string;
    numero_de_telephone: string;
    date_de_naissance: string;
    grade: string;
    availability_prof: string[];
    modules: { nom_module: string; priority: number }[];
    gender: string;
  };
};

const ModifyEnseignantDialog = ({
  isOpen,
  onClose,
  enseignant,
}: ModifyEnseignantDialogProps) => {
  const [enseignantData, setEnseignantData] = useState({
    id: enseignant.id,
    prenom: enseignant.prenom,
    nom: enseignant.nom,
    email: enseignant.email,
    telephone: enseignant.numero_de_telephone,
    date_de_naissance: enseignant.date_de_naissance,
    grade: enseignant.grade,
    availability_prof: enseignant.availability_prof,
    modules: enseignant.modules,
    gender: enseignant.gender,
  });

  const [validationErrors, setValidationErrors] = useState({
    prenom: "",
    nom: "",
    email: "",
    numero_de_telephone: "",
    date_de_naissance: "",
    grade: "",
    availability_prof: "",
    modules: "",
    gender: "",
  });

  const schema = z.object({
    prenom: z.string().nonempty("Prenom is required"),
    nom: z.string().nonempty("Nom is required"),
    email: z.string().email("Invalid email address"),
    telephone: z.string().nonempty("Telephone is required"),
    date_de_naissance: z.string().nonempty("Date de Naissance is required"),
    grade: z.string().nonempty("Grade is required"),
    availability_prof: z
      .array(z.string())
      .nonempty("availability_prof is required"),
    modules: z
      .array(
        z.object({
          nom_module: z.string(),
          priority: z.number(),
        })
      )
      .nonempty("Modules are required"),
    gender: z.enum(["male", "female"]),
  });

  useEffect(() => {
    setEnseignantData({
      id: enseignant.id,
      prenom: enseignant.prenom,
      nom: enseignant.nom,
      email: enseignant.email,
      telephone: enseignant.numero_de_telephone,
      date_de_naissance: enseignant.date_de_naissance,
      grade: enseignant.grade,
      availability_prof: enseignant.availability_prof,
      modules: enseignant.modules,
      gender: enseignant.gender,
    });
  }, [enseignant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnseignantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEnseignantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const daysHandler = (values: any) => {
    setEnseignantData((prevData) => ({
      ...prevData,
      availability_prof: values,
    }));
  };

  const modulesHandler = (values: any) => {
    setEnseignantData((prevData) => ({
      ...prevData,
      modules: values,
    }));
  };

  const [loading, setLoading] = useState(false);

  const updateHandler = async () => {
    console.log("update data", enseignantData);

    try {
      setLoading(true);
      // Validate form data
      const validatedData = schema.parse(enseignantData);
      // Here you can send the validatedData to your backend or perform any other actions
      await fetch("/api/prof", {
        method: "PUT",
        body: JSON.stringify(enseignantData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Clear validation errors
      setValidationErrors({
        prenom: "",
        nom: "",
        email: "",
        numero_de_telephone: "",
        date_de_naissance: "",
        grade: "",
        availability_prof: "",
        modules: [],
        gender: "",
      });
      onClose(false); // Close the dialog on success
      location.reload();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation failed:", error.errors);
        // Handle validation errors
        const fieldErrors: { [key: string]: string } = {}; // Add index signature
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setValidationErrors(fieldErrors as any);
      } else {
        console.error("An unexpected error occurred:", error);
        // Handle other errors
      }
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-[28px] text-[#001D74]">
            Modifier Enseignant
          </DialogTitle>
        </DialogHeader>
        <div className="text-black flex flex-col gap-5 text-left border-b-[1px] border-gray-200">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">Prenom</Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.prenom ? "border-red-500" : "border-gray-200"
                }`}
                name="prenom"
                value={enseignantData.prenom}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">Nom</Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.nom ? "border-red-500" : "border-gray-200"
                }`}
                name="nom"
                value={enseignantData.nom}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">Email</Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.email ? "border-red-500" : "border-gray-200"
                }`}
                name="email"
                value={enseignantData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Numero de telephone
              </Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.numero_de_telephone
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                name="telephone"
                value={enseignantData.telephone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Date de Naissance
              </Label>
              <Input
                min={"1950-01-01"}
                // max today date
                max={new Date().toISOString().split("T")[0]}
                className={`w-full h-[52px] border ${
                  validationErrors.date_de_naissance
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                type="date"
                name="date_de_naissance"
                value={enseignantData.date_de_naissance}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-[50%]">
              {/* replace this  */}
              <Label className="text-[20.051px] font-[400] my-3">Grade</Label>
              <Input
                className={`w-full h-[52px] border   ${
                  validationErrors.grade ? "border-red-500" : "border-gray-200"
                }`}
                name="grade"
                value={enseignantData.grade}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Jours de disponibilité
              </Label>
              <MultipleSelectorData
                options={daysArray}
                initialValues={enseignantData.availability_prof}
                onValuesChange={daysHandler}
                className={`w-full h-[52px] border ${
                  validationErrors.availability_prof
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Modules prioritères
              </Label>
              <MultipleSelectorModules
                options={moduleOptions}
                initialValues={enseignantData.modules}
                onValuesChange={modulesHandler}
                className={`w-full border ${
                  validationErrors.modules
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />
            </div>
          </div>
          <div className="flex justify-between items-end gap-8">
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-2">Gender</Label>
              <Select
                onValueChange={(value) => handleSelectChange("gender", value)}
                value={enseignantData.gender}
              >
                <SelectTrigger
                  className={`w-full h-[52px] border ${
                    validationErrors.gender
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="text-white w-[138px]"
              onClick={updateHandler}
              disabled={loading}
            >
              {loading ? <Loading color="fill-blue-600" /> : "Sauvegarder"}
            </Button>
          </div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyEnseignantDialog;
