import logo from "../assets/Logo.png";
import React from "react";
import { Input, PrimaryButton } from "./CustomTags";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header() {
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
        <div className="flex gap-4 items-center mx-10">
          <FaRegCircleUser size={30} color="white" />
          <div className="relative">
            <FaShoppingCart size={28} color="white" />
            <PrimaryButton
              style={{ padding: "0px 7px" }}
              className="rounded-full text-sm px-1 py-0 font-normal absolute -top-2 -right-2"
            >
              0
            </PrimaryButton>
          </div>
          <Link to={"/signin"}>
            <PrimaryButton className="my-5">Login</PrimaryButton>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
