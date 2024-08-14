import logo from "../assets/Logo.png";
import React, { useState } from "react";
import { Button, Input } from "./CustomTags";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`); // Navigate to search results
  };

  return (
    <div>
      <nav className="py-2 px-6 w-full flex items-center justify-between font-semibold">
        <div className="w-full">
          <Link to={"/"}>
            <img src={logo} alt="Govind Hub" className="h-16 mx-4" />
          </Link>
        </div>
        <form
          onSubmit={handleSearch}
          className="relative items-center m-5 bg-slate-100 rounded px-2 focus:outline-none w-full mx-auto"
        >
          <Input
            type="text"
            placeholder="Search..."
            className="bg-slate-50 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          />
          <button>
            <GoSearch
              size={28}
              color="#1d564e"
              className="absolute right-0 top-1 m-1"
            />
          </button>
        </form>
        <div className="flex gap-6 items-center mx-10">
          <div>Home</div>
          <div>Mens</div>
          <div>Womens</div>
          <div>Accessories</div>
          <div className="relative">
            <FaShoppingCart size={28} color="black" />
            <Button
              style={{ padding: "0px 7px" }}
              className="font-semibold rounded-full text-sm px-1 py-0 absolute -top-2 -right-2"
            >
              0
            </Button>
          </div>
          <FaRegHeart color="black" size={24} />
          {user ? (
            <div className="rounded-full overflow-hidden w-9 h-9 flex items-center justify-center">
              <Link to="/profile">
                <img
                  src={user.profilePicture}
                  width={36}
                  alt=""
                  className="object-cover"
                />
              </Link>
            </div>
          ) : (
            <Link to={"/signin"}>
              <Button className="text-black p-2 px-4 font-semibold rounded my-5">
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
