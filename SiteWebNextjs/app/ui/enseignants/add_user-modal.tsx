"use client";
import React, { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PlusIcon from "../icon/plus-icon";
import MultipleSelectorData from "../multiple-select";
import { modules } from "@/app/utils/modulesList";
import MultipleSelectorModules from "../multiple-select";

const moduleOptions = modules.map((module) => ({
  label: module,
  value: module,
}));

const AddUser = () => {
  const [userData, setUserData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    grade: "",
    disponibilite: [],
    modules: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    grade: "",
    disponibilite: "",
    modules: "",
  });

  const schema = z.object({
    prenom: z.string().nonempty("Prenom is required"),
    nom: z.string().nonempty("Nom is required"),
    email: z.string().email("Invalid email address"),
    telephone: z.string().nonempty("Telephone is required"),
    dateNaissance: z.string().nonempty("Date de Naissance is required"),
    grade: z.string().nonempty("Grade is required"),
    disponibilite: z.array(z.string()).nonempty("Disponibilite is required"),
    modules: z
      .array(
        z.object({
          moduleName: z.string(),
          priority: z.number(),
        })
      )
      .nonempty("Modules are required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addHandler = async () => {
    try {
      // Validate form data
      const validatedData = schema.parse(userData);
      console.log("Add User:", validatedData);
      // Here you can send the validatedData to your backend or perform any other actions
      // await fetch("/api/user", {
      //   method: "POST",
      //   body: JSON.stringify(validatedData),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // Clear validation errors
      setValidationErrors({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        dateNaissance: "",
        grade: "",
        disponibilite: "",
        modules: "",
      });
      // Reset form data
      setUserData({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        dateNaissance: "",
        grade: "",
        disponibilite: [],
        modules: [],
      });
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
  };

  const daysArray = [
    { label: "Lundi", value: "Lundi" },
    { label: "Mardi", value: "Mardi" },
    { label: "Mercredi", value: "Mercredi" },
    { label: "Jeudi", value: "Jeudi" },
    { label: "Samedi", value: "Samedi" },
    { label: "Dimanche", value: "Dimanche" },
  ];

  const daysHandler = (values: any) => {
    setUserData((prevData) => ({
      ...prevData,
      disponibilite: values,
    }));
  };

  const modulesHandler = (values: any) => {
    setUserData((prevData) => ({
      ...prevData,
      modules: values,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex gap-2 px-[15px] py-[22px] max:w-56 text-white bg-[#4A58EC] rounded-[11px]"
        >
          <PlusIcon />
          Ajouter un enseignant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-[28px] text-[#001D74]">
            Ajouter un enseignant
          </DialogTitle>
        </DialogHeader>
        <div className="py-[20px] text-black flex flex-col gap-6 text-left border-b-[1px] border-gray-200">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">Prenom</Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.prenom ? "border-red-500" : "border-gray-200"
                }`}
                name="prenom"
                value={userData.prenom}
                onChange={handleChange}
              />
              {validationErrors.prenom && (
                <span className="text-red-500 text-sm">
                  {validationErrors.prenom}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">Nom</Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.nom ? "border-red-500" : "border-gray-200"
                }`}
                name="nom"
                value={userData.nom}
                onChange={handleChange}
              />
              {validationErrors.nom && (
                <span className="text-red-500 text-sm">
                  {validationErrors.nom}
                </span>
              )}
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
                value={userData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <span className="text-red-500 text-sm">
                  {validationErrors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Numero de telephone
              </Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.telephone
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                name="telephone"
                value={userData.telephone}
                onChange={handleChange}
              />
              {validationErrors.telephone && (
                <span className="text-red-500 text-sm">
                  {validationErrors.telephone}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Date de Naissance
              </Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.dateNaissance
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                name="dateNaissance"
                value={userData.dateNaissance}
                onChange={handleChange}
              />
              {validationErrors.dateNaissance && (
                <span className="text-red-500 text-sm">
                  {validationErrors.dateNaissance}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">Grade</Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.grade ? "border-red-500" : "border-gray-200"
                }`}
                name="grade"
                value={userData.grade}
                onChange={handleChange}
              />
              {validationErrors.grade && (
                <span className="text-red-500 text-sm">
                  {validationErrors.grade}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Jours de disponibilité
              </Label>
              <MultipleSelectorData
                options={daysArray}
                onValuesChange={(values) => daysHandler(values)}
              />
              {validationErrors.disponibilite && (
                <span className="text-red-500 text-sm">
                  {validationErrors.disponibilite}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Modules prioritères
              </Label>
              <MultipleSelectorModules
                options={moduleOptions}
                onValuesChange={(values) => modulesHandler(values)}
              />
              {validationErrors.modules && (
                <span className="text-red-500 text-sm">
                  {validationErrors.modules}
                </span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="text-white" onClick={addHandler}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
