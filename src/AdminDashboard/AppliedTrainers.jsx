import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SectionTitle from "../Components/SectionTitle";
import { em } from "motion/react-client";

const AppliedTrainers = () => {
  const axiosPublic = useAxiosPublic();
  const { data: applied = [],refetch } = useQuery({
    queryKey: ["applied"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      const filtered = res.data.filter((item) => item.isTrainer === "Pending");
      return filtered;
    },
  });
  const handleApprove =(id,email)=>{  
    axiosPublic.patch(`/trainers/${id}`)
    .then((res)=>{
        if(res.data.modifiedCount>0){
            refetch()
        }
    })
    axiosPublic.patch(`/users/${email}`)
    .then(res=>{
        console.log(res.data)
    })

  }
 const handleReject = (id)=>{
    axiosPublic.delete(`/trainers/${id}`)
    .then(res=>{
        console.log(res.data)
    })
 }
  return (
    <div>
      <SectionTitle
        heading="Manage Applied"
        coloredHeading="Trainers"
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Age</th>
              <th>Email</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
           {
            applied.map((item,idx)=>
            <tr key={idx} >
              <th>{idx+1}</th>
              <td>{item?.name}</td>
              <td>{item?.isTrainer}</td>
              <td>{item?.age}</td>
              <td>{item?.email}</td>
              <td><button onClick={()=>handleApprove(item._id,item.email)}>Yes</button></td>
              <td><button onClick={()=>handleReject(item._id)} >X</button></td>
            </tr>
            )
           }
            
          
           
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainers;
