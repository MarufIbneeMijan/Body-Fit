import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from '../assets/team.jpg'
const TeamMember = ({ trainer}) => {
  console.log(trainer)
    return (
   <Link to={`/trainer/${trainer?.email}`} >
    <div className="relative   mx-4 my-6 rounded-lg overflow-hidden shadow-lg">
      <motion.img
     src={image}
        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
        whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white"
        initial={{ bottom: '-100%', opacity: 0 }}
        animate={{ bottom: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold">{trainer.name}</h3>
       
        <p className="text-lg text-green-600">Age:{trainer?.age}</p>
        <p className="text-lg text-green-600">Expirence:3+ Years</p>
     
          <p className="text-lg text-green-600">Avalaible Slot: {trainer?.slot?.map(day=>" " +day)}</p>
     
      </motion.div>
    </div>
   </Link>
    );
};

export default TeamMember;