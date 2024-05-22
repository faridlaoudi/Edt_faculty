import { ReactNode } from "react";
import Link from "next/link";

interface MenuItemProps {
  item: ItemProps;
  activePath: string;
}

interface ItemProps {
  title: string;
  path: string;
  icon: ReactNode;
}

const MenuItem = ({ item, activePath }: MenuItemProps) => {
  const active = item.path === activePath;
  return (
    <>
      <li className="group">
        <Link
          href={item.path}
          className={`flex w-full items-center  ${
            active &&
            "border-r-[6px] border-[#4A58EC] bg-[#4A58EC] bg-opacity-5 text-[#4A58EC]"
          } ${
            !active && "group-hover:bg-gray-200"
          } transition duration-300 ease-in-out`}
        >
          <span className="flex gap-3 p-2 py-3 pl-[29px]">
            {item.icon}
            <span className="text-[15px]">{item.title}</span>
          </span>
        </Link>
      </li>
    </>
  );
};

interface MenuSectionProps {
  section: sectionProps;
  activePath: string;
}

interface sectionProps {
  title: string;
  list: MenuItemProps["item"][];
}

export const MenuSection = ({ section, activePath }: MenuSectionProps) => (
  <li className="">
    <h3 className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold pl-[29px]">
      {section.title}
    </h3>
    <ul className="flex flex-col md:my-5 relative text-[15px] text-black">
      {section.list.map((item) => (
        <MenuItem key={item.title} item={item} activePath={activePath} />
      ))}
    </ul>
  </li>
);
