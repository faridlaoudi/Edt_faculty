import React, { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import MultipleSelectorData from "../multiple-select";

type RoomEditDialogProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  payment: {
    id: string;
    nom_salle: string;
    type_salle: string;
    disponibilite: string[];
    capacity: number;
  };
  updateHandler: (updatedData: any) => void;
};

const daysArray = [
  { label: "Lundi", value: "Lundi" },
  { label: "Mardi", value: "Mardi" },
  { label: "Mercredi", value: "Mercredi" },
  { label: "Jeudi", value: "Jeudi" },
  { label: "Samedi", value: "Samedi" },
  { label: "Dimanche", value: "Dimanche" },
];

const RoomEditDialog = ({
  isOpen,
  onClose,
  payment,
  updateHandler,
}: RoomEditDialogProps) => {
  const [roomData, setRoomData] = useState({
    id: payment.id,
    nom: payment.nom_salle,
    type: payment.type_salle,
    capacite: payment.capacity.toString(),
    disponibilite: payment.disponibilite,
  });

  console.log(roomData);
  

  const [validationErrors, setValidationErrors] = useState({
    nom: "",
    type: "",
    capacite: "",
  });

  const schema = z.object({
    nom: z.string().nonempty(),
    type: z.string().nonempty(),
    capacite: z.string().nonempty(),
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

    // Reset validation error for the current input field when it gains focus again
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFocus = (name: string) => {
    // Reset validation error for the input field when it gains focus again
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const daysHandler = (values: any) => {
    setRoomData((prevData) => ({
      ...prevData,
      disponibilite: values,
    }));
  };

  const handleUpdate = () => {
    console.log("roomData", roomData);

    try {
      // Validate form data
      schema.parse(roomData);
      // Here you can send the validatedData to your backend or perform any other actions
      updateHandler(roomData);
      // Clear validation errors
      setValidationErrors({
        nom: "",
        type: "",
        capacite: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error("Validation failed:", error.errors);
        const fieldErrors: { [key: string]: string } = {}; // Add index signature
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setValidationErrors(fieldErrors as any);
      } else {
        // Handle other errors
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[28px] text-[#001D74]">
            Modifier Salle
          </DialogTitle>
        </DialogHeader>
        <div className="py-[20px] text-black flex flex-col gap-6 text-left border-b-[1px] border-gray-200">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Nom de la salle
              </Label>
              <Input
                className={`w-full h-[52px] border ${
                  validationErrors.nom ? "border-red-500" : "border-gray-200"
                }`}
                name="nom"
                value={roomData.nom}
                onChange={handleChange}
                onFocus={() => handleFocus("nom")}
              />
              {/* {validationErrors.nom && (
                <span className="text-red-500 text-sm">
                  {validationErrors.nom}
                </span>
              )} */}
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
              {/* <Input
                className={`w-full h-[52px] border ${
                  validationErrors.type ? "border-red-500" : "border-gray-200"
                }`}
                name="type"
                value={roomData.type}
                onChange={handleChange}
                onFocus={() => handleFocus("nom")}
              /> */}
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
                onFocus={() => handleFocus("nom")}
              />
              {/* {validationErrors.capacite && (
                <span className="text-red-500 text-sm">
                  {validationErrors.capacite}
                </span>
              )} */}
            </div>
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">
                Disponibilite
              </Label>

              <MultipleSelectorData
                options={daysArray}
                initialValues={roomData.disponibilite} 
                onValuesChange={(values) => daysHandler(values)}
                className={"w-full"}
              />

              {/* {validationErrors.disponibilite && (
                 <span className="text-red-500 text-sm">
                   {validationErrors.disponibilite}
                 </span>
              )} */}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button type="submit" className="text-white" onClick={handleUpdate}>
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomEditDialog;