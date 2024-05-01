import React, { useEffect, useState } from "react";
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import UserItems from "./UserItems";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const People = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    let arr = [];
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (item.key !== user.uid) {
          arr.push({ ...item.val(), key: item.key });
        }

        setUserList(arr); 
        setLoading(false);
      });
    });
  }, []);
  console.log("userList", userList);
  return (
    <div className=" w-1/3 p-4 justify-between bg-white rounded-2xl shadow-lg">
      <Title title="People" />
      <div className=" py-2 px-3 border-2 border-slate-400 rounded-lg w-full flex items-center gap-2">
        <GrSearch />
        <input
          type="text"
          className=" w-full outline-none text-lg"
          placeholder="Search"
        />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {loading ?( 
         <p>Loading...</p>
        ) :(
          userList.map((item) => <UserItems uerData={item} key={item.key} />) 
        )}
      </div>
    </div>
  );
};

export default People;
