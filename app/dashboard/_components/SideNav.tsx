import React from "react";
import Image from "next/image";
import { FileClock, History, Home, Settings, Wallet, WalletCards } from "lucide-react";

const SideNav = () => {
  const menuList = [
    {
      name: "Home",
      icon:Home,
      path: "/dashboard",
      id:1
    },
    {
      name: "History",
      icon:FileClock,
      path: "/dashboard/history",
      id:2
    },
    {
      name: "Billing",
      icon:WalletCards,
      path: "/dashboard/billing",
      id:3
    },
    {
      name: "Setting",
      icon:Settings,
      path: "/dashboard/setting",
      id:4
    },
  ];

  return (
    <div className="h-screen p-5  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="flex border-b pb-2">
        <Image src={"/logo.svg"} width={100} height={35} alt="logo" />
      </div>

      <div className="mt-8">
            {menuList.map((item) =>(
                  <div className="flex gap-4 p-3 mb-2 items-center cursor-pointer hover:bg-primary hover:text-white hover:rounded-md">
                        
                        <item.icon />
                       
                        <h2>{item.name}</h2>
                  </div>
            ))}
      </div>
    </div>
  );
};

export default SideNav;
