import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";

const ChatBox = () => {
  const db = getDatabase();
  const user = useSelector((state) => state.userSlice.user);
  const friend = useSelector(
    (action) => action.currentChatFriendInfo.FriendInfo
  );
  const [chat, setChat] = useState("");
  const [reciveMessage, setRecivMessage] = useState([]);
  const [realTime, setRealtime] = useState(false);
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const handelSend = () => {
    if (!chat) {
      console.log("please enter your message");
    } else {
      set(push(ref(db, "singalechat")), {
        senderID: user.uid,
        measage: chat,
        reciverId: friend.friendID,
        time: formatAMPM(new Date()),
      }).then(() => {
        setChat("");
        setRealtime(!realTime);
      });
    }
  };
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "singalechat"), (habijabishot) => {
      habijabishot.forEach((item) => {
        if (
          item.val().senderID == user.uid &&
          item.val().reciverId == friend.friendID
        ) {
          arr.push({ ...item.val(), key: item.key });
        } else if (
          item.val().reciverId == user.uid &&
          item.val().senderID == friend.friendID
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });

      setRecivMessage(arr);
    });
  }, [friend, realTime]);  
      const handelKey = (e) => {
         if(e.code == 'Enter'){ 
          handelSend();
         }
      }
  return (
    <div className="chatbox w-3/5 mx-8 mt-8 pb-4 ">
      <div className="flex p-3 gap-4 items-center cursor-pointer border-b">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={friend?.friendImg} className=" w-full" alt="user" />
        </div>
        <div>
          <h2 className=" text-xl font-primary text-white font-bold">
            {friend?.friendName}
          </h2>
        </div>
      </div>
      <div className=" h-full px-4 overflow-y-scroll">
        {/* sender box */}
        {reciveMessage.map((item) =>
          item.senderID == user.uid ? (
            <div key={item.key} className=" flex flex-col items-end my-2">
              <div className="max-w-[60%] w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
                <p>{item.measage}</p>
              </div>
              <p className=" text-white">{item?.time}</p>
            </div>
          ) : (
            <div key={item.key} className="flex flex-col items-start my-2">
              <div
                className=" max-w-[60%] w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary"
              >
                <p>{item.measage}</p>
              </div>   
                 <p className=" text-white">{item?.time}</p>
            </div>
          )
        )}
      </div>
      <div className="sender-area">
        <div className="input-place w-full mr-3 flex justify-between">
          <input 
            onKeyPress= {handelKey}
            onChange={(e) => setChat(e.target.value)}
            placeholder="Send a message."
            className="send-input w-full"
            type="text"
            value={chat}
          />
          <button onClick={handelSend} className="send">
            <IoMdSend className=" text-white" />
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ChatBox;
