import React from "react";
import { FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Input } from "../components/CustomTags";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="bg-[#cc80f9] w-[30%] p-6 px-12 mx-auto mt-10 rounded-lg shadow-lg font-semibold">
      <form action="" className="flex flex-col gap-6">
        <FaLockOpen
          size={100}
          color="white"
          className="text-center my-5 self-center"
        />
        <h2 className="text-black text-2xl text-center mb-4">
          Reset Your Password
        </h2>
        <div>
              <div className="relative flex items-center justify-between rounded-lg">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="placeholder-slate-700 font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                />
                <MdEmail size={24}/>
              </div>
              <div className="h-[0.075rem] mt-2 bg-black"></div>
            </div>
        <p className="text-center">
          We will send you an email with instructions to reset your password.
        </p>
        <button className="rounded-lg py-2 px-4 mx-auto bg-gray-800 text-white">
          Send Email
        </button>
        <Link to={"../signin"} className=" text-center">
          Remember your password? Sign In
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
