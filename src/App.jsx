import {
  createRoutesFromElements,
  createBrowserRouter,
  Route, 
  RouterProvider,
} from "react-router-dom";
import Registration from "./component/pages/Registration";
import Login from "./component/pages/Login";
import Home from "./component/pages/Home";
import Layout from "./component/Layout";
import User from "./component/pages/User";
import Chat from "./component/pages/Chat";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements( 

     <Route> 
         <Route path="/registration" element={<Registration/>}></Route>  
         <Route path="/login" element={<Login/>}></Route>  
     <Route path="/" element={<Layout />}> 
         <Route index element={<Home/>}></Route>   
         <Route path="/user" element={<User/>}></Route>   
         <Route path="/chat" element={<Chat/>}></Route>      
         </Route>    
     </Route>
    ),
  );
  return( 
    <>  
      <RouterProvider router={router} />
    </>
  )  
  }
export default App;
 
