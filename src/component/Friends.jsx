import React from "react";
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import FriendItems from "./FriendItems";

const Friends = () => {
  return (
    <div className=" w-1/3 p-4 justify-between bg-white rounded-2xl shadow-lg">
      <Title title="Friends" />
      <div className=" py-2 px-3 border-2 border-slate-400 rounded-lg w-full flex items-center gap-2">
        <GrSearch />
        <input
          type="text"
          className=" w-full outline-none text-lg"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <FriendItems />
        <FriendItems />
        <FriendItems />
        <FriendItems />
      </div>
    </div>
  );
};

export default Friends;