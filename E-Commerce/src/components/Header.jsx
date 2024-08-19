import logo from "../assets/Logo.png";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`); // Navigate to search results
  };

  return (
    <div>
      <nav
        className={`mx-auto bg-white shadow z-50 fixed top-0 left-0 px-6 w-[100vw] rounded flex items-center justify-between font-semibold`}
      >
        <div className="min-w-24 mx-2">
          <Link to={"/"} className="">
            <img src={logo} alt="Govind Hub" className="h-16 mx-4" />
          </Link>
        </div>
        <form
          onSubmit={handleSearch}
          className="relative items-center m-4 bg-slate-100 rounded px-2 py-0.5 focus:outline-none w-[50%] mx-auto"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-50 w-full bg-transparent rounded-lg p-2 text-black focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="relative group">
            <Link>
              <div>Home</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[180px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link
                to="#"
                onClick={() => {
                  handleScroll("featured");
                }}
              >
                <div>Featured Products</div>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  handleScroll("topDeals");
                }}
              >
                <div>Top Deals</div>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  handleScroll("newArrivals");
                }}
              >
                <div>New Arrivals</div>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  handleScroll("bestSellers");
                }}
              >
                <div>Best Sellers</div>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  handleScroll("discountAndOffers");
                }}
              >
                <div>Discount and Offers</div>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  handleScroll("seasonalSpecials");
                }}
              >
                <div>Seasonal Specials</div>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  handleScroll("contact");
                }}
              >
                <div>Contact</div>
              </Link>
            </div>
          </div>
          <div className="relative group">
            <Link>
              <div>Mens</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[100px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link>
                <div>Shirts</div>
              </Link>
              <Link>
                <div>Sheos</div>
              </Link>
              <Link>
                <div>Watches</div>
              </Link>
              <Link>
                <div>Motorcycles</div>
              </Link>
            </div>
          </div>
          <div className="relative group">
            <Link>
              <div>Womens</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[100px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link>
                <div>Jewellery</div>
              </Link>
              <Link>
                <div>Tops</div>
              </Link>
              <Link>
                <div>Dresses</div>
              </Link>
              <Link>
                <div>Shoes</div>
              </Link>
              <Link>
                <div>Watches</div>
              </Link>
              <Link>
                <div>Bags</div>
              </Link>
              <Link>
                <div>Contact</div>
              </Link>
            </div>
          </div>
          <div className="relative group">
            <Link>
              <div>Accessories</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[180px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link>
                <div>Furniture</div>
              </Link>
              <Link>
                <div>Kitchen</div>
              </Link>
              <Link>
                <div>Sports</div>
              </Link>
              <Link>
                <div>Smart Phones</div>
              </Link>
              <Link>
                <div>Laptops</div>
              </Link>
              <Link>
                <div>Tablets</div>
              </Link>
              <Link>
                <div>Fragrances</div>
              </Link>
              <Link>
                <div>Skin Care</div>
              </Link>
              <Link>
                <div>Groceries</div>
              </Link>
              <Link>
                <div>Home Decoration</div>
              </Link>
              <Link>
                <div>Vehicle</div>
              </Link>
            </div>
          </div>
          <div className="relative group">
            <FaShoppingCart size={28} color="black" />
            <button
              style={{ padding: "0px 7px" }}
              className="font-semibold rounded-full text-sm px-1 py-0 absolute -top-2 -right-2 disabled cursor-none"
            >
              {user?.cart?.length}
            </button>
            <div className="flex-col text-sm text-nowrap items-center gap-2 flex-nowrap p-1 absolute z-10 bg-gray-100 bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              My Cart
            </div>
          </div>
          <div className="relative group">
            <FaRegHeart color="black" size={24} />
            <div className="flex-col text-sm text-nowrap items-center gap-2 flex-nowrap p-1 absolute z-10 bg-gray-100 bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              My Wishlist
            </div>
          </div>
          {user ? (
            <div className="relative group rounded-full overflow-hidden w-10 h-10 flex items-center justify-center border-2 border-gray-700">
              <Link to="/profile">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="object-cover"
                />
                <div className="flex-col text-sm text-nowrap items-center gap-2 flex-nowrap p-1 absolute z-10 bg-gray-100 bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
                  View Profile
                </div>
              </Link>
            </div>
          ) : (
            <Link to={"/signin"}>
              <button className="text-black p-2 px-4 font-semibold rounded my-5">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
