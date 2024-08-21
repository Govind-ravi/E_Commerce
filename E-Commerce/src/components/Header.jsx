import logo from "../assets/Logo.png";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import APIs from "../APIs";
import AccordionMenu from "./AccordianMenu";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    const navbarHeight = 80; // Adjust this to the height of your navbar

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      console.log(searchTerm.trim());

      return;
    }
    navigate(`/search?query=${searchTerm.trim()}`); // Navigate to search results
  };

  const [collections, setCollections] = useState([]);

  const fetchAllCollections = async () => {
    try {
      const response = await fetch(APIs.allCollections.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCollections(data.data);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  useEffect(() => {
    fetchAllCollections(); // Fetch collections only once when the component mounts
  }, []);

  const [isSideBarMenu, setIsSideBarMenu] = useState(false);

  return (
    <div>
      <nav
        className={`mx-auto bg-white shadow z-50 fixed top-0 left-0  lg:px-6 w-[100vw] rounded flex items-center justify-between font-semibold`}
      >
        <div className="md:min-w-24 mx-2">
          <Link to={"/"} className="">
            <img
              src={logo}
              alt="Govind Hub"
              className="h-12 xss:h-14 md:h-16 mx-4"
            />
          </Link>
        </div>
        <div className="text-sm xxs:text-lg xs:text-xl xs:hidden">
          GOVIND<span className="text-amber-500">HUB</span>
        </div>
        <form
          onSubmit={handleSearch}
          className="hidden xs:block relative items-center m-4 bg-slate-100 rounded px-2 py-0.5 focus:outline-none w-[50%] mx-auto"
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
        <div className="flex gap-4 lg:gap-6 items-center mx-4 lg:mx-10">
          <div className="hidden md:block relative group">
            <Link to="/">
              <div>Home</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[180px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              {collections.map((collection) => (
                <Link
                  key={collection._id}
                  to="#"
                  onClick={() => {
                    handleScroll(collection.collectionName);
                  }}
                >
                  <div>{collection.collectionName}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block relative group">
            <Link
              to=""
              onClick={() => {
                handleScroll("Mens");
              }}
            >
              <div>Mens</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[100px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link to="/category/mens-shirts">
                <div>Shirts</div>
              </Link>
              <Link to="/category/mens-shoes">
                <div>Sheos</div>
              </Link>
              <Link to="/category/mens-watches">
                <div>Watches</div>
              </Link>
              <Link to="/category/motorcycle">
                <div>Motorcycles</div>
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative group">
            <Link>
              <div
                onClick={() => {
                  handleScroll("Womens");
                }}
              >
                Womens
              </div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[100px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link to="/category/womens-jewellery">
                <div>Jewellery</div>
              </Link>
              <Link to="/category/tops">
                <div>Tops</div>
              </Link>
              <Link to="/category/womens-dresses">
                <div>Dresses</div>
              </Link>
              <Link to="/category/womens-shoes">
                <div>Shoes</div>
              </Link>
              <Link to="/category/womens-watches">
                <div>Watches</div>
              </Link>
              <Link to="/category/womens-bags">
                <div>Bags</div>
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative group">
            <Link
              onClick={() => {
                handleScroll("Accessories");
              }}
            >
              <div>Accessories</div>
            </Link>
            <div className="flex-col items-center gap-2 flex-wrap p-2 absolute w-[180px] z-10 bg-white bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <Link to="/category/furniture">
                <div>Furniture</div>
              </Link>
              <Link to="/category/kitchen-accessories">
                <div>Kitchen</div>
              </Link>
              <Link to="/category/sports-accessories">
                <div>Sports</div>
              </Link>
              <Link to="/category/smartphones">
                <div>Smart Phones</div>
              </Link>
              <Link to="/category/laptops">
                <div>Laptops</div>
              </Link>
              <Link to="/category/tablets">
                <div>Tablets</div>
              </Link>
              <Link to="/category/fragrances">
                <div>Fragrances</div>
              </Link>
              <Link to="/category/skin-care">
                <div>Skin Care</div>
              </Link>
              <Link to="/category/groceries">
                <div>Groceries</div>
              </Link>
              <Link to="/category/home-decoration">
                <div>Home Decoration</div>
              </Link>
              <Link to="/category/vehicle">
                <div>Vehicle</div>
              </Link>
            </div>
          </div>
          <div
            onClick={() => {
              handleScroll("footer");
            }}
            className="hidden lg:block relative group"
          >
            <Link>Contact</Link>
            <div className="flex-col text-sm text-nowrap items-center gap-2 flex-nowrap p-1 absolute z-10 bg-gray-100 bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
              <div>Contact</div>
            </div>
          </div>
          <div className="hidden md:block relative group">
            <Link to={`${user ? "/profile" : "/signin"}`}>
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
            </Link>
          </div>
          <div className="hidden md:block relative group">
            <Link to={`${user ? "/profile/mywishlist" : "/signin"}`}>
              <FaRegHeart color="black" size={24} />
              <div className="flex-col text-sm text-nowrap items-center gap-2 flex-nowrap p-1 absolute z-10 bg-gray-100 bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
                My Wishlist
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative group rounded-full overflow-hidden w-8 h-8 xs:w-10 xs:h-10 flex items-center justify-center border-2 border-gray-700">
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
                <button className="text-black py-0.5 px-1 xss:p-1 xs:p-2 xs:px-4 font-semibold rounded my-5">
                  Login
                </button>
              </Link>
            )}
            <div
              className="md:hidden xss:p-1"
              onClick={() => setIsSideBarMenu(true)}
            >
              <MdMenu size={32} />
            </div>
          </div>
        </div>
      </nav>

      <div>
        <form
          onSubmit={handleSearch}
          className="xs:hidden relative rounded-full items-center m-2 bg-gray-500 px-2 py-0.5 focus:outline-none w-[90%] mx-auto"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-50 w-full bg-transparent rounded-lg p-1 text-white placeholder:text-gray-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <GoSearch
              size={18}
              color="white"
              className="absolute right-0 top-1 m-1"
            />
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div
        className={`md:hidden fixed top-0 bg-gray-700 h-[100vh] w-[80%] xss:w-[70%] xs:w-[60vw] sm:w-[50vw] z-[200] overflow-y-scroll transform ${
          isSideBarMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div
          className="fixed right-2 top-2 p-2"
          onClick={() => setIsSideBarMenu(false)}
        >
          <FaWindowClose color="white" size={24} />
        </div>
        <div className="text-white p-4 text-lg font-semibold flex flex-col gap-4">
          <AccordionMenu
            setIsSideBarMenu={setIsSideBarMenu}
            collections={collections}
            handleScroll={handleScroll}
          />

          <Link to={`${user ? "/profile" : "/signin"}`}>
            <div className="relative group flex gap-2 items-center">
              <FaShoppingCart size={28} className="text-gray-200" />
              <div>My Cart {user?.cart?.length}</div>
            </div>
          </Link>
          <Link to={`${user ? "/profile/mywishlist" : "/signin"}`}>
            <div className="relative group flex gap-2 items-center">
              <FaRegHeart color="white" size={24} />
              <div>My Wishlist</div>
            </div>
          </Link>
        </div>
      </div>

      {isSideBarMenu && (
        <div
          onClick={() => setIsSideBarMenu(false)}
          className="md:hidden z-[90] bg-black opacity-50 w-[100vw] h-[100vh] fixed top-0 left-0"
        ></div>
      )}
    </div>
  );
}

export default Header;
