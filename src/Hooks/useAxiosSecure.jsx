

import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
const axiosSecure = axios.create({
    baseURL:"https://assingment-12-server-orcin.vercel.app"
})
const useAxiosSecure = () => {
    const { singOutUser} = useAuth()
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
           
            return config;
        } else {
            console.log('No token found');
        }
       
       
    },
    function(error){
        return Promise.reject(error);
    })
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },  async function (error) {
       const status = error.response.status
        console.log(error)
       if(status===401 || status===403){
        await singOutUser()
       
       }
        return Promise.reject(error);
      });
      return axiosSecure
};

export default useAxiosSecure;