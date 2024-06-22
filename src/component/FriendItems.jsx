import { getDatabase, push, ref, remove, set } from "firebase/database";
import React from "react";
import { useSelector } from "react-redux";

const FriendItems = ({ Data }) => {
  const user = useSelector((state) => state.userSlice.user);
  const db = getDatabase();
  const handelUnfrnd = (key) => {
    remove(ref(db, "friends/" + key));
    window.location.reload();
  };
  const handelBlock = (Data) => {
    set(push(ref(db, "block/")), {
      blockById: user.uid,
      blockByName: user.displayName,
      blockByProfile: user.photoURL,
      blockId: Data.friendID,
      blockName: Data.friendName,
      blockImg: Data.friendImg,
    });
    remove(ref(db, "friends/" + Data.key));
  };

  return (
    <div className="flex gap-4 items-center">
      <div className=" w-12 h-12 rounded-full overflow-hidden">
        <img src={Data?.friendImg} className="w-full" alt="alt" />
      </div>
      <div>
        <h2 className=" text-xl font-primary text-primary font-bold">
          {Data?.friendName}
        </h2>
      </div>
      <div className=" flex flex-col gap-1 ml-auto">
        <button
          onClick={() => handelUnfrnd(Data.key)}
          className=" font-primary text-sm py-1 px-3 bg-brand text-white rounded-lg w-fit"
        >
          Unfriend
        </button> 
        <button
          onClick={() => handelBlock(Data)}
          className=" font-primary text-sm py-1 px-4 bg-red-500 text-white rounded-lg w-fit"
        >
          Block
        </button>
      </div>
    </div>
  );
};

export default FriendItems;
