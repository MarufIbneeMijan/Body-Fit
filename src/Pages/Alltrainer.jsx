import React from 'react';
import TeamMember from '../Components/TeamMember';
import memberImg from "../assets/team.jpg"
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAdmin from '../Hooks/useAdmin';
import { Helmet } from 'react-helmet-async';
const Alltrainer = () => {
    
    
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
   
    const {data:trainer = []}=useQuery({
        queryKey:['trainer'],
        queryFn: async()=>{
           const res=await axiosPublic.get('/trainers')
            console.log(res.data)
            const filtered = res.data.filter(item=>item.isTrainer!=='Pending')
           return filtered
            
        }
    })

    
    return (
        <div className='p-10 grid grid-cols-3' >
           <Helmet>
                 <title>Trainers</title>
                 </Helmet>
          {
            trainer.map(trainer=> <TeamMember key={trainer._id} trainer={trainer} ></TeamMember> )
          }
        </div>
    );
};

export default Alltrainer;