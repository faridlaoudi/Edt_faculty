import React from "react";
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

const AddUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex gap-2 px-[15px] py-[22px] max:w-56  text-white bg-[#4A58EC] rounded-[11px]"
        >
          <PlusIcon />
          Ajouter une enseignants
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-[28px] text-[#001D74]">
            Ajouter un enseignant
          </DialogTitle>
        </DialogHeader>
        <div className="py-[20px] text-black flex flex-col gap-6 text-left border-b-[1px] border-gray-200">
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">Prenom</Label>
              <Input className="w-full h-[52px]" />
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">Nom</Label>
              <Input className="w-full h-[52px]" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%] text-left">
              <Label className="text-[20.051px] font-[400] my-3">Email</Label>
              <Input className="w-full h-[52px]" />
            </div>
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">
                Numero de telephone
              </Label>
              <Input className="w-full h-[52px]" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col w-[50%]">
              <Label className="text-[20.051px] font-[400] my-3">Grade</Label>
              <Input className="w-full h-[52px]" />
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="flex flex-col w-[50%]">
                <Label className="text-[20.051px] font-[400] my-3">
                  Date de Naissance
                </Label>
                <Input className="w-full h-[52px]" />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="text-white ">
            Sauvegarder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
