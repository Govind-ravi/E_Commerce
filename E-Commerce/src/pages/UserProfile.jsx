import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import APIs from "../APIs";
import { PrimaryButton } from "../components/CustomTags";
import { useNavigate } from "react-router-dom";
import {removeUser} from '../store/userSlice'

const UserProfile = () => {
  const user = useSelector((action) => action?.user?.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signOutClickHandler = async () => {
    try {
      const response = await fetch(APIs.signOut.url, {
          method: 'GET',
          credentials: 'include',
      });
      
      if (!response.ok) {
          throw new Error('Failed to sign out');
      }

      const data = await response.json();
      dispatch(removeUser())
      navigate('../')
  } catch (error) {

  }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-4">
      <div className="flex flex-col items-center">
        <div className="rounded-full w-36 h-36 overflow-hidden border-4 border-teal-400">
          {user && user.profilePicture ? (
            <img
              className="object-cover w-full h-full"
              src={user.profilePicture}
              alt="User Profile"
            />
          ) : (
            <FaUserCircle size={144} color="#baf9e2" />
          )}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user? user.name : 'Loading...'}
        </h2>
        <p className="text-gray-600">{user? user.email : 'Loading...'}</p>
        <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200">
          Edit Profile
        </button>
        <PrimaryButton
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          onClick={signOutClickHandler}
        >Sign Out</PrimaryButton>
      </div>
    </div>
  );
};

export default UserProfile;
