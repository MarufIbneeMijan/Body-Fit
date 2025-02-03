import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useTrainer = () => {
   const axiosPublic = useAxiosPublic()
   const {user} =useAuth() 
   const {data: isTrainer=[],isPending:isloading}=useQuery({
    queryKey:['trainer'],
    queryFn:async()=>{
        const res = await axiosPublic.get(`/users/trainer/${user.email}`)
        return res.data?.trainer
        
    }
   })
   
   return[isTrainer,isloading]
};

export default useTrainer;