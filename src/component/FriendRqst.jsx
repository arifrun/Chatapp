import  { useEffect, useState } from "react"; 
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import FrndReqstItem from "./FrndReqstItem"; 
import { getDatabase, ref,  onValue } from "firebase/database"; 
import { useSelector } from "react-redux";  


const FriendRqst = () => {  
  const user = useSelector((state) => state.userSlice.user); 
  const[requestList, setRequestList] = useState([]); 
  const [userList, setUserList] = useState([]);
  const db = getDatabase(); 
 
  useEffect (()=>{ 
    let arr = [];  
    const starCountRef = ref(db, "friendRequest/"); 
onValue(starCountRef, (snapshot) =>{ 
  snapshot.forEach((item)=>{ 
   if (item.val().reciverId == user.uid)  { 
    arr.push({...item.val(), key: item.key})   
   }
  
  }); 
  setRequestList(arr); 
});
 },[]);   

 
 useEffect(() => {
  const starCountRef = ref(db, "users/");
  let arr = [];
  onValue(starCountRef, (snapshot) => {
    snapshot.forEach((item) => { 
        arr.push({ ...item.val(), key: item.key }); 
        setUserList(arr); 
    }); 
    
  });  
 }, []); 

  return (
    <div className=" w-1/3 p-4 justify-between bg-white rounded-2xl shadow-lg">
      <Title title="FriendRqst" />
      <div className=" py-2 px-3 border-2 border-slate-400 rounded-lg w-full flex items-center gap-2">
        <GrSearch />
        <input
          type="text"
          className=" w-full outline-none text-lg"
          placeholder="Search" 
        />
      </div>

      <div className="flex flex-col gap-5 mt-5">   
       {requestList.map((reqId)=>  

          userList.map((item)=>
            reqId.senderId == item.key && (
            <FrndReqstItem key={item.key} reqList={item} frndReqId ={reqId.key}/>
          ) 
        ) 
      ) 
      } 
      </div>
    </div>
  );
};  

export default FriendRqst; 