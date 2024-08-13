import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {  Button, Input } from "../components/CustomTags";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import APIs from "../APIs";
import Context from "../context";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [verifyAdmin, setVerifyAdmin] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => {
      return { ...data, [name]: value };
    });
  };

  const handleCheckboxChange = () => {
    setIsAdmin((prev) => !prev);
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
    <>
      <div className="flex max-w-[60vw] mx-auto mt-10 items-center h-[70vh] text-black">
        <div className="primaryDiv h-full flex flex-col justify-center items-center w-[50%] gap-2">
          <h1 className="text-3xl font-bold text-center">Hello User!</h1>
          <p className="text-center font-semibold">
            Sign in to your account and stay updated with your latest
            activities. Let's get you logged in and ready to go!
          </p>
        </div>
        <div className="secondaryDiv w-[50%] h-full px-14 bg-white">
          <center className="mb-8 my-4">
            <FaUserCircle
              size={100}
              color="black"
              className="text-center self-center"
            />
            <p className="font-bold text-xl">Login</p>
          </center>
          <form
            action=""
            className="flex flex-col gap-10"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="relative flex items-center justify-between rounded-lg">
                <input
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  type="email"
                  placeholder="Email"
                  className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                />
                <MdEmail size={24}/>
              </div>
              <div className="h-[0.075rem] mt-2 bg-black"></div>
            </div>
            <div>
              <div className="relative flex items-center justify-between rounded-lg">
                <input
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="font-semibold  bg-transparent rounded-lg focus:outline-none w-full"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 cursor-pointer"
                >
                  {showPassword ? (
                    <IoMdEyeOff size={24}/>
                  ) : (
                    <IoMdEye size={24} />
                  )}
                </div>
              </div>
              <div className="h-0.5 bg-black mt-2"></div>
              {/* Line for password */}
            </div>
            <label className="flex items-center font-semibold">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={handleCheckboxChange}
                className="mr-2 scale-150"
              />
              Are you admin
            </label>
            {!verifyAdmin && (
              <p className="text-red-500 text-center">
                You are not an admin! Get access to be admin after sign In
              </p>
            )}
            <div className="flex flex-col gap-2 font-semibold ">
              <Link to="../forgotpassword" className="text-center">
                Forgot Password?
              </Link>
              <Button className="font-semibold text-black rounded p-2 w-24 mx-auto bg-[#cc80f9] transition duration-200">
                Sign In
              </Button>
              <Link to="/signup" className="text-center">
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
