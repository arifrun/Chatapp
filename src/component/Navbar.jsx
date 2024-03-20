import React from 'react'
import { Link } from 'react-router-dom' 
import { MdHome } from "react-icons/md"; 
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"; 
import { FaUserAlt } from "react-icons/fa";


const Navbar = () => {
  return (
     <nav className=' w-60 bg-white h-screen pl-6 pt-14 shadow-[9px_0px_10px_-8px_rgba(0,0,0,0.62)]'> 
        <div> 
            <img src="/logo.png" alt="logo" /> 
        </div>  
        <div> 
            <ul className='navItems'> 
                <li><Link to="/" className='flex items-center gap-3 py-3 px-3 bg-brand text-white rounded-lg w-fit'>  
                <MdHome />
                 <span>Home </span>
                </Link></li>       

                   <li><Link to="/" className='flex items-center gap-3 py-3 px-3 w-fit'>   
                <IoChatbubbleEllipsesSharp />
                  <span className=' text-2xl'> Chat </span>
                </Link></li> 
                
                <li><Link to="/user" className='flex items-center gap-3 py-3 px-3 w-fit'>   
                  <img src=" user.png" alt="user" className='w-10 h-10' />   

                  <div> 
                  <p className=' text-primary font-semibold text-xl'> Robert Fox</p>  
                  <p className=' text-secondary font-medium text-lg'>Edite profile</p>
                  </div>
                </Link></li>                
            </ul> 
          
        </div>
     </nav>
  )
}

export default Navbar