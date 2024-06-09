import { getDatabase, ref, remove } from 'firebase/database';
import React from 'react'

const BlockItems = ({data}) => { 
    // console.log(data); 
    const db = getDatabase();
    const handelUnblock = (key) =>{ 
        remove (ref(db, "block/" + key));  
    }
    return (
        <div className='flex gap-4 items-center'> 
            <div className=' w-12 h-12 rounded-full overflow-hidden'> 
                <img src={data.blockImg} className=' w-full' alt="user" />
            </div> 
            <div> 
        <h2 className=' text-xl font-primary text-primary font-bold'> 
            {data.blockName}         
              </h2>   
            </div>  
            <button onClick={()=>handelUnblock(data.key)} className=' ml-auto text-brand font-primary text-xl'> Unblock </button>                           
        </div>      
      )
}   

export default BlockItems