
import React from 'react' 
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import BlockItems from "./BlockItems";

const BlockList = () => {
    return (
        <div className=" w-1/3 p-4 justify-between bg-white rounded-2xl shadow-lg">
          <Title title="BlockList" />
          <div className=" py-2 px-3 border-2 border-slate-400 rounded-lg w-full flex items-center gap-2">
            <GrSearch />
            <input
              type="text"
              className=" w-full outline-none text-lg"
              placeholder="Search"
            />
          </div>
    
          <div className="flex flex-col gap-5 mt-5">   
            <BlockItems />
            <BlockItems />
            <BlockItems />
            <BlockItems />
          </div>
        </div>
      );
}

export default BlockList