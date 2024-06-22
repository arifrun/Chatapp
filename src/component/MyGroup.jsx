import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import GroupItems from "./GroupItems";
import { FaPen } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => { 
  const db = getDatabase(); 
  const user = useSelector((state) => state.userSlice.user); 
  const [show, setShow] = useState(false);
  const [gropuName, setGroupName] = useState("");
  const [nameError, setNameError] = useState(""); 
  const [groupLIst, setGroupList] = useState([]);

  const handelCreate = () => {
    if (!gropuName) {
      setNameError("Enter a group!");
    } else {
      set(push(ref(db, "group/")), {
        groupName : gropuName, 
        createBy: user.displayName, 
        createdById: user.uid,
      }).then(()=>{
        setShow(false); 
        setGroupName(""); 
        setNameError("");
      })
    }
  }; 

  const handelClose = () => { 
    setShow(false); 
    setGroupName(""); 
    setNameError("");
  }   

  useEffect(()=>{ 
    const starCountRef = ref(db, 'group/'); 
    let arr = [];
     onValue(starCountRef, (snapshot) => {
        snapshot.forEach((item) =>{ 
          if( item.val().createdById== user.uid){ 
            arr.push({...item.val(), key: item.key})
          }  
        }) 
        setGroupList(arr);
   });
  },[]); 
    
  return (
    <div className=" w-1/3 p-4 justify-between bg-white rounded-2xl shadow-lg relative">
      <div className=" flex justify-between pb-4">
        <h2 className="title">My Group</h2>
        <button onClick={() => setShow(true)}>
          <FaPen className=" text-lg" />
        </button>
      </div>
      <div className=" py-2 px-3 border-2 border-slate-400 rounded-lg w-full flex items-center gap-2">
        <GrSearch />
        <input
          type="text"
          className=" w-full outline-none text-lg"
          placeholder="Search"
        />
      </div>
      {show && (
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] rounded-2xl flex justify-center items-center">
          <div className=" bg-white text-primary px-5 py-4 rounded-xl">
            <button
              className=" flex ml-auto text-2xl text-red-500"
              onClick={handelClose}
            >
              <MdCancel />
            </button>
            <p className="title border-b pb-1 mb-2">Create New Group</p>
            <input 
              onChange={(e)=>setGroupName(e.target.value)}
              type="text"
              placeholder="Group Name"
              className="border px-2 py-2 rounded-xl block"
            />
            <p className=" text-red-600">{nameError}</p>
            <button
              onClick={handelCreate}
              className=" px-5 py-2 bg- bg-sky-500 text-white font-semibold rounded-xl mt-3"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-5 mt-5"> 
        { 
          groupLIst.map((item) =>( 
            <GroupItems key={item.key} data ={item} MyGroup ={true}/>
          ))
        }

      </div>
    </div>
  );
};

export default MyGroup;
