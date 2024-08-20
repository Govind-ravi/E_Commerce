import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const AccordionMenu = ({ collections, handleScroll, setIsSideBarMenu }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Home Section */}
      <div className="group ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleAccordion(0)}
        >
          <Link to="/">
            <div className="flex items-center">
              Home
              {openIndex === 0 ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </div>
          </Link>
        </div>
        <div
          className={`p-2 flex-col items-start gap-2 flex-wrap bg-gray-300 text-gray-700 rounded w-4/5 xss:w-2/3 overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === 0 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {collections.map((collection) => (
            <Link
              key={collection._id}
              to="#"
              onClick={() => {
                handleScroll(collection.collectionName);
                setIsSideBarMenu(false);
              }}
            >
              <div>{collection.collectionName}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mens Section */}
      <div className="group">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleAccordion(1)}
        >
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handleScroll("Mens");
            }}
          >
            <div className="flex items-center">
              Mens
              {openIndex === 1 ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </div>
          </Link>
        </div>
        <div
          className={`p-2 flex-col items-start gap-2 flex-wrap bg-gray-300 text-gray-700 rounded w-4/5 xss:w-2/3 overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === 1 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            to="/category/mens-shirts"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Shirts</div>
          </Link>
          <Link
            to="/category/mens-shoes"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Sheos</div>
          </Link>
          <Link
            to="/category/mens-watches"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Watches</div>
          </Link>
          <Link
            to="/category/motorcycle"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Motorcycles</div>
          </Link>
        </div>
      </div>

      {/* Womens Section */}
      <div className="group">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleAccordion(2)}
        >
          <div
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handleScroll("Womens");
            }}
          >
            <div className="flex items-center">
              Womens
              {openIndex === 2 ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </div>
          </div>
        </div>
        <div
          className={`p-2 flex-col items-start gap-2 flex-wrap bg-gray-300 text-gray-700 rounded w-4/5 xss:w-2/3 overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === 2 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            to="/category/womens-jewellery"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Jewellery</div>
          </Link>
          <Link to="/category/tops" onClick={() => setIsSideBarMenu(false)}>
            <div>Tops</div>
          </Link>
          <Link
            to="/category/womens-dresses"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Dresses</div>
          </Link>
          <Link
            to="/category/womens-shoes"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Shoes</div>
          </Link>
          <Link
            to="/category/womens-watches"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Watches</div>
          </Link>
          <Link
            to="/category/womens-bags"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Bags</div>
          </Link>
        </div>
      </div>

      {/* Accessories Section */}
      <div className="group ">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleAccordion(3)}
        >
          <Link
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              handleScroll("Accessories");
            }}
          >
            <div className="flex items-center">
              Accessories
              {openIndex === 3 ? (
                <FaChevronDown className="ml-2" />
              ) : (
                <FaChevronRight className="ml-2" />
              )}
            </div>
          </Link>
        </div>
        <div
          className={`p-2 flex-col items-start gap-2 flex-wrap bg-gray-300 text-gray-700 rounded w-4/5 xss:w-2/3 overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === 3 ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            to="/category/furniture"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Furniture</div>
          </Link>
          <Link
            to="/category/kitchen-accessories"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Kitchen</div>
          </Link>
          <Link
            to="/category/sports-accessories"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Sports</div>
          </Link>
          <Link
            to="/category/smartphones"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Smart Phones</div>
          </Link>
          <Link to="/category/laptops" onClick={() => setIsSideBarMenu(false)}>
            <div>Laptops</div>
          </Link>
          <Link to="/category/tablets" onClick={() => setIsSideBarMenu(false)}>
            <div>Tablets</div>
          </Link>
          <Link
            to="/category/fragrances"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Fragrances</div>
          </Link>
          <Link
            to="/category/skin-care"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Skin Care</div>
          </Link>
          <Link
            to="/category/groceries"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Groceries</div>
          </Link>
          <Link
            to="/category/home-decoration"
            onClick={() => setIsSideBarMenu(false)}
          >
            <div>Home Decoration</div>
          </Link>
          <Link to="/category/vehicle" onClick={() => setIsSideBarMenu(false)}>
            <div>Vehicle</div>
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div
        onClick={() => {
          handleScroll("footer");
        }}
        className="hidden lg:block relative group"
      >
        <Link>
          <div>Contact</div>
        </Link>
        <div className="flex-col text-sm text-nowrap items-center gap-2 flex-nowrap p-1 absolute z-10 bg-gray-100 bg-opacity-60 shadow hidden group-hover:flex top-full left-1/2 transform -translate-x-1/2">
          <div>Contact</div>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;
