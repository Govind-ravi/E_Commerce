import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PrimaryButton, Input } from "../components/CustomTags";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import APIs from "../APIs";
import Context from "../context";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [verifyAdmin, setVerifyAdmin] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { fetchUserDetails } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => {
      return { ...data, [name]: value };
    });
  };

  const handleCheckboxChange = () => {
    setIsAdmin((prev) => {
      return !prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(APIs.SignIn.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const Data = await dataResponse.json();

      if (Data.error) {
        return alert(Data.message);
      }
      if (isAdmin) {
        if (Data.data.role !== "admin") {
          return setVerifyAdmin(false);
        } else {
          return setVerifyAdmin(true);
        }
      }
    } catch (error) {
      console.error(error);
      return alert("Failed to sign in");
    }

    navigate("/");
    fetchUserDetails();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-[#08413b] w-[30%] p-6 mx-auto mt-10 rounded-lg shadow-lg">
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FaUserCircle
          size={100}
          color="#baf9e2"
          className="text-center my-5 self-center"
        />
        <Input
          name="email"
          onChange={handleChange}
          value={data.email}
          type="email"
          placeholder="Email"
          className="rounded-lg text-black p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex items-center bg-white justify-between rounded-lg shadow-sm">
          <Input
            name="password"
            onChange={handleChange}
            value={data.password}
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
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={handleCheckboxChange}
            className="mr-2 scale-150"
          />
          Are you admin
        </label>
            {!verifyAdmin && <p className="text-red-500 text-center">You are not an admin! Get access to be admin after sign In</p>}
        


        <Link
          to="../forgotpassword"
          className="text-blue-500 hover:text-blue-600 text-center"
        >
          Forgot Password?
        </Link>
        <PrimaryButton className="rounded-lg p-2 w-24 mx-auto bg-teal-500 hover:bg-teal-600 transition duration-200">
          Sign In
        </PrimaryButton>

        <Link
          to="/signup"
          className="text-blue-500 hover:text-blue-600 text-center"
        >
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
