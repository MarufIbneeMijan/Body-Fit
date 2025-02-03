import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";
import useAuth from "../Hooks/useAuth";

const BookedSlots = () => {
  const axiosPublic = useAxiosPublic();
  const [booked, setBooked] = useState([]);
  const { email } = useParams();
  const { user}=useAuth()
  useEffect(() => {
    axiosPublic.get(`/bookedslot`).then((res) => {
     const filtered = res.data.filter(item=>item.userEmail==email)
     setBooked(filtered)
    });
  }, []);

  // modal related styling 
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to handle the input value
  const [inputValue, setInputValue] = useState('');

  // Function to toggle the modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const review = 
    {
      name:user.displayName,
      review:inputValue
    }
    axiosPublic.post('/reviews',review)
    .then(res=>{
      if(res.data.insertedId){
        setInputValue('');  
        closeModal(); 
        alert(`Input Value: ${inputValue}`); 
      }
    })
   
  };
  console.log(booked);
  return (
    <div>
      <SectionTitle
        heading="Manage Your"
        coloredHeading="Bookings"
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Type</th>
              <th>Trainer</th>
              <th>Day</th>
              <th>Slot</th>
              <th>Class</th>
            
            
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
           
          {
            booked.map((item,idx)=>
            <tr key={idx} >
            <th>{idx+1}</th>
            <td>{item?.membership}</td>
            <td>{item?.trainerEmail}</td>
            <td>{item?.day}</td>
            <td>{item?.slotName}</td>
            <td>{item?.class}</td>
           
            <td> <button
        onClick={openModal}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Review
      </button></td>
          </tr>
            )
          }
           
           
          </tbody>
        </table>

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-4">Enter something</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type something..."
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedSlots;
