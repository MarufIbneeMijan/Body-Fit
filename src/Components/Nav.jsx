import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';


const Nav = () => {
    const {singOutUser,user}=useAuth()
  
  
  const navLinks = 
    <>
         <li><Link to={'/'}>Home</Link></li>
         <li><Link to={'/alltrainers'}>All Trainer</Link></li>
         <li><Link to={'/allclass'}>All Classes</Link></li>
         <li><Link to={'dashboard'}>Dashboard</Link></li>
         <li><Link to={'community'}>Community</Link></li>
        
         {user?.email?'': <li><Link to={'/singup'}>Singup</Link></li>}
        {user?.email? <li><button onClick={singOutUser} >Logout</button></li> : <li><Link to={'/login'}>Login</Link></li>}
       
    </>
    
    
    
    return (
        <div className="navbar bg-base-100 fixed z-10 bg-opacity-30">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {
        navLinks
       }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {
        navLinks
     }
    </ul>
  </div>
  
</div>
    );
};

export default Nav;