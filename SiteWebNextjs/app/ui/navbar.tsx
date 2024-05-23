"use client";

import React from "react";
import logo from "@/app/assets/image.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import useCurrentTime from "../utils/useCurrentTime"; // import the custom hook
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const currentTime = useCurrentTime(); // use the custom hook

  // get session data
  const { data: session, status } = useSession();

  console.log("session", session);

  return (
    <div className="h-[100px] bg-white flex items-center pr-7 w-screen justify-between overflow-hidden z-50">
      <Image src={logo} alt="logo" height={280} width={280} />
      <span className="text-[#001D74] gap-4 text-[20px] font-[600] hidden lg:block">
        {currentTime}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex items-center">
            {status === "authenticated" && (
              <div className="flex gap-2 items-center bg-[#F2F5FD] rounded-full pr-4 text-[#556476]">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarFallback className="w-full h-full rounded-full flex items-center justify-center bg-[#4A58EC] text-white font-bold text-sm uppercase">
                    {session?.user?.name?.includes(" ") ? (
                      <span>
                        {session?.user?.name?.split(" ")[0].charAt(0)}
                        {session?.user?.name?.split(" ")[1].charAt(0)}
                      </span>
                    ) : (
                      <span>
                        {session?.user?.name?.charAt(0)}
                        {session?.user?.name?.charAt(1)}
                      </span>
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[#556476] gap-4 text-[17px] font-[600] hidden lg:block">
                  {session?.user?.name}
                </span>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-md shadow-lg p-2 mt-2">
          <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
          <DropdownMenuItem
            className="hover:bg-gray-100 p-2 rounded-md flex items-center gap-2 text-red-500 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
