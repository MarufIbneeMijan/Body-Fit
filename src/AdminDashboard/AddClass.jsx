import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_imagebb_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddClass = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const image = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.status) {
      const classData = {
        name: data.name,
        details: data.details,
        image: res.data.data.display_url,
        category:data.category
      };
      const classRes = await axiosSecure.post("/classes", classData);
      console.log(classRes.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Class Name*</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            {...register("name", { required: true })}
            className="input input-bordered w-full "
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Class Details</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            {...register("details", { required: true })}
            className="input input-bordered w-full "
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Class Category</span>
          </div>
          <select  {...register("category", { required: true })}  className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Select class category?
            </option>
            <option>Yoga</option>
            <option>Legs</option>
            <option>Strength</option>
            <option>Cardio</option>
            <option>Dance-Based</option>
            <option>Mind-Body</option>
          </select>
        </label>
        <div>
          <input
            type="file"
            {...register("image", { required: true })}
            className="mt-4 file-input w-full max-w-xs"
          />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddClass;
