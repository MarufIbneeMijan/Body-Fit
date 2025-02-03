import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import SectionTitle from "../Components/SectionTitle";
import Swal from "sweetalert2";

const ManageSlot = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: slot = [], refetch } = useQuery({
    queryKey: ["slot"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/${user.email}`);
      return res.data;
    },
  });
  const handleSlotDelete = (id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
        axiosSecure.delete(`/slots/${id}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data.acknowledged){
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                  refetch()
            }
           
        })
        
       
        }
      });
  }
 
  return (
    <div>
        <div className="text-center">
        <SectionTitle heading="Manage your" coloredHeading="slots"></SectionTitle>
        </div>
    
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead className="text-xl text-green-600">
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Time</th>
              <th>Applied Users</th>
              <th>Slot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           
            {
                slot.map((item,idx)=>
            <tr key={item._id} >
              <th>{idx+1}</th>
              <td>{item?.class}</td>
              <td>{item?.time} hour</td>
              <td>Blue</td>
              <td>{item?.slotName}</td>
              <td><button onClick={()=>handleSlotDelete(item._id)}>Delete</button></td>
              

            </tr>
                )
            }
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlot;
