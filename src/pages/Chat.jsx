import  { useEffect, useState } from "react";
import ChatList from "../component/ChatList";
import ChatBox from "../component/ChatBox"; 
import { getDatabase, onValue, ref} from "firebase/database";
import { useSelector } from "react-redux";

const Chat = () => {  
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user); 
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
    <div className="flex h-screen w-full">
      <div className="h-full  bg-slate-100 flex flex-col gap-4 p-5 w-2/5">
        <h2 className="title pb-4 border-b">Inbox</h2>
        { 
           friendList.length > 0 
            ?
            friendList.map((item)=>(
              <ChatList key={item.key} Data ={item}/> 
            )) 
            : 
            <p className=" text-center">No Friend Aailable</p>
          }
      </div>
      <ChatBox />
    </div>
  );
};

export default Chat;
