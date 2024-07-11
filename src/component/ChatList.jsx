
import { useDispatch } from 'react-redux'
import { chatFriendInfo } from '../slice/currentChatFriendInfo';

const ChatList = ({Data}) => {  
    const dispatch = useDispatch();
    const handelClick = () =>{ 
      dispatch(chatFriendInfo(Data))  
      localStorage.setItem("chatFriendInfo", JSON.stringify(Data));
    }
    return (
        <div onClick={handelClick} className='flex gap-4 border-b cursor-pointer'> 
            <div className='w-12 h-12 rounded-full overflow-hidden'> 
                <img src= {Data.friendImg} alt="user" />
            </div> 
            <div> 
                <h2 className=' text-xl font-primary text-primary font-bold'> 
                   {Data.friendName} </h2> 
                 <p className='  text-lg font-primary text-secondary font-normal'>Need money.....</p>    
            </div>  
            <p className='ml-auto text-lg font-primary text-secondary font-normal'>10:30</p>                            
        </div>      
      )
}

export default ChatList