import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import APIs from "../APIs";
import { FiShoppingBag } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";
import { FaLocationDot } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const UserProfile = () => {
  const user = useSelector((action) => action?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSideBarMenu, setIsSideBarMenu] = useState(true);

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

  useEffect(() => {
    // setIsSideBarMenu(true)
  }, []);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-200px)] w-full">
        <div className="hidden bg-amber-200 w-[25%] p-4 pt-4 lg:flex flex-col gap-4 rounded-l">
          <center>
            <div className=" relative rounded-full w-36 h-36 border-4 border-slate-400">
              {user && user.profilePicture ? (
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={user.profilePicture}
                  alt="User Profile"
                />
              ) : (
                <FaUserCircle size={144} color="#baf9e2" />
              )}
              <div className="absolute bg-gray-400 rounded-full p-1 bottom-0 right-0">
                <Link to={"/profile/update"}>
                  <MdEdit size={24} />
                </Link>
              </div>
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
            <div className="flex gap-2 items-center">
              <FaLocationDot size={24} />
              <Link to={"/profile/myaddress"} state={{ user: user }}>
                My Address
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <MdAdminPanelSettings size={24} />
              <Link to={"/adminpanel"} state={{ user: user }}>
                Admin Panel{" "}
                {user && user.role !== "admin" && <span>(Demo)</span>}
              </Link>
            </div>
          </div>
          <button
            onClick={signOutClickHandler}
            className="mx-auto p-2 text-white rounded bg-gray-500"
          >
            Sign Out
          </button>
        </div>
        <div
          onClick={() => setIsSideBarMenu(true)}
          className="lg:hidden absolute  top-0 px-4 py-6 right-0 cursor-pointer rounded-full text-black"
        >
          <FaUserCircle size={32} />
        </div>
        <Outlet />
        {isSideBarMenu && (
          <div
            className="w-[100vw] h-[100vw] fixed z-[100]"
            onClick={() => setIsSideBarMenu(false)}
          ></div>
        )}

        {/* SideMenu */}
        <div
          className={`lg:hidden fixed top-20 h-[80vh] w-[300px]  z-[100] overflow-y-scroll transform ${
            isSideBarMenu ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div
            className="fixed right-2 top-2 p-2"
            onClick={() => setIsSideBarMenu(false)}
          >
            <FaWindowClose color="white" size={24} />
          </div>
          <div className="w-full bg-opacity-95 text-white bg-gray-700 p-4 pt-4 lg:hidden flex-col gap-4 rounded-l">
            <center>
              <div className=" relative rounded-full w-36 h-36 border-4 border-slate-400">
                {user && user.profilePicture ? (
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={user.profilePicture}
                    alt="User Profile"
                  />
                ) : (
                  <FaUserCircle size={144} color="#baf9e2" />
                )}
                <div className="absolute bg-gray-400 rounded-full p-1 bottom-0 right-0">
                  <Link to={"/profile/update"}>
                    <MdEdit size={24} onClick={() => setIsSideBarMenu(false)} />
                  </Link>
                </div>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-gray-100">
                {user ? user.name : "Loading..."}
              </h2>
              <p className="text-gray-100">
                {user ? user.email : "Loading..."}
              </p>
            </center>
            <div className="flex flex-col p-4 font-semibold gap-4">
              <div className="flex gap-2 items-center">
                <FiShoppingBag size={24} />
                <Link
                  to={"/profile/myorders"}
                  onClick={() => setIsSideBarMenu(false)}
                >
                  My Orders
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <TiShoppingCart size={24} />
                <Link to={""} onClick={() => setIsSideBarMenu(false)}>
                  My Cart
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <FaRegHeart size={24} />
                <Link
                  to={"/profile/mywishlist"}
                  onClick={() => setIsSideBarMenu(false)}
                >
                  My Wishlist
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <FaLocationDot size={24} />
                <Link
                  to={"/profile/myaddress"}
                  state={{ user: user }}
                  onClick={() => setIsSideBarMenu(false)}
                >
                  My Address
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <MdAdminPanelSettings size={24} />
                <Link
                  to={"/adminpanel"}
                  state={{ user: user }}
                  onClick={() => setIsSideBarMenu(false)}
                >
                  Admin Panel{" "}
                  {user && user.role !== "admin" && <span>(Demo)</span>}
                </Link>
              </div>
            </div>
            <button
              onClick={signOutClickHandler}
              className="mx-auto p-2 text-white rounded bg-gray-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
