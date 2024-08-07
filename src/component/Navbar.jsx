import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => { 
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const location = useLocation().pathname; 

      const handelLogout = () => { 
        localStorage.removeItem("user");
        dispatch(loggeduser(null));  
        window.location.reload()
      }
  return (
    <nav className=" w-60 bg-white h-screen pl-6 pt-14 shadow-[9px_0px_10px_-8px_rgba(0,0,0,0.62)]">
      <div>
        <img src="/logo.png" alt="logo" />
      </div>
      <div>
        <ul className="navItems">
          <li>
            <Link
              to="/"
              className={`${location == "/" && "bg-brand text-white"} 
                  flex items-center gap-3 py-3 px-3 text-red-500 text-center rounded-lg w-fit`}
            >
              <MdHome />
              <span>Home </span>
            </Link>
          </li>

          <li>
            <Link
              to="/chat"
              className={`${location == "/chat" && "bg-green-500 text-white"} 
                     flex items-center rounded-lg text-center gap-3 py-3 px-3 w-fit`}
            >
              <IoChatbubbleEllipsesSharp />
              <span className=" text-2xl"> Chat </span>
            </Link>
          </li>

          <li>
            <Link
              to="/chat"
              className={"flex items-center gap-3 py-3 px-3 rounded-lg w-fit"}
            >
              <IoChatbubbleEllipsesSharp />
              <span className=" text-2xl">Group</span>
            </Link>
          </li>

          <li>
            <Link
              to="/user"
              className="flex items-center gap-3 py-3 px-3 w-fit"
            >
              <img
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className=" text-primary font-semibold text-xl">
                  {user?.displayName}
                </p>
                <p className=" text-secondary font-medium text-lg">
                  Edite profile
                </p>
              </div>
            </Link>
          </li>
        </ul>  
        <div className=" flex  justify-center items-center py-6"> 
         <button onClick={handelLogout} className="py-2 px-6 rounded-md bg-brand text-white">Log out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
