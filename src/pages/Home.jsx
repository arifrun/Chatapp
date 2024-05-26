import Friends from "../component/Friends";
import Group from "../component/Group";
import MyGroup from "../component/MyGroup";
import People from "../component/People"; 
import FriendRqst from "../component/FriendRqst"; 
import BlockList from "../component/BlockList";

const Home = () => {  
  // const userFromLocal = JSON.parse(localStorage.getItem("user"))   
  // console.log("userFromLocal====>",userFromLocal);
  return (
    <div className=" bg-slate-100 w-full py-12 px-6">
      <div className="flex gap-6 ">
       <MyGroup/>  
       <Group/>   
       <Friends/> 
      </div>

      <div className="flex gap-6  mt-8">
        <People />
        <FriendRqst />
        <BlockList />
      </div>
    </div>
  );
};

export default Home;
