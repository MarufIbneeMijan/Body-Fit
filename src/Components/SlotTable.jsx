import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { div } from "motion/react-client";

const SlotTable = ({ name }) => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: slot = [] } = useQuery({
    queryKey: ["slot"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/slots`);
      const filtered = res.data.filter((item) => item.trainerInfo == name);
      return filtered;
    },
  });
  

  return (
    <div className="w-full">
     
         {
          slot.map(slot=>
            <div>
             <h1 className="text-green-600"> Trainer Info:{slot.
              trainerInfo}
              </h1>
              <h1>Day:{slot.day}</h1>
              <h1>Time:{slot.slotName}</h1>
              <h1>Class:{slot?.class}</h1>
              <Link className="btn" to={`/bookslot/${slot._id}`} >Book Now</Link>
              </div>
           
          )
         }
    </div>
  );
};

export default SlotTable;
