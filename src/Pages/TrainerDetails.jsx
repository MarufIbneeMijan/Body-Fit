import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import memberImg from "../assets/team.jpg"
import SectionTitle from '../Components/SectionTitle';
import SlotTable from '../Components/SlotTable';
import { Helmet } from 'react-helmet-async';
import { li } from 'motion/react-client';
const TrainerDetails = () => {
    const axiosPublic=useAxiosPublic()
    const [trainer,setTrainer]=useState(null)
    const {email}=useParams()
    useEffect(()=>{
        axiosPublic.get(`/trainerdetail/${email}`)
        .then(res=>{
            setTrainer(res.data)
        })
    },[])
   console.log(trainer)
    return (
        <div className="bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-col">
    <img
      src={memberImg}
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">{trainer?.name}</h1>
     
        <Helmet>
                 <title>Details</title>
                 </Helmet>
     
      <p className="py-2">
        Special At: {trainer?.expart.map(expert=><li>{expert}</li>)        }
      </p>
    
    
    </div>
    <div className=" text-center">
      <SectionTitle heading='Avalaible' coloredHeading='Slots' ></SectionTitle>
 
        <SlotTable className='text-xl'  key={trainer?._id} name={trainer?.name} ></SlotTable>
  
    </div>

    
  </div>
  
</div>
    );
};

export default TrainerDetails;