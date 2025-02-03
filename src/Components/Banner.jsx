import React from 'react';

const Banner = () => {
    return (
        <div className="bg-[url('./assets/BannerImg.jpg')] h-screen bg-no-repeat bg-cover">
            <div className='absolute bottom-0'>
            <h1 className=' text-4xl text-white '>Unlock Your Potential,<br />Health and Fitness</h1>
            <button className='btn bg-green-600 btn-outline border-none ' >Learn More</button>
            </div>
            
        </div>
    );
};

export default Banner;