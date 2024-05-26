import React from 'react'
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux'; 


const UserItems = ({userData}) => {   
    //  console.log(userData);   
  const db = getDatabase(); 
  const user = useSelector((state) => state.userSlice.user);   

    const handelRequest =(key, username)=>{   
      // console.log(key);  
      set(push(ref(db, "friendRequest/")), {     
       senderName: user.displayName,
       senderId: user.uid,  
       reciverName : username,  
       reciverId: key,
      }) 
    }  

  return (
    <div className='flex gap-4 items-center'>  
        <div className='w-12 rounded-full overflow-hidden'> 
            <img className ="w-full" src= {userData?.photoURL} alt="user" />
        </div> 
        <div> 
            <h2 className=' text-xl font-primary text-primary font-bold'> 
            {userData?.username}</h2> 
             <p className='  text-lg font-primary text-secondary font-normal'>Need money.....</p>    
        </div>  
        <button onClick={() =>handelRequest(userData.key, userData.username )} className=' ml-auto text-brand font-primary text-xl'> Add Request </button>                           
    </div>      
  )
}

export default UserItems