import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from '../Components/Banner';
import Featured from '../Components/Featured';
import About from '../Components/About';
import Newsteller from '../Components/Newsteller';
import { Helmet } from 'react-helmet-async';
import TrainersHome from '../Components/TrainersHome';
import Reviews from '../Components/Reviews';
import Footer from '../Components/Footer';

const Home = () => {
    return (
        <div className='md:container mx-auto'>
          <Helmet>
                 <title>Home</title>
                 </Helmet>
          <Banner></Banner>
          <Featured></Featured>
          <About></About>
          <TrainersHome></TrainersHome>
          <Reviews></Reviews>
          <Newsteller></Newsteller>
          <Footer></Footer>
        </div>
    );
};

export default Home;