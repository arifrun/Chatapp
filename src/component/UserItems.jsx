import React from 'react'

const UserItems = ({uerData}) => { 
  console.log(uerData);
  return (
    <div className='flex gap-4 items-center'> 
        <div className='w-10 h-10'> 
            <img src= {uerData.profile_picture} alt="user" className='w-full' />
        </div> 
        <div> 
            <h2 className=' text-xl font-primary text-primary font-bold'> 
            {uerData.username}</h2> 
             <p className='  text-lg font-primary text-secondary font-normal'>Need money.....</p>    
        </div>  
        <button className=' ml-auto text-brand font-primary text-xl'> Add Request </button>                           
    </div>      
  )
}

export default UserItems