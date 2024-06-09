import  { useEffect, useState } from "react";
import Title from "./Title";
import { GrSearch } from "react-icons/gr";
import FriendItems from "./FriendItems"; 
import { getDatabase, onValue, ref} from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {    
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user);
  const [requestList, setRequestList] = useState([]);  
  const[friendList, setFriendList] = useState([]);
  useEffect(() => {
    let arr = [];
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {   
      snapshot.forEach((item) => {  
        if(item.val().senderId == user.uid){ 
          arr.push({ 
            friendID: item.val().reciverId, 
            friendName: item.val().reciverName, 
            friendImg: item.val().reciverProfile,  
            key: item.key
          });
        } else if (item.val().reciverId == user.uid){ 
          arr.push({ 
            friendID: item.val().senderId, 
            friendName: item.val().senderName, 
            friendImg: item.val().senderProfile,  
            key: item.key
          })   
        } 
      });
      setFriendList(arr); 
    });
  }, []); 

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
          { 
           friendList.length > 0 
            ?
            friendList.map((item)=>(
              <FriendItems key={item.key} Data ={item}/>
            )) 
            : 
            <p className=" text-center">No Friend Aailable</p>
          }
      </div>
    </div>
  );
};

export default Friends;