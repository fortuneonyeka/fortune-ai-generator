import { SearchIcon } from "lucide-react";
import React from "react";

const SearchSection = ({onSearchInput}:any) => {
  return (
    <div
      className="p-10 bg-gradient-to-br from-blue-500 via-blue-700 to bg-purple-600
    flex justify-center flex-col items-center rounded-md w-full"
    >
      <h2 className="text-3xl font-bold text-white">
        Check out all our templates
      </h2>
      <p className="font-semibold">Let's be creative today!</p>

      <div className="py-2 w-full flex justify-center items-center">
        <div className="flex items-center gap-2 p-2 border-2 border-black rounded-md w-[50%]">
          <SearchIcon className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) =>onSearchInput(e.target.value)}
            className="outline-none bg-black text-white rounded-md p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
