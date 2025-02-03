import React from 'react';
import { useForm } from "react-hook-form"
import SectionTitle from '../Components/SectionTitle';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AddForum = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const {user}=useAuth()
    const axiosPublic = useAxiosPublic()
      const onSubmit = (data) => {
        console.log(data)
        const forumData =
         {
            title:data.title,
            details:data.details,
            email:user.email,
            author:user.displayName
        }
        axiosPublic.post('/forums',forumData)
        .then(res=>{
           if(res.data.insertedId){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Successfully Added New Forum"
              });
           }
        })
      }
    return (
     
        <div className='flex flex-col'>
          <Helmet>
        <title>Add Forum</title>
        </Helmet>
            <SectionTitle heading='Add a' coloredHeading='Forum' ></SectionTitle>
             <form onSubmit={handleSubmit(onSubmit)}>
             <input type="text"  {...register("title")}  placeholder="Title" className="input input-bordered w-full max-w-xs" />
    <br />

             <textarea {...register('details')} className="textarea textarea-bordered" placeholder="Details"></textarea>
<br />
      <input className='btn' type="submit" />
    </form>
        </div>
    );
};

export default AddForum;