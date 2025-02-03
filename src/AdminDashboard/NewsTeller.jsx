import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SectionTitle from "../Components/SectionTitle";

const NewsTeller = () => {
  const [subscribers, setSubscribers] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/subscribers").then((res) => {
      setSubscribers(res.data);
    });
  }, []);
  console.log(subscribers);
  return (
    <div className="text-center" >
        <SectionTitle heading='All' coloredHeading='Subscribers' ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
             
            </tr>
          </thead>
          <tbody>
          
           {
            subscribers.map((item,idx)=>
             <tr key={idx} >
            <th>{idx+1}</th>
            <td>{item?.name}</td>
            <td>{ item?.email}</td>
           
          </tr>)
           }
          
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTeller;
