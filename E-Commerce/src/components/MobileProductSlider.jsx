import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const MobileSlider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to skip the cloned first slide
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle swiped direction
  const handleSwiped = (direction) => {
    if (direction === "LEFT") {
      if (currentIndex === products.length + 1) {
        setIsTransitioning(false);
        setCurrentIndex(1); // Jump to actual first slide
      } else {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % (products.length + 2));
      }
    } else if (direction === "RIGHT") {
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(products.length); // Jump to actual last slide
      } else {
        setIsTransitioning(true);
        setCurrentIndex(
          (prev) => (prev - 1 + (products.length + 2)) % (products.length + 2)
        );
      }
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwiped("LEFT"),
    onSwipedRight: () => handleSwiped("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const interval = setInterval(
      () => {
        handleSwiped("LEFT");
      },
      currentIndex === products.length + 1 ? 500 : 3000
    );
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden h-[100%]">
      <div
        {...handlers}
        className="flex transition-transform ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {/* Clone Last Slide */}
        <div className="w-full flex-shrink-0 h-full flex items-center justify-between p-2 md:p-6">
          <div className="w-[50%] xs:p-4 flex flex-col justify-center">
            <h1 className="text-xl xss:text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {products[products.length - 1]?.title}
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl text-gray-800 mb-4">
              ₹
              {Math.floor(
                (products[products.length - 1]?.price -
                  (products[products.length - 1]?.discountPercentage *
                    products[products.length - 1]?.price) /
                    100) *
                  84
              )}
              <span className="px-2 text-xs vs:text-sm xs:text-lg text-gray-500 font-normal line-through">
                ₹{Math.floor(products[products.length - 1].price * 84)}
              </span>
            </p>
            <p className="hidden sm:block text-gray-700 mb-4">
              {products[products.length - 1]?.description}
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
          <div className="w-1/2 h-full">
            <img
              className="w-full h-full object-cover rounded-lg scale-105"
              src={products[products.length - 1]?.thumbnail}
              alt={products[products.length - 1]?.title}
            />
          </div>
        </div>

        {/* Actual Slides */}
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 h-full flex items-center justify-between p-2 md:p-6"
          >
            <div className="w-[50%] xs:p-4 flex flex-col justify-center">
              <h1 className="text-xl xss:text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {product?.title}
              </h1>
              <p className="text-lg xs:text-xl sm:text-2xl text-gray-800 mb-4">
                ₹
                {Math.floor(
                  (product?.price -
                    (product?.discountPercentage * product?.price) / 100) *
                    84
                )}
                <span className="px-2 text-xs vs:text-sm xs:text-lg text-gray-500 font-normal line-through">
                  ₹{Math.floor(product.price * 84)}
                </span>
              </p>
              <p className="hidden sm:block text-gray-700 mb-4">
                {product?.description}
              </p>
              <div className="flex items-center gap-4">
                <Link to="/product" state={{ product }}>
                  <button className="py-1 px-2 xs:py-2 xs:px-4 bg-[#fae04e] text-white font-semibold rounded-lg shadow-md hover:bg-[#fde355] transition duration-300">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-1/2 h-full scale-105">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={product?.thumbnail}
                alt={product?.title}
              />
            </div>
          </div>
        ))}

        {/* Clone First Slide */}
        <div className="w-full flex-shrink-0 h-full flex items-center justify-between p-2 md:p-6">
          <div className="w-[50%] xs:p-4 flex flex-col justify-center">
            <h1 className="text-xl xss:text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {products[0]?.title}
            </h1>
            <p className="text-lg xs:text-xl sm:text-2xl text-gray-800 mb-4">
              ₹
              {Math.floor(
                (products[0]?.price -
                  (products[0]?.discountPercentage * products[0]?.price) /
                    100) *
                  84
              )}
              <span className="px-2 text-xs vs:text-sm xs:text-lg text-gray-500 font-normal line-through">
                ₹{Math.floor(products[0].price * 84)}
              </span>
            </p>
            <p className="hidden sm:block text-gray-700 mb-4">
              {products[0]?.description}
            </p>
            <div className="flex items-center gap-4">
              <Link to="/product" state={{ product: products[0] }}>
                <button className="py-1 px-2 xs:py-2 xs:px-4 bg-[#fae04e] text-white font-semibold rounded-lg shadow-md hover:bg-[#fde355] transition duration-300">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
          <div className="w-1/2 h-full scale-105">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={products[0]?.thumbnail}
              alt={products[0]?.title}
            />
          </div>
        </div>
      </div>

      {/* Indicator Circles */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => {
          const isActive =
            currentIndex === index + 1 ||
            (currentIndex === 0 && index === products.length - 1);
          return (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-amber-300" : "bg-gray-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MobileSlider;
