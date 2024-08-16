import logo from "../assets/Logo.png";
import React, { useState } from "react";
import { Button, Input } from "./CustomTags";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleScroll = (id)=>{
    const element = document.getElementById(id);
    if(element){
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`); // Navigate to search results
  };

  return (
    <div>
      <nav className={`mx-auto  bg-white shadow-lg z-50 fixed top-0 left-0 py-2 px-6 w-[100vw] rounded flex items-center justify-between font-semibold`}>
        <div className="w-full">
          <Link to={"/"}>
            <img src={logo} alt="Govind Hub" className="h-24 mx-4"/>
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
          <div className="relative group">
            <Link>
              <div>Home</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[180px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link to='#' onClick={()=>{handleScroll('featured')}}><div>Featured Products</div></Link>
              <Link to='#' onClick={()=>{handleScroll('topDeals')}}><div>Top Deals</div></Link>
              <Link to='#' onClick={()=>{handleScroll('newArrivals')}}><div>New Arrivals</div></Link>
              <Link to='#' onClick={()=>{handleScroll('bestSellers')}}><div>Best Sellers</div></Link>
              <Link to='#' onClick={()=>{handleScroll('discountAndOffers')}}><div>Discount and Offers</div></Link>
              <Link to='#' onClick={()=>{handleScroll('seasonalSpecials')}}><div>Seasonal Specials</div></Link>
              <Link to='#' onClick={()=>{handleScroll('contact')}}><div>Contact</div></Link>
            </div>
          </div>
          <div className="relative group">
            <Link>
              <div>Mens</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[100px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link><div>Shirts</div></Link>
              <Link><div>Sheos</div></Link>
              <Link><div>Watches</div></Link>
              <Link><div>Motorcycles</div></Link>
            </div>
          </div>
          <div className="relative group">
            <Link>
              <div>Womens</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[100px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link><div>Jewellery</div></Link>
              <Link><div>Tops</div></Link>
              <Link><div>Dresses</div></Link>
              <Link><div>Shoes</div></Link>
              <Link><div>Watches</div></Link>
              <Link><div>Bags</div></Link>
              <Link><div>Contact</div></Link>
            </div>
          </div>
          <div className="relative group">
            <Link>
              <div>Accessories</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[180px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link><div>Furniture</div></Link>
              <Link><div>Kitchen</div></Link>
              <Link><div>Sports</div></Link>
              <Link><div>Smart Phones</div></Link>
              <Link><div>Laptops</div></Link>
              <Link><div>Tablets</div></Link>
              <Link><div>Fragrances</div></Link>
              <Link><div>Skin Care</div></Link>
              <Link><div>Groceries</div></Link>
              <Link><div>Home Decoration</div></Link>
              <Link><div>Vehicle</div></Link>
            </div>
          </div>
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
