import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";

const ChatBox = () => {
  const friend = useSelector((action) => action.currentChatFriendInfo.FriendInfo);
   const [chat, setShowset] = useState("") 
   console.log(chat);
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
        <div className=" my-2 max-w-[60%] w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 max-w-[60%] w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* sender box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        {/* reciver box */}
        <div className=" my-2 max-w-[60%] w-fit py-2 px-3 rounded-xl rounded-bl-sm bg-white text-primary">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            consequuntur eaque soluta accusamus labore molestias ullam eveniet
            natus ab praesentium doloremque, porro libero tenetur delectus sed
            optio, amet ea perspiciatis deleniti beatae suscipit molestiae
            omnis. Ullam itaque dolor doloribus aspernatur vitae ducimus
            deleniti repudiandae hic quisquam beatae iusto, dignissimos eveniet?
          </p>
        </div>   
             {/* sender box */}
             <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div> 
             {/* sender box */}
             <div className=" my-2 w-fit py-2 px-3 rounded-xl rounded-br-sm bg-white text-primary ml-auto">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="sender-area">
        <div className="input-place w-full mr-3 flex justify-between">
          <input 
            onChange={(e) =>setShowset(e.target.value)}
            placeholder="Send a message."
            className="send-input w-full"
            type="text"
          />
          <div className="send">
            <IoMdSend className=" text-white" />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ChatBox;
