import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button, Input } from "../components/CustomTags";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import APIs from "../APIs";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Context from "../context";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    role: "user",
  });
  console.log(data);

  const { fetchUserDetails } = useContext(Context);

  const [passwordNotMatch, setPasswordNotMatch] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setPasswordNotMatch(false);
      return;
    }

    try {
      const dataResponse = await fetch(APIs.SignUp.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const Data = await dataResponse.json();

      if (Data.error) {
        return alert(Data.message);
      }
    } catch (error) {
      return console.log(error);
    }

    await fetchUserDetails();
    navigate("/");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      setLoading(true); // Set loading to true before upload
      const storageRef = ref(storage, `profilePictures/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setData({ ...data, profilePicture: url });
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="flex max-w-[60vw] mx-auto mt-8 items-center h-[70vh]">
      <div className="primaryDiv h-full flex flex-col justify-center items-center w-[50%] gap-2">
        <h1 className="text-3xl font-bold text-center">Create your account!</h1>
        <p className="text-center font-semibold">
        Sign up to unlock exclusive features and stay updated with your latest activities. It only takes a few moments to get started!
        </p>
      </div>
      <div className="secondaryDiv w-[50%] h-full px-14 py-4 bg-white">
        <center className="font-semibold">
          <label className=" flex flex-col items-center">
            {data.profilePicture === "" && (
              <>
                <FaUserCircle
                  size={100}
                  color="black"
                  className="text-center mt-2 "
                />
                {loading ? "Uploading..." : "Upload Picture"}
              </>
            )}
            {data.profilePicture !== "" && (
              <>
                <div className="rounded-full w-32 h-32 overflow-hidden border-4">
                  <img
                    className="object-cover"
                    src={data.profilePicture}
                    alt="User Profile"
                  />
                </div>
                {loading ? "Changing..." : "Change Picture"}
              </>
            )}
            <input
              type="file"
              name="profilePicture"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </center>
        <form action="" className="flex flex-col gap-6 font-semibold" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center relative"></div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                name="name"
                value={data.name}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent rounded-lg focus:outline-none"
              />
              <FaUser size={24} />
            </div>
            <div className="h-[0.075rem] mt-2 bg-black"></div>
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                name="email"
                onChange={handleChange}
                value={data.email}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent rounded-lg focus:outline-none"
              />
              <MdEmail size={24} />
            </div>
            <div className="h-[0.125rem] mt-2 bg-black"></div>
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                name="password"
                onChange={handleChange}
                value={data.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="bg-transparent rounded-lg focus:outline-none w-full"
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-0 cursor-pointer"
              >
                {showPassword ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </div>
            </div>
            <div className="h-[0.075rem] bg-black mt-2"></div>{" "}
            {/* Line for password */}
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                name="confirmPassword"
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="bg-transparent rounded-lg focus:outline-none w-full"
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-0 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </div>
            </div>
            <div className="h-0.5 bg-black mt-2"></div>
          </div>
          {!passwordNotMatch && (
            <p className="text-red-500 text-center">Passwords do not match.</p>
          )}

          <div className="flex flex-col gap-2">
            <Button
              disabled={loading}
              className="font-semibold text-black rounded p-2 w-24 mx-auto bg-[#cc80f9] transition duration-200"
            >
              Sign Up
            </Button>
            <Link
              to="/signin"
              className="text-center"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
