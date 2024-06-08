import { cn } from "@/lib/utils";
import React from "react";

const SideBar = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const menuItems = [
    {
      title: "Orders",
    },
    {
      title: "Products",
    },
  ];
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] w-[10rem] sm:w-[17rem] border-0 border-r-2 nav-hidden">
      {menuItems.map((item) => {
        return (
          <p
            className={cn(
              "border-0 border-b-2 py-2 w-full flex justify-center items-center h-[4rem] hover:cursor-pointer",
              {
                "bg-zinc-700": selectedItem === item.title,
              }
            )}
            onClick={() => {
              setSelectedItem(item.title);
            }}
          >
            {item?.title}
          </p>
        );
      })}
    </div>
  );
};

export default SideBar;
