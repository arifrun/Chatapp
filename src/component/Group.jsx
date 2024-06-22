import { useEffect, useState } from "react";
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import GroupItems from "./GroupItems"; 
import { getDatabase, onValue,  ref} from "firebase/database"; 


const Group = () => {  
  const db = getDatabase();  
  const [groupLIst, setGroupList] = useState([]);
  useEffect(()=>{ 
    const starCountRef = ref(db, 'group/'); 
    let arr = [];
     onValue(starCountRef, (snapshot) => {
        snapshot.forEach((item) =>{ 
            arr.push({...item.val(), key: item.key})
        }) 
        setGroupList(arr);
   });
  },[]); 

  return (
    <div className=" w-1/3 p-4 justify-between bg-white rounded-2xl shadow-lg">
      <Title title="Group" />
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
          groupLIst.map((item) =>( 
            <GroupItems key={item.key} data={item}/>
          ))
        }

      </div>
    </div>
  );
};

export default Group;
