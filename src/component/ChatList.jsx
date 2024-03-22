import React from 'react'

const ChatList = () => {
    return (
        <div className='flex gap-4 cursor-pointer'> 
            <div> 
                <img src="/user.png" alt="user" />
            </div> 
            <div> 
                <h2 className=' text-xl font-primary text-primary font-bold'>Eddie Lake</h2> 
                 <p className='  text-lg font-primary text-secondary font-normal'>Need money.....</p>    
            </div>  
            <p className='ml-auto text-lg font-primary text-secondary font-normal'>10:30</p>                            
        </div>      
      )
}

export default ChatList