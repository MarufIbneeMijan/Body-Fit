
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";


const Privetroutes = ({children}) => {
   const {loading,user}=useAuth()
   const location = useLocation()
   if(loading){
    return <div>Wait...</div>
   }
   if(user){
    return children
   }
   return (
    <Navigate to={'/login'} state={{from:location}} ></Navigate>
);
};

export default Privetroutes;