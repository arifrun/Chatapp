import React from "react";
import { IoMdSend } from "react-icons/io";

const ChatBox = () => {
  return (
    <div className="chatbox w-full mx-6 mt-6 ">
      <div className="flex p-3 gap-4 items-center cursor-pointer border-b">
        <div>
          <img src="/user.png" alt="user" />
        </div>
        <div>
          <h2 className=" text-xl font-primary text-white font-bold">
            Eddie Lake
          </h2>
        </div>
      </div>
      <div className="messages-area">
        <div className="message"></div>
        <div className="message"></div>
        <div className="message"></div>
        <div className="message"></div>
      </div>
      <div className="sender-area">
        <div className="input-place w-full mr-3 flex justify-between">
          <input
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
