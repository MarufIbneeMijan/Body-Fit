import {
    createBrowserRouter,
    
  } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home";
import Singup from "../Pages/Singup";
import Login from "../Pages/Login";
import Alltrainer from "../Pages/Alltrainer";
import TrainerDetails from "../Pages/TrainerDetails";
import Privetroutes from "./Privetroutes";
import BookSlot from "../Pages/BookSlot";
import DashboardLayout from "../Layout/DashboardLayout";
import Trainers from "../AdminDashboard/Trainers";
import AddClass from "../AdminDashboard/AddClass";
import AddSlot from "../TrainerDashboard/AddSlot";
import ManageSlot from "../TrainerDashboard/ManageSlot";
import Activity from "../UserDashboad/Activity";
import Allclass from "../Pages/Allclass";
import BecomeTrainer from "../UserDashboad/BecomeTrainer";
import AppliedTrainers from "../AdminDashboard/AppliedTrainers";
import Profile from "../UserDashboad/Profile";
import BookedSlots from "../UserDashboad/BookedSlots";
import Payment from "../Pages/Payment";
import AddForum from "../Pages/AddForum";
import Forums from "../Pages/Forums";
import NewsTeller from "../AdminDashboard/NewsTeller";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'allclass',
          element:<Allclass></Allclass>
        },
        {
            path:'singup',
            element:<Singup></Singup>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
          path:'alltrainers',
          element:<Alltrainer></Alltrainer>
        },
        {
          path:'trainer/:email',
          element:<Privetroutes><TrainerDetails></TrainerDetails></Privetroutes>
        },
        {
          path:'bookslot/:id',
          element:<Privetroutes><BookSlot></BookSlot></Privetroutes>
        },
        {
          path:'payment/:id',
          element:<Privetroutes><Payment></Payment></Privetroutes>
        },
        {
          path:'community',
          element:<Privetroutes><Forums></Forums></Privetroutes>
        },
      ]
    },
    {
      path:'dashboard',
      element:<Privetroutes><DashboardLayout></DashboardLayout></Privetroutes>,
      children:[
        // admin related routes 
        {
          path:'managetrainer',
          element:<Privetroutes><Trainers></Trainers></Privetroutes>
        },
        {
          path:'addclass',
          element:<Privetroutes><AddClass></AddClass></Privetroutes>
        },
        {
          path:'appliedtrainer',
          element:<Privetroutes><AppliedTrainers></AppliedTrainers></Privetroutes>
        },
        {
          path:'addforum',
          element:<Privetroutes><AddForum></AddForum></Privetroutes>
        },
        {
          path:'newsteller',
          element:<NewsTeller></NewsTeller>
        },
        // Trainer Related Routes
        {
          path:'addslot',
          element:<Privetroutes><AddSlot></AddSlot></Privetroutes>
        },
        {
          path:'manageslot',
          element:<Privetroutes><ManageSlot></ManageSlot></Privetroutes>
        },
        {
          path:'addforum',
          element:<Privetroutes><AddForum></AddForum></Privetroutes>
        },
        // user related 
        {
          path:'activity',
          element:<Privetroutes><Activity></Activity></Privetroutes>
        },
        {
          path:'becometrainer',
          element:<Privetroutes><BecomeTrainer></BecomeTrainer></Privetroutes>
        },
        {
          path:'profile',
          element:<Privetroutes><Profile></Profile></Privetroutes>
        },
        {
          path:'bookedslot/:email',
          element:<Privetroutes><BookedSlots></BookedSlots></Privetroutes>
        },
       
      ]
    }

  ]);
  export default router