import { cn } from "@/lib/utils";
import React from "react";

const MobileSideBar = ({
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
      title: "Perfumes",
    },
  ];
  return (
    <div className="flex flex-row   w-full  border-0 border-r-2 sticky inset-x-0 top-0 ham-show">
      {menuItems.map((item, key) => {
        return (
          <p
            key={key}
            className={cn(
              "border-0 border-b-2 py-2 w-full flex justify-center items-center h-[3rem] hover:cursor-pointer",

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

export default MobileSideBar;
