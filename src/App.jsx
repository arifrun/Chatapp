import {
  createRoutesFromElements,
  createBrowserRouter,
  Route, 
  RouterProvider,
} from "react-router-dom";
import Registration from "./component/pages/Registration";
import Login from "./component/pages/Login";
import Home from "./component/pages/Home";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements( 

     <Route> 
         <Route path="/registration" element={<Registration/>}></Route>  
         <Route path="/login" element={<Login/>}></Route>  
         <Route path="/" element={<Home/>}></Route> 
     </Route>
    ),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
