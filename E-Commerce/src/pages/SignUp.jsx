import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PrimaryButton, Input } from "../components/CustomTags";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-[#08413b] w-[30%] p-6 mx-auto mt-4 rounded-lg shadow-lg">
      <form action="" className="flex flex-col gap-6">
        <FaUserCircle
          size={100}
          color="#baf9e2"
          className="text-center my-5 self-center"
        />
        <Input
          type="text"
          placeholder="Full Name"
          className="rounded-lg text-black p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
        <div className="flex items-center bg-white justify-between rounded-lg shadow-sm">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="rounded-lg text-black p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div
            onClick={toggleConfirmPasswordVisibility}
            className="cursor-pointer p-3 hover:bg-gray-200 rounded-lg"
          >
            {showConfirmPassword ? (
              <IoMdEyeOff size={24} className="text-teal-500" />
            ) : (
              <IoMdEye size={24} className="text-teal-500" />
            )}
          </div>
        </div>
        <PrimaryButton className="rounded-lg p-2 w-24 mx-auto bg-teal-500 hover:bg-teal-600 transition duration-200">
          Sign Up
        </PrimaryButton>
        <Link to="/signin" className="text-blue-500 hover:text-blue-600 text-center">
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
