import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../Components/SectionTitle";
import {loadStripe} from '@stripe/stripe-js';
import Chkout from "./Chkout";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const stripePromise = loadStripe(import.meta.env.VITE_payment_pk)
const Payment = () => {
    const {id}=useParams()
    console.log(id)
    return (
        <div>
             <Helmet>
                 <title>Payment</title>
                 </Helmet>
           <SectionTitle heading='Confrim Your' coloredHeading='Payment' ></SectionTitle> 
           <div>
            <Elements stripe={stripePromise}>
                <Chkout id={id} ></Chkout>
            </Elements>
           </div>
        </div>
    );
};

export default Payment;