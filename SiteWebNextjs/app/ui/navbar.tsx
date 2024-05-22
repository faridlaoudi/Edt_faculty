"use client";

import React from "react";
import logo from "@/app/assets/image.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import useCurrentTime from "../utils/useCurrentTime"; // import the custom hook

const Navbar = () => {
  const currentTime = useCurrentTime(); // use the custom hook

  // get session data
  const { data: session, status } = useSession();

  return (
    <div className="h-[100px] bg-white flex items-center pr-7 w-screen justify-between overflow-hidden z-50">
      <Image src={logo} alt="logo" height={280} width={280} />
      <span className="text-[#001D74] gap-4 text-[20px] font-[600] hidden lg:block">
        {currentTime}
      </span>
      <div className="flex items-center">
        {status === "authenticated" && (
          <>
            <span className="text-[#001D74] gap-4 text-[20px] font-[600] hidden lg:block">
              {session?.user?.name}
            </span>
            <Avatar className="w-10 h-10 rounded-full ml-4">
              <AvatarFallback className="w-full h-full rounded-full flex items-center justify-center bg-[#4A58EC] text-white font-bold text-sm uppercase">
                {session?.user?.name?.charAt(0)}
                {session?.user?.name?.charAt(1)}
              </AvatarFallback>
            </Avatar>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
