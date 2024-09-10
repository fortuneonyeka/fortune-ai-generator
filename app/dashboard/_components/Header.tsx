import { SearchIcon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center bg-white">
      <div className="flex gap-3 border item-center p-2 rounded-lg max-w-lg">
        <SearchIcon />
        <input type="text" placeholder="search..." className="outline-none"/>
      </div>
      <div>
        <h2 className="bg-primary p-2 rounded-full text-xs text-white px-3 cursor-pointer">🔥 Join for $10/Month</h2>
      </div>
    </div>
  );
};

export default Header;
