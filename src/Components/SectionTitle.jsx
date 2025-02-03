import React from 'react';

const SectionTitle = ({heading,coloredHeading}) => {
    return (
        <div>
            <h1 className='text-4xl mt-5'>{heading} <br /> <span className='text-green-600' >{coloredHeading}</span> </h1>

        </div>
    );
};

export default SectionTitle;