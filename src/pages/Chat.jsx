import React from "react";
import ChatList from "../component/ChatList";
import ChatBox from "../component/ChatBox";

const Chat = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="h-full  bg-slate-100 flex flex-col gap-4 p-5">
        <h2 className="title pb-4 border-b">Chats</h2>
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </div>
      <ChatBox />
    </div>
  );
};

export default Chat;
