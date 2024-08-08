import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PrimaryButton, Input } from "../components/CustomTags";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-[#08413b] w-[30%] p-6 mx-auto mt-10 rounded-lg shadow-lg">
      <form action="" className="flex flex-col gap-4">
        <FaUserCircle
          size={100}
          color="#baf9e2"
          className="text-center my-5 self-center"
        />
        <Input
          type="text"
          placeholder="Email"
          className="rounded-lg text-black p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex items-center bg-white justify-between rounded-lg shadow-sm">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="rounded-lg text-black p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div
            onClick={togglePasswordVisibility}
            className="cursor-pointer p-3 hover:bg-gray-200 rounded-lg"
          >
            {showPassword ? (
              <IoMdEyeOff size={24} className="text-teal-500" />
            ) : (
              <IoMdEye size={24} className="text-teal-500" />
            )}
            
          </div>
          
        </div>
        
        <Link to="../forgotpassword" className="text-blue-500 hover:text-blue-600 text-center">
          Forgot Password?
        </Link>
        <PrimaryButton className="rounded-lg p-2 w-24 mx-auto bg-teal-500 hover:bg-teal-600 transition duration-200">
          Sign In
        </PrimaryButton>
        
        <Link to="/signup" className="text-blue-500 hover:text-blue-600 text-center">
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
