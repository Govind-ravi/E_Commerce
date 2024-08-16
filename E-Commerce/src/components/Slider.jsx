import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Slider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextProduct = () => {
    if (currentIndex === products.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1); // Reset to first product
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
      currentIndex === products.length + 1 ? 500 : 3000
    );
    return () => clearInterval(interval);
  }, [currentIndex]);

  if(products){
  return (
    <>
      {products && products.length !== 1 ? (
        <div className="relative w-[90vw] mx-auto overflow-hidden px-4">
          <div
            className={`flex transition-transform ease-in-out ${
              isTransitioning ? "duration-500 " : "duration-0"
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
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

            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-center w-full flex-shrink-0"
              >
                <div className="w-[60%] p-4">
                  <h1 className="text-4xl text-white font-semibold">
                    {product.title}
                  </h1>
                  <p>{product.price}/-</p>
                  <button className="py-2 px-4 rounded">Buy Now</button>
                </div>
                <div className="flex w-[40%]">
                  <img
                    width={400}
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center w-full flex-shrink-0">
              <div className="w-[60%] p-4">
                <h1 className="text-4xl text-white font-semibold">
                  {products[0].title}
                </h1>
                <p>{products[0].price}/-</p>
                <button className="py-2 px-4 rounded">Buy Now</button>
              </div>
              <div className="flex w-[40%]">
                <img
                  width={400}
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
  );}
};

export default Slider;
