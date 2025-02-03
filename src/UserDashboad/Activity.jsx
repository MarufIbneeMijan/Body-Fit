import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import useTrainer from "../Hooks/useTrainer";

const Activity = () => {
   const axiosPublic = useAxiosPublic()
   const [isTrainer] =useTrainer()
   console.log(isTrainer)
   const {user}=useAuth()
   const {data:trainer=[]}=useQuery({
    queryKey:['trainerAll'],
    queryFn:async()=>{
        const res = await axiosPublic.get(`/trainers/${user.email}`)
        return res.data
    }

   })
   
   
      
    return (
        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
          
         {
            trainer.map((item,idx)=>
                <tr key={idx} >
            <th>{idx+1}</th>
            <td>{item?.name}</td>
            <td>{item?.isTrainer}</td>
            <td>{item?.email}</td>
           
          </tr>
            )
         }
           
          </tbody>
        </table>
      </div>
    );
};

export default Activity;