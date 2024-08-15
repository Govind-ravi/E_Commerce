import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  const handleWishlist = () => {
    setIsWishlist((prev) => {
      return !prev;
    });
  };
  return (
    <>
      <div className="w-[350px] border shadow-md rounded font-semibold">
        {data && (
          <div className="shadow overflow-x-hidden relative">
            {isWishlist && (
              <FaHeart
                color="red"
                className="absolute right-2 top-2 z-10 cursor-pointer"
                onClick={handleWishlist}
              />
            )}
            {!isWishlist && (
              <FaRegHeart
                className="absolute right-2 top-2 z-10 cursor-pointer"
                onClick={handleWishlist}
              />
            )}
            <Link to={`/product`} state={{ data }}>
              <div className="relative">
                <img
                  src={data.thumbnail}
                  height={270}
                  alt=""
                  className="h-[270px] mx-auto"
                />
                <div className="flex items-center gap-1 absolute bottom-0 left-0">
                  <span className="font-semibold px-2 py-1 rounded flex w-16 items-center gap-2">
                    {data.rating}
                    <FaStar color="red" />
                  </span>
                  <span>({data && data.reviews.length})</span>
                </div>
              </div>
              <div className=" p-2">
                <h4 className="text-2xl" style={{ fontFamily: "sans-serif" }}>
                  {data.brand}
                </h4>
                <h3
                  className="text-xl truncate"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {data.title}
                </h3>

                <p className="font-bold">
                  ₹{" "}
                  {Math.floor(
                    (data.price -
                      (data.discountPercentage * data.price) / 100) *
                      84
                  )}{" "}
                  <span className="px-2 text-gray-500 font-normal line-through decoration-1">
                    ₹{Math.floor(data.price * 84)}
                  </span>
                </p>
                <p className="text-sm font-semibold text-red-500">
                  {data.discountPercentage} % off
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
