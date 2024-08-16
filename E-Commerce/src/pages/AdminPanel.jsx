import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const AdminPanel = () => {
  const user = useSelector((action) => action?.user?.user);

  return (
    <>
      {user && user.role !== "admin" ? (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-300 p-4 text-white">
            <h1 className="text-2xl font-bold">Admin Panel {user && user.role !== "admin" &&  <span>(This is Just to show the demo of admin panel)</span>}</h1>
          </header>
          <div className="flex p-2">
            <nav className="w-64 bg-white p-4 shadow-lg flex flex-col items-center">
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
                  <Link
                    to="/adminpanel"
                    className="text-teal-500 hover:underline"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/adminpanel/users"
                    className="text-teal-500 hover:underline"
                  >
                    Manage Users
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/adminpanel/products"
                    className="text-teal-500 hover:underline"
                  >
                    Manage Products
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/adminpanel/orders"
                    className="text-teal-500 hover:underline"
                  >
                    Manage Orders
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/adminpanel/collections"
                    className="text-teal-500 hover:underline"
                  >
                    Manage Collections
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/adminpanel/reports"
                    className="text-teal-500 hover:underline"
                  >
                    View Reports
                  </Link>
                </li>
              </ul>
            </nav>
            <main className="flex-1 p-4">
                <Outlet/>
                
            </main>
          </div>
        </div>
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
