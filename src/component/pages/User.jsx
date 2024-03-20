import React from "react"; 
import { MdEmail } from "react-icons/md"; 
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6"; 
import { IoMdMore } from "react-icons/io"; 




const User = () => {
  return (
    <div className=" w-96 bg-white shadow-lg rounded-lg overflow-hidden my-4  m-auto h-fit">
      <img
        className="w-full h-56 object-cover object-center"
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        alt="avatar"
      />
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900">
        <h1 className="mx-3 text-white font-semibold text-lg">User name :</h1> 
          <div className="group relative w-fit"> 
          <IoMdMore className=" text-white text-2xl cursor-pointer"/> 
          <p className=" text-white hidden absolute bottom-full right-0 group-hover:block whitespace-nowrap	 ">Edite profile</p>
          </div>
      </div>
      <div className="py-4 px-6">
         <p className=" py-2 text-lg text-gray-700">Bio</p>
        <div className="flex items-center mt-4 text-gray-700"> 
         <MdEmail />
          <h1 className="px-2 text-sm">Email</h1>
        </div>
        <div className="flex items-center mt-4 text-gray-700">
          
        <FaPhoneAlt />

          <h1 className="px-2 text-sm">Phone</h1>
        </div>
        <div className="flex items-center mt-4 text-gray-700">
        <FaLocationDot />
          <h1 className="px-2 text-sm">Adress</h1>
        </div>
      </div>
    </div>
  );
};

export default User;
