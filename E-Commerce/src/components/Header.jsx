import logo from "../assets/Logo.png";
import React from "react";
import { Input, PrimaryButton } from "./CustomTags";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  return (
    <div>
      <nav className="w-full flex rounded my-2 items-center justify-between">
        <img src={logo} alt="Govind Hub" className="h-20 mx-4" />
        <div className="flex items-center m-5 bg-slate-50 rounded px-2 focus:outline-none">
          <Input
            type={"text"}
            placeholder={"Search..."}
            className="bg-slate-50"
          />
          <GoSearch size={28} color="#1d564e" />
        </div>
        <div className="flex gap-6 items-center mx-10">
          <div className="relative">
            <FaShoppingCart size={28} color="white" />
            <PrimaryButton
              style={{ padding: "0px 7px" }}
              className="rounded-full text-sm px-1 py-0 font-normal absolute -top-2 -right-2"
            >
              0
            </PrimaryButton>
          </div>
          <FaRegHeart color="white" size={24}/>
          <Link to="/profile">
            <div className="rounded-full overflow-hidden w-9 h-9 flex items-center justify-center">
              {user ? (
                <img
                  src={user.profilePicture}
                  width={36}
                  alt=""
                  className="object-cover"
                />
              ) : (
                <Link to={"/signin"}>
                  <PrimaryButton className="my-5">Login</PrimaryButton>
                </Link>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
