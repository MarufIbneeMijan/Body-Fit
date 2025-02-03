import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Components/SectionTitle";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useTrainer from "../Hooks/useTrainer";

const Trainers = () => {
  const axiosPublic = useAxiosPublic();
  const [isTrainer]=useTrainer()
  console.log(isTrainer)
  const axiosSecure = useAxiosSecure()
  const { data: trainers = [] ,refetch} = useQuery({
    queryKey: ["adminTrainer"],
    queryFn: async () => {
      const res =await axiosPublic.get("/users/trainer");
     
      return res.data;
    },
  });
  const handleDeleteTrainer = (email) =>{
   
   console.log('Button Clicked')
    axiosPublic.patch(`/users/makeuser/${email}`)
    .then((res)=>{
       refetch()
       
    })
  }
  console.log(trainers)
  return (
    <div>
      <SectionTitle
        heading="Manage Trainers"
        coloredHeading="By One Click"
      ></SectionTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th> Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
              {
                trainers.map((trainer,idx)=>
                <tr key={idx} >
                <th>{idx+1}</th>
                <td>{trainer?.name}</td>
                <td>{trainer?.role}</td>
                <td><button onClick={()=>handleDeleteTrainer(trainer.email)}>Delete</button></td>
              </tr>
                )
              }
            
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
