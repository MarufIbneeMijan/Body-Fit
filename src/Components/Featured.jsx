import React from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { TbHeartHandshake } from "react-icons/tb";
import { RiBodyScanFill } from "react-icons/ri";
import { FaDumbbell } from "react-icons/fa";
import { MdOutlineGroup } from "react-icons/md";
const Featured = () => {
  return (
    <div className="text-center">
      <SectionTitle
        heading="Full Of Powerful"
        coloredHeading="Features"
      ></SectionTitle>
    
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
         <SwiperSlide>
         <div className="card shadow-xl border border-x-2">
              <figure className="text-6xl">
              <TbHeartHandshake />
              </figure>
              <div className="card-body">
                <h2 className="text-3xl">Cardio Equipment Zone</h2>
                <p>A dedicated space filled with various cardiovascular machines like treadmills, stationary bikes, and ellipticals. This area is designed to help you improve endurance, burn calories, and increase heart health.</p>
                
              </div>
            </div>
          </SwiperSlide>
        <SwiperSlide><div className="card shadow-xl border border-x-2">
              <figure className="text-6xl">
              <RiBodyScanFill />
              </figure>
              <div className="card-body">
                <h2 className="text-3xl">Strength Training Area</h2>
                <p>Equipped with free weights, barbells, dumbbells, and resistance machines, this section caters to individuals looking to build muscle strength, tone their bodies, or focus on powerlifting.</p>
                
              </div>
            </div></SwiperSlide>
        <SwiperSlide><div className="card shadow-xl border border-x-2">
              <figure className="text-6xl">
              <FaDumbbell />
              </figure>
              <div className="card-body">
                <h2 className="text-3xl">Functional Training Zone</h2>
                <p>A versatile space for bodyweight exercises, kettlebell training, medicine balls, resistance bands, and more. This area helps improve flexibility, mobility, and overall functional fitness.</p>
                
              </div>
            </div></SwiperSlide>
        <SwiperSlide><div className="card shadow-xl border border-x-2">
              <figure className="text-6xl">
              <MdOutlineGroup />
              </figure>
              <div className="card-body">
                <h2 className="text-3xl">Group Fitness Studio</h2>
                <p> A studio space for fitness classes like yoga, Pilates, spinning, Zumba, or HIIT (High-Intensity Interval Training). Group workouts encourage motivation and community while providing structured fitness guidance.</p>
                
              </div>
            </div></SwiperSlide>
       
      </Swiper>
      
    </div>
  );
};

export default Featured;
