import React, { useContext } from "react";
import { useForm } from "react-hook-form"
import { authContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SocialLogin from "../Components/SocialLogin";
import { Helmet } from "react-helmet-async";
const Singup = () => {
    const {
        register,
        handleSubmit,
       
        formState: { errors },
      } = useForm()
       const from = location.state?.from?.pathname || '/'
      const axiosPublic = useAxiosPublic()
      const nevigate = useNavigate()
      const { createUser}=useContext(authContext)
      const { updateUserProfile}=useAuth()
      const onSubmit = (data) => {
       createUser(data.email,data.password)
       .then(()=>{
          updateUserProfile(data.name,"")
          .then(()=>{
            const userData = {
              name:data.name,
              email:data.email
            }
            axiosPublic.post('/users',userData)
          })
          nevigate(from)
       })
    }
  
    return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Singup now!</h1>
          <Helmet>
                 <title>Singup</title>
                 </Helmet>
          <SocialLogin></SocialLogin>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form  onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="Text"
                placeholder="Name"
                className="input input-bordered"
                {...register("name", { required: true })}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
                required
              />
             
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
