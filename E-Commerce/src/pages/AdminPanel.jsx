import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AdminPanel = () => {
  const user = useSelector((action) => action?.user?.user);
  const [isSideBarMenu, setIsSideBarMenu] = useState(true);

  return (
    <>
      <Helmet>
        <title>Govind Hub - Admin Panel</title>
        <meta
          name="description"
          content="Manage your products, orders, and users on the Govind Hub Admin Panel."
        />
        <meta
          name="keywords"
          content="Govind Hub, admin panel, manage products, manage orders, manage users"
        />
      </Helmet>

      {(user && user?.role === "admin") || user?.role === "user" ? (
        <>
          <div className="relative min-h-screen bg-gray-100">
            <header className="bg-blue-300 p-4 text-white">
              <h1 className="text-2xl font-bold">
                Admin Panel{" "}
                {user && user?.role !== "admin" && (
                  <span>(This is Just to show the demo of admin panel)</span>
                )}
              </h1>
            </header>
            <div className="flex p-2">
              <nav className="hidden w-64 bg-white p-4 shadow-lg lg:flex flex-col items-center">
                <div className="rounded-full w-36 h-36 overflow-hidden border-4 border-teal-400">
                  {user.profilePicture ? (
                    <img
                      className="object-cover w-full h-full"
                      src={user.profilePicture}
                      alt="User Profile"
                    />
                  ) : (
                    <FaUserCircle size={144} color="#baf9e2" />
                  )}
                </div>
                <ul className="flex flex-col items-center gap-2 mt-4">
                  <li className="mb-2">
                    <Link to="/adminpanel" className=" hover:underline">
                      Dashboard
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/adminpanel/users" className=" hover:underline">
                      Manage Users
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/adminpanel/products"
                      className=" hover:underline"
                    >
                      Manage Products
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/adminpanel/orders" className=" hover:underline">
                      Manage Orders
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/adminpanel/collections"
                      className=" hover:underline"
                    >
                      Manage Collections
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/adminpanel/reports" className=" hover:underline">
                      View Reports
                    </Link>
                  </li>
                </ul>
              </nav>
              <div
                onClick={() => setIsSideBarMenu(true)}
                className="lg:hidden absolute  top-0 px-4 py-6 right-0 cursor-pointer rounded-full text-black"
              >
                <FaUserCircle size={32} />
              </div>
              <main className="flex-1 p-4">
                <Outlet />
              </main>
            </div>
            {isSideBarMenu && (
              <div
                className="w-[100vw] h-[100vw] fixed z-[100]"
                onClick={() => setIsSideBarMenu(false)}
              ></div>
            )}

            {/* sidebar menu */}
            <div
              className={`lg:hidden bg-gray-700 fixed top-20 h-[80vh] w-[300px]  z-[100] overflow-y-scroll transform ${
                isSideBarMenu ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              <div
                className="fixed right-2 top-2 p-2"
                onClick={() => setIsSideBarMenu(false)}
              >
                <FaWindowClose color="white" size={24} />
              </div>
              <nav className="lg:hidden w-full py-8 px-4 shadow-lg flex-col items-center font-semibold text-gray-100 text-xl">
                <div className="rounded-full w-36 h-36 overflow-hidden border-4 mx-auto">
                  {user.profilePicture ? (
                    <img
                      className="object-cover w-full h-full"
                      src={user.profilePicture}
                      alt="User Profile"
                    />
                  ) : (
                    <FaUserCircle size={144} color="#baf9e2" />
                  )}
                </div>
                <ul className="flex flex-col items-center gap-2 mt-4">
                  <li className="mb-2">
                    <Link
                      to="/adminpanel"
                      className=" hover:underline"
                      onClick={() => setIsSideBarMenu(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      onClick={() => setIsSideBarMenu(false)}
                      to="/adminpanel/users"
                      className=" hover:underline"
                    >
                      Manage Users
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      onClick={() => setIsSideBarMenu(false)}
                      to="/adminpanel/products"
                      className=" hover:underline"
                    >
                      Manage Products
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      onClick={() => setIsSideBarMenu(false)}
                      to="/adminpanel/orders"
                      className=" hover:underline"
                    >
                      Manage Orders
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      onClick={() => setIsSideBarMenu(false)}
                      to="/adminpanel/collections"
                      className=" hover:underline"
                    >
                      Manage Collections
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      onClick={() => setIsSideBarMenu(false)}
                      to="/adminpanel/reports"
                      className=" hover:underline"
                    >
                      View Reports
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      ) : (
        <center className="text-white font-semibold text-3xl">
          <h1>Access Denied</h1>
          <p>You are not authorized to access this page.</p>
          <Link to="/" className="text-blue-700 text-xl">
            Return to Home
          </Link>
        </center>
      )}
    </>
  );
};

export default AdminPanel;
