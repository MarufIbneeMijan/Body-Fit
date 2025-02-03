import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { div } from "motion/react-client";
import SectionTitle from "./SectionTitle";

const TrainersHome = () => {
  const axiosPublic = useAxiosPublic();
  const [homeTrainer, setHomeTrainer] = useState([]);
  useEffect(() => {
    axiosPublic.get("/home/trainers").then((res) => {
      setHomeTrainer(res.data);
    });
  }, []);

  return (
   <div className="text-center" >
    <SectionTitle heading='Our Team' coloredHeading='Members' ></SectionTitle>
    <div className="grid grid-cols-3">
    {
        homeTrainer.map((item,idx)=> <div key={idx} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img src="../assets/team.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item?.name}</h2>
              <p>Age :{item.age}</p>
              <p>Expert at:</p>
              {
                item.expart.map(expert=><p>{expert}</p>)
              }
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>)
    }
    </div>
   
   </div>
  );
};

export default TrainersHome;
