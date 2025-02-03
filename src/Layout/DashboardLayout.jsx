import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useTrainer from "../Hooks/useTrainer";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const [isAdmin]=useAdmin()
  const {user}=useAuth()
  const [isTrainer]=useTrainer()
    const sideBarItemAdmin = 
    <>
      <li>
        <Link to={'/dashboard/newsteller'} >All Newsletter subscribers</Link>
      </li>
      <li>
       <Link to={'/dashboard/managetrainer'}>All Trainers</Link>
      </li>
      <li>
       <Link to={'/dashboard/appliedtrainer'} >Applied Trainer</Link>
      </li>
      <li>
       <Link>Balance</Link>
      </li>
      <li>
       <Link to={'/dashboard/addclass'}>Add new Class</Link>
      </li>
      <li>
  <Link to={'/'} >Goto Home</Link>
  </li>
    </>
    const sideBarItemTrainer =
    <>
      <li>
        <Link to={'/dashboard/manageslot'}>Manage Slots</Link>
      </li>
      <li>
       <Link to={'/dashboard/addslot'} >Add New slot</Link>
      </li>
      <li>
       <Link to={'/dashboard/addforum'} >Add new Forum</Link>
      </li>
      <li>
  <Link to={'/'} >Goto Home</Link>
  </li>
      
    </>
  
  const sidebarItemUser = <>
  <li>
  <Link to={'/dashboard/activity'} >Activity</Link>
  </li>
  <li>
  <Link to={'/dashboard/becometrainer'} >Become Trainer</Link>
  </li>
  <li>
  <Link to={'/dashboard/profile'} >Profile</Link>
  </li>
 
  <li>
  <Link to={`/dashboard/bookedslot/${user.email}`} >Booked Trainer</Link>
  </li>
  <li>
  <Link to={'/'} >Goto Home</Link>
  </li>
 
  
  </>
  return (
  
      <div className="flex gap-5 ">
      
       <div className="menu  p-6 w-60 h-full bg-green-600">
            <ul className="m-6">
            {
              (isAdmin?sideBarItemAdmin:isTrainer?sideBarItemTrainer:sidebarItemUser)
            }
            </ul>
       </div>
      
       
        <div className="flex-1">
            <h1 className="">MY DASHBOARD</h1>
            <Outlet></Outlet>
        </div>
      </div>
     
   
  );
};

export default DashboardLayout;
