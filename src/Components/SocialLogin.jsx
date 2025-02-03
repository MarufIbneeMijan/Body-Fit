import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleSingUp} = useAuth()
    
    const nevigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const from = location.state?.from?.pathname || '/'
    const handleGoogle = ()=>{
        googleSingUp()
        .then((user)=>{
           
            const userData = {
                name:user.user.displayName,
                email:user.user.email
            }
            axiosPublic.post('/users',userData)
            .then(res=>{
                
                if(res.data.acknowledged){
                    nevigate(from)
                }
            })
        })
    }
    
    return (
        <div className='mt-4 flex items-center text-xl border-2 p-1 bg-green-600'>
            <FaGoogle ></FaGoogle>
           <button onClick={handleGoogle}>Singup with Google</button> 
        </div>
    );
};

export default SocialLogin;