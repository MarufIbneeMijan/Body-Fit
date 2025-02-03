import React from 'react';
import useAuth from '../Hooks/useAuth';

const Profile = () => {
    const {user} = useAuth()
    console.log(user)
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello {user?.displayName}</h1>
      <p className="py-6">
      Your Email is : {user.email} <br />
      Last Login : {user.metadata.lastSignInTime }
      </p>
     
    </div>
  </div>
</div>
    );
};

export default Profile;