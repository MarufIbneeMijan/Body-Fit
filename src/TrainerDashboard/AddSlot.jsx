import React from "react";
import SectionTitle from "../Components/SectionTitle";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useSnackbar } from 'notistack';
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const AddSlot = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { enqueueSnackbar } = useSnackbar();
  const {user}=useAuth()
  const { register, handleSubmit } = useForm();
  const {data:trainerInfo}=useQuery({
    queryKey:['trainerInfo'],
    queryFn:async()=>{
      const res = await axiosPublic.get(`/trainerdetail/${user?.email}`)
      return res.data
    }
  })
  console.log(trainerInfo)
  const onSubmit = (data) => {
   const slotInfo =
    {
        time:data.slotTime,
        class:data.className,
        slotName:data.slotName,
        trainer:user.email,
        trainerInfo:trainerInfo.name,
        day:data.day
   }
   axiosSecure.post('/addslot',slotInfo)
   .then((res)=>{
    console.log(res.data)
   if(res.data.acknowledged){
    let timerInterval;
Swal.fire({
  title: "Successfully Added New Slot",
  html: "I will close in <b></b> milliseconds.",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
});
   }
   })
  };
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
 
  
  return (
    <div className="flex flex-col justify-center items-center gap-7">
      <SectionTitle heading="Add Your" coloredHeading="New Slot"></SectionTitle>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("slotTime")}
            type="number"
            placeholder="Type here your class time"
            className="input input-bordered w-full "
          />
        </div>
        <div>
          <select
            {...register("slotName")}
            className="select select-bordered w-full"
          >
            <option disabled selected>
              Select Your Time
            </option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>
        <div>
          <select
            {...register("className")}
            className="select select-bordered w-full "
          > <option disabled selected>
          Select Your class
        </option>
           
           {
                classes.map(item=><option key={item._id} >{item.name}</option>)
           }
          </select>
        </div>
        <div>
          <select
            {...register("day")}
            className="select select-bordered w-full"
          >
             <option disabled selected>
              Select Your Day
            </option>
           
            {
              trainerInfo?.slot.map(day=> <option>{day}</option>)
            }
          </select>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddSlot;
