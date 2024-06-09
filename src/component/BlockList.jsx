
import React from 'react' 
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import BlockItems from "./BlockItems"; 
import  { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {  
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user); 
  const [blockList, setBlockList] = useState([]);
  useEffect(() => {
    let arr = [];
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {   
      snapshot.forEach((item) => {
        if(item.val().blockById == user.uid){
          arr.push( {...item.val(), key: item.key} ) 
        }
      });
      setBlockList(arr);     
    });
  }, []);   
    //  console.log(blockList);
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
            { 
              blockList.length > 0 
              ? 
              blockList.map((item) =>(
                <BlockItems key={item.key} data ={item}/>
              ))
              :
              <p className=' text-center'> No blocklist available</p>
            }   
          </div>
        </div>
      );
}

export default BlockList