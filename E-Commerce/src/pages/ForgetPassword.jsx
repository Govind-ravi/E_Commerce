import React from "react";
import { FaLockOpen } from "react-icons/fa";
import { PrimaryButton, Input } from "../components/CustomTags";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-[#08413b] w-[30%] p-6 mx-auto mt-10 rounded-lg shadow-lg">
      <form action="" className="flex flex-col gap-6">
        <FaLockOpen
          size={100}
          color="#baf9e2"
          className="text-center my-5 self-center"
        />
        <h2 className="text-[#baf9e2] text-2xl text-center mb-4">
          Reset Your Password
        </h2>
        <Input
          type="email"
          placeholder="Enter your email"
          className="rounded-lg text-black p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <p className="text-[#d3d7d6] text-center">
          We will send you an email with instructions to reset your password.
        </p>
        <PrimaryButton className="rounded-lg p-2  mx-auto bg-teal-500 hover:bg-teal-600 transition duration-200">
          Send Email
        </PrimaryButton>
        <Link to={"../signin"} className="text-blue-500 hover:text-blue-600 text-center">
          Remember your password? Sign In
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
