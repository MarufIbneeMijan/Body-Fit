import { useState } from "react";
import { useForm } from "react-hook-form"
import useAuth from "../Hooks/useAuth";
import SectionTitle from "../Components/SectionTitle";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Select from 'react-select';
const image_hosting_key = import.meta.env.VITE_imagebb_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const BecomeTrainer = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
    const {user}=useAuth()
    const axiosPublic = useAxiosPublic()
   
    const dayOptions = [
      { value: 'monday', label: 'Monday' },
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' },
      { value: 'saturday', label: 'Saturday' },
      { value: 'sunday', label: 'Sunday' }
    ];
    const handleChange = (selectedOptions) => {
      const selectedDaysArray = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setSelectedDays(selectedDaysArray);
     
    };
  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    // If the checkbox is checked, add it to the selected values array
    // If the checkbox is unchecked, remove it from the selected values array
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((item) => item !== value);
      } else {
        return [...prevSelectedValues, value];
      }
    });
  };
 
  const { register, handleSubmit } = useForm();
  const onSubmit = async(data) =>{
   
        const trainerInfo = {
            name:data.name,
            email:user.email,
            expart:selectedValues,
            // image:res.data.data.display_url,
            time:data.time,
            age:data.age,
            slot:selectedDays,
            isTrainer:'Pending'
        }
        axiosPublic.post('/trainer',trainerInfo)
        .then((res)=>{
          if(res.data.acknowledged){
            alert('Your application is pending')
          }
        })
      
       
   
  } 
  // Submit handler to show the selected values (for example)

 
  return (
    <div>
        <SectionTitle heading='Become a' coloredHeading='Trainer' ></SectionTitle>
        <div className="w-full">
        <form  onSubmit={handleSubmit(onSubmit)}>
       

       <input type="text" {...register("name", { min: 18, max: 99 })} defaultValue={user?.displayName} disabled className="input input-bordered w-full " />
       <br />
         <input type="number" {...register("age", { min: 18, max: 99 })} placeholder="Your Age" className="input input-bordered w-full " />
         <br />
         <input type="text" disabled defaultValue={user.email} className="input input-bordered w-full " />
         <br />
         <input type="number" {...register("time", { min: 1, max: 12 })}  className="input input-bordered w-full " placeholder="Avalaible Time" />
         <br />
        
         <h2>Select your Expirties</h2>
         <label>
           <input
             type="checkbox"
             value="Yoga"
             checked={selectedValues.includes("Yoga")}
             onChange={handleCheckboxChange}
           />
          Yoga
         </label>
         <br />
         <label>
           <input
             type="checkbox"
             value="Cardio"
             checked={selectedValues.includes("Cardio")}
             onChange={handleCheckboxChange}
           />
          Cardio
         </label>
         <br />
         <label>
           <input
             type="checkbox"
             value="Strength"
             checked={selectedValues.includes("Strength")}
             onChange={handleCheckboxChange}
           />
          Strength
         </label>
         <br />
         <label>
           <input
             type="checkbox"
             value="Mind-body"
             checked={selectedValues.includes("Mind-body")}
             onChange={handleCheckboxChange}
           />
          Mind-body
         </label>
         <br />
         <label>
           <input
             type="checkbox"
             value="Dance"
             checked={selectedValues.includes("Dance")}
             onChange={handleCheckboxChange}
           />
          Dance
         </label>
         <br />
       
         <div>
        <label htmlFor="days">Select Days of the Week:</label>
        <Select
          id="days"
          options={dayOptions}        // Options for the dropdown
          value={dayOptions.filter(option => selectedDays.includes(option.value))} // Highlight selected days
          onChange={handleChange}      // Handle selection changes
          isMulti                      // Enable multiple selection
          placeholder="Choose days"
        />
      </div>
      
       <br />
         <input type="file" {...register("image")}  className="file-input w-full " />
         <br />
         <button className="btn btn-primary">Submit</button>
       </form>
        </div>
     
    </div>
  );
};

export default BecomeTrainer;
