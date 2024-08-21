import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwiped = (direction) => {
    if (direction === "LEFT") {
      setCurrentIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (direction === "RIGHT") {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwiped("LEFT"),
    onSwipedRight: () => handleSwiped("RIGHT"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="relative w-full">
      {/* Swipeable Images */}
      <div {...handlers} className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indication Circles */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-amber-300" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
