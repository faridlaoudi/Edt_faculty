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
import PlusIcon from "@/app/ui/icon/plus-icon";
import MultipleSelectorData from "../multiple-select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddRoomModal = () => {
  const [roomData, setRoomData] = useState({
    nom: "",
    type: "",
    capacite: "",
    disponibilite: [],
  });

  const [validationErrors, setValidationErrors] = useState({
    nom: "",
    type: "",
    capacite: "",
    disponibilite: "",
  });

  const schema = z.object({
    nom: z.string().nonempty(),
    type: z.string().nonempty(),
    capacite: z.string().nonempty(),
    disponibilite: z.array(z.string()).nonempty(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e === "string") {
      setRoomData((prevData) => ({
        ...prevData,
        type: e,
      }));
      return;
    }
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addHandler = () => {
    try {
      // Validate form data
      const validatedData = schema.parse(roomData);
      console.log("Add Room:", validatedData);
      // Here you can send the validatedData to your backend or perform any other actions
      // Clear validation errors
      setValidationErrors({
        nom: "",
        type: "",
        capacite: "",
        disponibilite: "",
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
    setRoomData((prevData) => ({
      ...prevData,
      disponibilite: values,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex gap-2 px-[15px] py-[22px] max:w-56 text-white bg-[#4A58EC] rounded-[11px] "
        >
          <PlusIcon />
          Ajouter une salle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[28px] text-[#001D74]">
            Ajouter une salle
          </DialogTitle>
        </DialogHeader>
        <div className="py-[20px] text-black flex flex-col gap-6 text-left border-b-[1px] border-gray-200">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Nom de la salle
              </Label>
              <div className="relative">
                <Input
                  className={`w-full h-[52px] border ${
                    validationErrors.nom ? "border-red-500" : "border-gray-200"
                  }`}
                  name="nom"
                  value={roomData.nom}
                  onChange={handleChange}
                />
                {/* {validationErrors.nom && (
                  <span className="text-red-500 text-sm absolute bottom-[-18px] left-0">
                    {validationErrors.nom}
                  </span>
                )} */}
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Type de la salle
              </Label>
              <Select
                onValueChange={(e) => handleChange(e as any)}
                value={roomData.type}
              >
                <SelectTrigger
                  className={`w-full h-[52px] border ${
                    validationErrors.type ? "border-red-500" : "border-gray-200"
                  }`}
                >
                  <SelectValue placeholder="Choisir le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types</SelectLabel>
                    <SelectItem value="Cour">Cour</SelectItem>
                    <SelectItem value="TD">TD</SelectItem>
                    <SelectItem value="TP">TP</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* {validationErrors.type && (
                 <span className="text-red-500 text-sm">
                   {validationErrors.type}
                 </span>
              )} */}
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Capacite
              </Label>
              <div className="relative">
                <Input
                  className={`w-full h-[52px] border ${
                    validationErrors.capacite
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  type="number"
                  name="capacite"
                  value={roomData.capacite}
                  onChange={handleChange}
                />
                {/* {validationErrors.capacite && (
                   <span className="text-red-500 text-sm absolute bottom-[-18px] left-0">
                     {validationErrors.capacite}
                   </span>
                )} */}
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Disponibilite
              </Label>
              <MultipleSelectorData
                options={daysArray}
                onValuesChange={(values) => daysHandler(values)}
              />
              {/* {validationErrors.disponibilite && (
                 <span className="text-red-500 text-sm">
                   {validationErrors.disponibilite}
                 </span>
              )} */}
            </div>
          </div>
        </div>
        <DialogFooter className=" ">
          <Button type="submit" className="text-white" onClick={addHandler}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomModal;
