import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link, useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../Components/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
const BookSlot = () => {
  const axiosPublic = useAxiosPublic();
  const [trainer, setTrainer] = useState([]);
  const { id } = useParams();

  const nevigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    axiosPublic.get(`/slot/${id}`).then((res) => {
      setTrainer(res.data);
    });
  }, []);
 
  const onSubmit = (data) => {
    console.log(data);
    let price = 0;
    if (data.plan === "Basic Membership") {
      price = 10;
    }
    if (data.plan === "Standard Membership") {
      price = 20;
    } else {
      price = 30;
    }

    const slotInfo = {
      class: trainer.class,
      slotName: trainer.slotName,
      trainer: trainer.trainer,
      membership: data.plan,
      amount: price,
      user: user.email,
      day:trainer.day
    };

    axiosPublic.post("/bookslot", slotInfo).then((res) => {
      if (res.data.insertedId) {
        console.log(res.data.insertedId);
        nevigate(`/payment/${res.data.insertedId}`);
      }
    });
  };

  console.log(trainer);
  return (
    <div  > 
      <Helmet>
        <title>Book A Slot</title>
      </Helmet>
      <div className="text-center p-11">
        <SectionTitle heading="Book Your" coloredHeading="Slot"></SectionTitle>
      </div>
      <div>
        <form
          className="flex flex-col justify-center align-middle"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Trainer name</span>
              </div>
              <input
                type="text"
                defaultValue={trainer?.trainerInfo}
                disabled
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Training Day</span>
              </div>
              <input
                type="text"
                defaultValue={trainer?.day}
                disabled
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Time</span>
              </div>
              <input
                type="text"
                defaultValue={trainer?.slotName}
                disabled
                className="input input-bordered "
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Class Name</span>
              </div>
              <input
                type="text"
                defaultValue={trainer?.class}
                disabled
                className="input input-bordered w-full "
              />
            </label>
          </div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Pick the best slot for you</span>
            </div>
            <select {...register("plan")} className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option>Basic Membership</option>
              <option>Standard Membership</option>
              <option>Premium Membership</option>
            </select>
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Pick the best slot for you</span>
            </div>
          </label>
          <div></div>
          <button>Submit</button>
        </form>
      </div>
      <div className="text-center">
        <SectionTitle
          heading="Pick Your"
          coloredHeading="Suitable Plan"
        ></SectionTitle>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-green-600 font-bold text-2xl">
              <tr>
                <th></th>
                <th>Basic Membership</th>
                <th>Standard Membership</th>
                <th>Premium Membership</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="bg-base-200">
                <th>1</th>
                <td>
                  Access to gym facilities during regular operating hours.
                </td>
                <td>All benefits of the basic membership</td>
                <td>All benefits of the standard membership.</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Use of cardio and strength training equipment.</td>
                <td>
                  Access to group fitness classes such as yoga, spinning, and
                  Zumba
                </td>
                <td>
                  Access to personal training sessions with certified trainers
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Access to locker rooms and showers.</td>
                <td>Use of additional amenities like a sauna or steam room.</td>
                <td>
                  Discounts on additional services such as massage therapy or
                  nutrition counseling.
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Price: $10</td>
                <td>Price: $20</td>
                <td>Price: $30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookSlot;
