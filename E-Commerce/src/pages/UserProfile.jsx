import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {useSelector} from 'react-redux'

const UserProfile = () => {
  const user = useSelector((action)=> action?.user?.user)
  console.log(user);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4">
      <div className="flex flex-col items-center">
        <div className="rounded-full w-36 h-36 overflow-hidden border-4 border-teal-400">
           {user.profilePicture ? (
            <img
              className="object-cover w-full h-full"
              src={user.profilePicture}
              alt="User Profile"
            />
           ) : ( 
            <FaUserCircle size={100} color="#baf9e2" />
          )} 
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button
          className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
