import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'; 
import { useSelector } from 'react-redux';


const Layout = () => {  
  const user = useSelector((state) => state.userSlice.user); 
  const navigate = useNavigate();
 
 useEffect(()=>{ 
  if(!user){ 
    return navigate("/login")
   }
 }, []);
 
  return (
       <div className='flex'>   
       <Navbar/>   
       <Outlet/>      
       </div>   
  );
};

export default Layout;