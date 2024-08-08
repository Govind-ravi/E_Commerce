import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PrimaryButton, Input } from "../components/CustomTags";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
  });
  const [passwordNotMatch, setPasswordNotMatch] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setPasswordNotMatch(false);
      return;
    }
    navigate("/");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const image = await imageToBase64(e.target.files[0]);
    setData({ ...data, profilePicture: image });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-[#08413b] w-[30%] p-6 mx-auto mt-4 rounded-lg shadow-lg">
      <form action="" className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center relative">
          <label className="text-white flex flex-col items-center">
            {data.profilePicture === "" && (
              <>
                <FaUserCircle
                  size={100}
                  color="#baf9e2"
                  className="text-center mt-2 "
                />
                Upload Picture
              </>
            )}
            {data.profilePicture !== "" && (
              <>
                <div className="rounded-full w-32 h-32 overflow-hidden border-4 border-teal-400">
                  <img
                    className="object-cover"
                    src={data.profilePicture}
                    alt="User Profile"
                  />
                </div>
                Change Picture
              </>
            )}
            <input
              type="file"
              name="profilePicture"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
        <Input
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          className="rounded-lg text-black p-3"
        />
        <Input
          name="email"
          value={data.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="rounded-lg text-black p-3"
        />
        <div className="flex items-center bg-white justify-between rounded-lg shadow-sm">
          <Input
            name="password"
            value={data.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="rounded-lg text-black p-3"
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
            name="confirmPassword"
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="rounded-lg text-black p-3 focus:outline-none"
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
        {!passwordNotMatch && (
          <p className="text-red-500 text-center">Passwords do not match.</p>
        )}
        <PrimaryButton className="rounded-lg p-2 w-24 mx-auto bg-teal-500 hover:bg-teal-600 transition duration-200">
          Sign Up
        </PrimaryButton>
        <Link
          to="/signin"
          className="text-blue-500 hover:text-blue-600 text-center"
        >
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
