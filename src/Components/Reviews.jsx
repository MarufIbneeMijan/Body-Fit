import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import axios from 'axios';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Reviews = () => {
    const [reviews,setReviews]=useState([])
    const axiosPublic=useAxiosPublic()
    useEffect(()=>{
        axiosPublic.get('/reviews')
        .then(res=>{
            setReviews(res.data)
        })
    },[])
    console.log(reviews)
    
    return (
        <div>
            <div className='text-center p-4'>
                <SectionTitle heading='Our' coloredHeading='Testimonials' ></SectionTitle>
            </div>
            <div>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
       {
        reviews.map(review=> <SwiperSlide>
            <div className='text-center p-6'>
                <h1 className='text-5xl '>{review.review}</h1>
            <h1 className='text-green-600'>{review.name}</h1>
            </div>
           
        </SwiperSlide>)
       }
       
      </Swiper>
            </div>
        </div>
    );
};

export default Reviews;