import React from 'react'

const UserItems = () => {
  return (
    <div className='flex gap-4 items-center'> 
        <div> 
            <img src=" /user.png" alt="user" />
        </div> 
        <div> 
            <h2 className=' text-xl font-primary text-primary font-bold'>Eddie Lake</h2> 
             <p className='  text-lg font-primary text-secondary font-normal'>Need money.....</p>    
        </div>  
        <button className=' ml-auto text-brand font-primary text-xl'> Send Request </button>                           
    </div>      
  )
}

export default UserItems