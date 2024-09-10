"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { FileClock, History, Home, Settings, Wallet, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const path = usePathname()

  useEffect(() => {
    console.log(path);
    
  }, [])

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
    <div className="h-screen p-5  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
      <div className="flex border-b pb-2">
        <Image src={"/logo.svg"} width={100} height={35} alt="logo" priority={true}  />
      </div>
    <hr className="my-5 border"/>
      <div className="mt-3">
            {menuList.map((item) =>(
                  <div key={item.id} className={`flex gap-4 p-3 mb-2 items-center cursor-pointer hover:bg-primary hover:text-white hover:rounded-md ${path===item.path && "bg-yellow-400 rounded-lg"}`}>
                        
                        <item.icon className="w-6 h-6"/>
                       
                        <h2 className="text-lg font-medium"><a href={item.path}>{item.name}</a></h2>
                  </div>
            ))}
      </div>
    </div>
  );
};

export default SideNav;
