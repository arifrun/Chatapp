import { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io"; 
import { MdCancel } from "react-icons/md"; 
import FriendItems from "./FriendItems";  
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux"; 


const GroupItems = ({ data, MyGroup }) => { 
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user); 
  const[friendList, setFriendList] = useState([]);
  const [show, setShow] = useState(false);
  const handelClick = () => {
    if (MyGroup) {
      setShow(true);
    }
  }; 
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

   const handelAdd = (data, friend) =>{ 
     set(push(ref(db, "members" + data.key)),{ 
         groupName: data.groupName, 
         groupId: data.key,
         createBy: data.createBy, 
         createdById: data.createdById, 
         number: "dffdfd", 
         memberNmae: friend.friendName, 
         meemberId: friend.key, 
         memberProfile: friend.friendImg,
     });
   };

  return (
    <div>  
       { 
        show 
        && 
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] rounded-2xl flex justify-center items-center">
        <div className=" bg-white text-primary px-5 py-4 rounded-xl">
          <button
            className=" flex ml-auto text-2xl text-red-500"
            onClick={()=>setShow(false)}
          >
            <MdCancel />
          </button>
          <p className="title border-b pb-1 mb-2">Add Friends</p> 
          { 
           friendList.length > 0 
            ?
            friendList.map((item)=>(
              <div key={item} className="flex gap-4 items-center">
       <div className=" w-12 h-12 rounded-full overflow-hidden">
        <img src={item?.friendImg} className="w-full" alt="alt" />
      </div>
      <div>
        <h2 className=" text-xl font-primary text-primary font-bold">
          {item?.friendName}
        </h2>
      </div>
        <button onClick={() =>handelAdd(data, item)} className=" py-1 px-4 bg- bg-sky-500 text-white rounded-xl"> 
           Add
        </button>
      </div>
            )) 
            : 
            <p className=" text-center">No Friend Aailable</p>
          }
        </div>
      </div> 
       }
     
      <div className="flex gap-4 items-center">
        <div>
          <img src=" /user.png" alt="user" />
        </div>
        <div>
          <h2 className=" text-xl font-primary text-primary font-bold">
            {data?.groupName}{" "}
          </h2>
          <p className="  text-lg font-primary text-secondary font-normal">
            Admin: {data?.createBy}
          </p>
        </div>
        <p onClick={handelClick} className="ml-auto text-lg cursor-pointer">
          <IoMdMore />
        </p>
      </div>
    </div>
  );
};

export default GroupItems;
