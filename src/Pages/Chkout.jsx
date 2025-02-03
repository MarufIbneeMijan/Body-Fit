import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
const Chkout = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [payerror, setPayerror] = useState("");
  const [transitionId, setTransitionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosPublic = useAxiosPublic();
  const [slotDetails, setSlotDetails] = useState(null);
  const nevigate = useNavigate();

  useEffect(() => {
    axiosPublic.get(`/bookings/${id}`).then((res) => {
      console.log(res.data);
      setSlotDetails(res.data);
    });
  }, []);
  console.log(slotDetails);
  useEffect(() => {
    if (slotDetails?.amount > 0) {
      axiosPublic
        .post("/create-payment-intent", { price: slotDetails?.amount })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [slotDetails]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return console.log("no stripe");
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return console.log("No card");
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(["error"], error);
      setPayerror(error.message);
    } else {
      console.log(["paymentMethod"], paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError, "This is Confirm Error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransitionId(paymentIntent.client_secret);
        const paymentInfo = {
          userEmail: user.email,
          userName: user.displayName,
          trainerEmail: slotDetails.trainer,
          membership: slotDetails.membership,
          amount: slotDetails.amount,
          time: new Date(),
          status: "Pending",
          trxId: paymentIntent.client_secret,
          class: slotDetails.class,
          day: slotDetails.day,
          slotName: slotDetails.slotName,
        };
        const res = await axiosPublic.post("/payments", paymentInfo);
        if (res.data.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Paid successfully",
          });
          nevigate("/dashboard");
        }
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Check Out</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-2xl text-red-500">{payerror}</p>
        {transitionId ? (
          <p className="text-2xl ">Your Id is{transitionId}</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Chkout;
