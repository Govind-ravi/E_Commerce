import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import APIs from "../APIs";
import Context from "../context";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user.user);
  const { fetchUserDetails } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false);
  const [success, setsuccess] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    newPassword: "",
    confirmPassword: "",
  });
  console.log(data);

  // Effect to update data when user changes
  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        email: user.email || "",
        profilePicture: user.profilePicture || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordMismatch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user profile
      const profileResponse = await fetch(APIs.updateProfile.url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          profilePicture: data.profilePicture,
        }),
      });

      const profileData = await profileResponse.json();
      if (profileResponse.status === 200) {
        fetchUserDetails();
        setEmailError(false);
      } else {
        if (profileData.message === "Email already exists") {
          setEmailError(true);
        }
      }

      setData((data) => {
        return {
          ...data,
          name: user.name || "",
          email: user.email || "",
          profilePicture: user.profilePicture || "",
        };
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.newPassword !== data.confirmPassword) {
      setPasswordMismatch(true);
      setLoading(false);
      return;
    }

    if (data.newPassword !== "") {
      const passwordResponse = await fetch(APIs.updatePassword.url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: data.password,
          newPassword: data.newPassword,
        }),
      });

      const passwordData = await passwordResponse.json();
      if (passwordResponse.status === 200) {
        setUpdatePasswordVisible(false);
        alert("Password updated successfully");
      } else {
        // Handle password update error
        alert("Error updating password: " + passwordData.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleUpdatePasswordClick = () => {
    setUpdatePasswordVisible((prev) => !prev);
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

  return (
    <div className="w-[300px] mx-auto border bg-white shadow my-4 lg:mx-2 rounded py-4 px-8">
      {user ? (
        <>
          <form
            className="flex flex-col gap-6 font-semibold"
            onSubmit={handleSubmit}
          >
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

            <div>
              <div className="relative flex items-center justify-between rounded-lg">
                <input
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent rounded-lg focus:outline-none"
                  required
                />
              </div>{" "}
              <div className="h-[0.05rem] mt-2 bg-black"></div>
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
                  required
                />
                {emailError && (
                  <p className="text-red-500">Email already registered</p>
                )}
              </div>
              <div className="h-[0.05rem] mt-2 bg-black"></div>
            </div>

            {updatePasswordVisible && (
              <>
                <div className="relative">
                  <input
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Current Password"
                    className="bg-transparent rounded-lg focus:outline-none w-full"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-0 cursor-pointer"
                  >
                    {showPassword ? (
                      <IoMdEyeOff size={24} />
                    ) : (
                      <IoMdEye size={24} />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input
                    name="newPassword"
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="bg-transparent rounded-lg focus:outline-none w-full"
                  />
                  <div
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-0 top-0 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <IoMdEyeOff size={24} />
                    ) : (
                      <IoMdEye size={24} />
                    )}
                  </div>
                </div>
                <div>
                  <input
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm New Password"
                    className="bg-transparent rounded-lg focus:outline-none w-full"
                  />
                  {passwordMismatch && (
                    <p className="text-red-500">Passwords do not match</p>
                  )}
                </div>
              </>
            )}

            {updatePasswordVisible ? (
              <button
                type="button"
                onClick={handleChangePassword}
                className="mx-auto py-1 px-2 rounded cursor-pointer"
              >
                {" "}
                Save Password
              </button>
            ) : (
              <a
                type="button"
                onClick={handleUpdatePasswordClick}
                className="rounded cursor-pointer text-teal-800"
              >
                Update Password
              </a>
            )}

            <button
              disabled={loading}
              className="font-semibold text-black rounded p-2 w-24 mx-auto bg-[#cc80f9] transition duration-200"
            >
              Update
            </button>
          </form>
        </>
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
};

export default UpdateProfile;
