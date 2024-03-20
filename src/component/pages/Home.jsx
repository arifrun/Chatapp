import React from 'react'
import MyGroup from '../MyGroup'
import Group from '../Group'
import Friends from '../Friends' 
import FriendRqst from '../FriendRqst'
import BlockList from '../BlockList'
import People from '../People'




const Home = () => { 

  return (
    <div className=' bg-slate-100 w-full py-12 px-6'> 
    <div className='flex gap-6 '> 
    <MyGroup/>  
    <Group/> 
    <Friends/>
    </div>   

    <div className='flex gap-6  mt-8'> 
      <People/>
      <FriendRqst/> 
      <BlockList/>
    </div>    
    
    </div>
  );
};

export default Home; 