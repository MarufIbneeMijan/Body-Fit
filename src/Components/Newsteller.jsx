import React from 'react';
import SectionTitle from './SectionTitle';
import { useForm } from "react-hook-form"
import useAxiosPublic from '../Hooks/useAxiosPublic';
const Newsteller = () => {
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        axiosPublic.post('/newsteller',data)
        .then(res=>{
           if(res.data.insertedId){
            alert('Subcribed Successfully')
           }
        })
       }

    return (
        <div className='text-center'>
          <SectionTitle heading='Subscribe To' coloredHeading='Our Newsteller' ></SectionTitle> 
          <div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('name')} placeholder="Your Name" className="input input-bordered w-full max-w-xs" />

          <input type="text" {...register('email')} placeholder="Your Email" className="input input-bordered w-full max-w-xs" />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <button className='btn bg-green-600'>Subscribe</button>
    </form>
         
        
        
            </div> 
        </div>
    );
};

export default Newsteller;