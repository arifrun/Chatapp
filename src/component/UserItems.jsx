import  { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const UserItems = ({ userData }) => {
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user);
  const [requestList, setRequestList] = useState([]);  
  const[friendList, setFriendList] = useState([]); 
  const [blockList, setBlockList] = useState([]);
  const[realtime, setRealtime] = useState(false); 

  const handelRequest = (key, username) => {
    setRealtime(!realtime);
    set(push(ref(db, "friendRequest/")), {
      senderName: user.displayName,
      senderId: user.uid,
      reciverName: username,
      reciverId: key,
    }); 
  };

  useEffect(() => {
    let arr = [];
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {   
      snapshot.forEach((item) => {
        arr.push(item.val().senderId + item.val().reciverId);  
      });
      setRequestList(arr);  
    });
  }, [realtime]);  

  useEffect(() => {
    let arr = [];
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {   
      snapshot.forEach((item) => {
        arr.push(item.val(). senderId + item.val().reciverId  
        );
      });
      setFriendList(arr);     
    });
  }, [realtime]);   

  useEffect(() => {
    let arr = [];
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {   
      snapshot.forEach((item) => {
        arr.push(item.val().blockById + item.val().blockId);
      });
      setBlockList(arr);     
    });
  }, [realtime]);  
  
  return (
    <div className="flex gap-4 items-center">
      <div className="w-12 rounded-full overflow-hidden">
        <img className="w-full" src={userData?.photoURL} alt="user" />
      </div>
      <div>
        <h2 className=" text-xl font-primary text-primary font-bold">
          {userData?.username}
        </h2>
        <p className="  text-lg font-primary text-secondary font-normal">  
          Need money.....
        </p>
      </div> 
       { 
        requestList.includes(user.uid + userData.key) 
        ? 
        ( 
          <button 
          className=" ml-auto text-brand font-primary text-xl"
        > 
          Cancel Request
        </button> 
        ) 
        : 
        friendList.includes(userData.key + user.uid) || friendList.includes(user.uid + userData.key)
        ?
        <button 
        className=" ml-auto text-brand font-primary text-xl"
      > 
        Friend
      </button> 
       :   
       blockList.includes(userData.key + user.uid) || blockList.includes(user.uid + userData.key) 
       ? 
       <button 
       className=" ml-auto text-brand font-primary text-xl"
     > 
       blocked  
     </button> 
       :
       ( 
        <button
          onClick={() => handelRequest(userData.key, userData.username)}
          className=" ml-auto text-brand font-primary text-xl"
        > 
          Add Request
        </button> 
        )     
       } 
    </div>
  );
};

export default UserItems;
