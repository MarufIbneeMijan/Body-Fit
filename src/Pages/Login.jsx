import React from "react";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import loginAnimation  from '../assets/Animation - 1733934127191 (1).json'
import Lottie from 'react-lottie';
import SocialLogin from "../Components/SocialLogin";
import { Helmet } from "react-helmet-async";
const Login = () => {
  const { singIn } = useAuth();
  const nevigate = useNavigate()
  const location =useLocation() 
   const from = location.state?.from?.pathname || '/'
 const {
        register,
        handleSubmit,
       
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => {
      singIn(data.email,data.password)
        .then(()=>{
         nevigate(from)
        })
     }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <Helmet>
                 <title>Login</title>
                 </Helmet>
          
          <SocialLogin></SocialLogin>
        
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}  className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register('email')}
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
                {...register('password')}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
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

export default Login;
