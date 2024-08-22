import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Slider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProduct = () => {
    if (currentIndex === products.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % (products.length + 2));
    }
  };

  const prevProduct = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(products.length); // Go to last product
    } else {
      setIsTransitioning(true);
      setCurrentIndex(
        (prev) => (prev - 1 + (products.length + 2)) % (products.length + 2)
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(
      nextProduct,
      currentIndex === products.length + 1 ? 500 : 4000
    );
    return () => clearInterval(interval);
  }, [currentIndex, products.length]);

  if (products.length === 0) {
    return <div className="text-center text-3xl">Loading...</div>;
  }
  if (products) {
    return (
      <>
        {products && products.length !== 1 ? (
          <div className="relative w-[90vw] h-[60vh] mx-auto overflow-hidden px-4">
            <div
              className={`flex transition-transform ease-in-out ${
                isTransitioning ? "duration-500 " : "duration-0"
              }`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex items-center justify-center w-full flex-shrink-0 h-[60vh]">
                <div className="w-[50%] p-4 flex flex-col justify-center">
                  <h1 className="text-5xl font-bold text-white mb-2">
                    {products[products.length - 1].title}
                  </h1>
                  <p className="text-xl text-gray-800 mb-4">
                    ₹
                    {Math.floor(
                      (products[products.length - 1].price -
                        (products[products.length - 1].discountPercentage *
                          products[products.length - 1].price) /
                          100) *
                        84
                    )}
                    <span className="px-2 text-sm sm:text-lg text-gray-500 font-normal line-through">
                      ₹{Math.floor(products[products.length - 1].price * 84)}
                    </span>
                  </p>
                  <p className="text-md text-gray-700 mb-4">
                    {products[products.length - 1].description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      to="/product"
                      state={{ product: products[products.length - 1] }}
                    >
                      <button className="py-1 px-2 xs:py-2 xs:px-4 bg-[#fae04e] text-white font-semibold rounded-lg shadow-md hover:bg-[#fde355] transition duration-300">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-4 w-[35%]">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={products[products.length - 1].thumbnail}
                    alt={products[products.length - 1].title}
                  />
                </div>
              </div>

              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-center w-full h-[60vh] flex-shrink-0 overflow-hidden"
                >
                  <div className="w-[50%] p-4 flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-white mb-2">
                      {product.title}
                    </h1>
                    <p className="text-xl text-gray-800 mb-4">
                      ₹
                      {Math.floor(
                        (product.price -
                          (product.discountPercentage * product.price) / 100) *
                          84
                      )}
                      <span className="px-2 text-sm sm:text-lg text-gray-500 font-normal line-through">
                        ₹{Math.floor(product.price * 84)}
                      </span>
                    </p>
                    <p className="text-md text-gray-700 mb-4">
                      {product.description}/-
                    </p>
                    <div className="flex items-center gap-4">
                      <Link to="/product" state={{ product }}>
                        <button className="py-1 px-2 xs:py-2 xs:px-4 bg-[#fae04e] text-white font-semibold rounded-lg shadow-md hover:bg-[#fde355] transition duration-300">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-[35%] p-4">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center w-full flex-shrink-0 h-[60vh]">
                <div className="w-[50%] p-4 flex flex-col justify-center">
                  <h1 className="text-5xl font-bold text-white mb-2">
                    {products[0].title}
                  </h1>
                  <p className="text-xl text-gray-800 mb-4">
                    ₹
                    {Math.floor(
                      (products[0].price -
                        (products[0].discountPercentage * products[0].price) /
                          100) *
                        84
                    )}
                    <span className="px-2 text-sm sm:text-lg text-gray-500 font-normal line-through">
                      ₹{Math.floor(products[0].price * 84)}
                    </span>
                  </p>
                  <p className="text-md text-gray-700 mb-4">
                    {products[0].description}/-
                  </p>
                  <div className="flex items-center gap-4">
                    <Link to="/product" state={{ product: products[0] }}>
                      <button className="py-1 px-2 xs:py-2 xs:px-4 bg-[#fae04e] text-white font-semibold rounded-lg shadow-md hover:bg-[#fde355] transition duration-300">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-4 w-[35%]">
                  <img
                    className="w-full h-full object-cover rounded-lg "
                    src={products[0].thumbnail}
                    alt={products[0].title}
                  />
                </div>
              </div>
            </div>

            {/* Circle Indicators */}
            <div className="absolute bottom-2 flex gap-2 left-1/2 transform -translate-x-1/2">
              {products.map((product, index) => {
                const isActive =
                  currentIndex === index + 1 ||
                  (currentIndex === 0 && index === products.length - 1);
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: isActive ? "white" : "#a5a3a3",
                    }}
                    onClick={() => setCurrentIndex(index + 1)} // Set currentIndex based on circle clicked
                    className="rounded-full w-2 h-2"
                  />
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div
              onClick={prevProduct}
              className="cursor-pointer hover:text-white absolute left-1 top-1/2 text-[#a5a3a3]"
            >
              <FaAngleLeft size={24} />
            </div>
            <div
              onClick={nextProduct}
              className="cursor-pointer hover:text-white absolute right-1 top-1/2 text-[#a5a3a3]"
            >
              <FaAngleRight size={24} />
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-[90vw] mx-auto overflow-hidden px-4">
              <div className="flex items-center justify-center w-full flex-shrink-0">
                <div className="w-[60%] p-4">
                  <h1 className="text-4xl text-white font-semibold">
                    {products[products.length - 1].title}
                  </h1>
                  <p>{products[products.length - 1].price}/-</p>
                  <button className="py-2 px-4 rounded">Buy Now</button>
                </div>
                <div className="flex w-[40%]">
                  <img
                    width={400}
                    src={products[products.length - 1].thumbnail}
                    alt={products[products.length - 1].title}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};

export default Slider;
