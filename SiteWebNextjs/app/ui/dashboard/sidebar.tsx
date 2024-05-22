"use client";

import React, { useState } from "react";
import { MdWork } from "react-icons/md";

import DashboardIcon from "../icon/dashboard";
import TeacherIcon from "../icon/teacher";

import { MenuSection } from "./sidebar-server"; // Import server component

import { XIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import SalleIcon from "../icon/salle-icon";
import SectionIcon from "../icon/section-icon";
import EmploiIcon from "../icon/emploi-icon";
import GenerationIcon from "../icon/generation-icon";
const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: "Menu",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <DashboardIcon />,
        },
        {
          title: "Enseignants",
          path: "/dashboard/enseignants",
          icon: <TeacherIcon />,
        },
        {
          title: "Salles",
          path: "/dashboard/salles",
          icon: <SalleIcon />,
        },
        {
          title: "Sections",
          path: "/dashboard/sections",
          icon: <SectionIcon />,
        },
      ],
    },
    {
      title: "Emplois du temps",
      list: [
        {
          title: "Generation des Emplois",
          path: "/dashboard/emploi-generation",
          icon: <EmploiIcon />,
        },
        {
          title: "Annees Universitaires",
          path: "/dashboard/emploi",
          icon: <GenerationIcon />,
        },
      ],
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between">
      <div className=" flex flex-col justify-between bg-white  md:max-w-209 h-screen  relative shadow-r-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div
          className={`w-80 space-y-6 absolute inset-y-0 left-0 transform  rounded-lg ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition duration-200 ease-in-out mt-10  bg-inherit z-10`}
        >
          <nav>
            <ul className="w-full">
              {menuItems.map((section) => (
                <MenuSection
                  key={section.title}
                  section={section}
                  activePath={pathname}
                />
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex-1 block md:hidden">
          <div className="shadow py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 focus:outline-none md:hidden"
              >
                {isSidebarOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>{" "}
        
      </div>
    </div>
  );
};

export default SideBar;
