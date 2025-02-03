import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { div } from "motion/react-client";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Forums = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [like,setLike]= useState([])
  const [dislike,setDislike]=useState([])
  const { data: forums = [],refetch } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forums`);
      return res.data;
    },
  });
  
  const handleLike = (id)=>
    {
       setLike(previtem=>[...previtem,user?.email])
        axiosPublic.patch(`/forums/like/${id}`,like)
        .then(res=>{
            if(res.data.modifiedCount>1){
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
                title: "Liked successfully"
              });
            }
            refetch()
        })
  }
  const handleDislike = (id)=>
    {
       setDislike(previtem=>[...previtem,user?.email])
        axiosPublic.patch(`/forums/dislike/${id}`,dislike)
        .then(res=>{
           if(res.data.modifiedCount>1){
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
              title: "Disliked successfully"
            });
           }
           refetch()
        })
  }

  return (
    <div>
       <Helmet>
                 <title>Forums</title>
                 </Helmet>
      {forums.map((item) => (
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            
            <div>
              <h1 className="text-5xl font-bold">{item?.title}</h1>
              <h1 className="text-3xl font-bold" >{item?.author}</h1>
              <p className="py-6">
               {
                item?.details
               }
              </p>
              <div className="flex justify-around gap-3">
               {
                item?.like?.includes(user?.email)?`Already Liked (${item?.like?.length}) `: <button className="btn btn-outline" onClick={()=>handleLike(item._id)}>Up({item?.like?.length})</button>
               }
                {
                  item?.dislike?.includes(user?.email)?`Already Disliked (${item?.dislike?.length})`:<button className="btn btn-outline" onClick={()=>handleDislike(item?._id)} >Down</button>
                }
            </div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forums;
