import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Components/Nav';

const HomeLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;