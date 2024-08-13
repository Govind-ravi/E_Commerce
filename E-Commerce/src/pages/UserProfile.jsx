import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import APIs from "../APIs";
import { FiShoppingBag } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";

const UserProfile = () => {
  const user = useSelector((action) => action?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutClickHandler = async () => {
    try {
      const response = await fetch(APIs.signOut.url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      const data = await response.json();
      dispatch(removeUser());
      navigate("../");
    } catch (error) {}
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-200px)] w-[80%] mx-auto my-8">
        <div className="primaryDiv w-[25%] p-4 pt-4 flex flex-col gap-4 rounded-l">
          <center>
            <div className="rounded-full w-36 h-36 overflow-hidden border-4 border-slate-400">
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
            <h2 className="mt-2 text-2xl font-semibold text-gray-800">
              {user ? user.name : "Loading..."}
            </h2>
            <p className="text-gray-600">{user ? user.email : "Loading..."}</p>
          </center>
          <div className="flex flex-col p-4 font-semibold gap-4">
            <div className="flex gap-2 items-center">
              <FiShoppingBag size={24} />
              <Link to={"/profile/myorders"}>My Orders</Link>
            </div>
            <div className="flex gap-2 items-center">
              <TiShoppingCart size={24} />
              <Link to={""}>My Cart</Link>
            </div>
            <div className="flex gap-2 items-center">
              <FaRegHeart size={24} />
              <Link to={"/profile/mywishlist"}>My Wishlist</Link>
            </div>
          </div>
          <button
            onClick={signOutClickHandler}
            className="mx-auto p-2 text-white rounded"
          >
            Sign Out
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default UserProfile;
