import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const data = {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    tags: ["beauty", "mascara"],
    brand: "Essence",
    sku: "RCH45Q1A",
    weight: 2,
    dimensions: {
      width: 23.17,
      height: 14.43,
      depth: 28.01,
    },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships in 1 month",
    availabilityStatus: "Low Stock",
    reviews: [
      {
        rating: 2,
        comment: "Very unhappy with my purchase!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "John Doe",
        reviewerEmail: "john.doe@x.dummyjson.com",
      },
      {
        rating: 2,
        comment: "Not as described!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Nolan Gonzalez",
        reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
      },
      {
        rating: 5,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.618Z",
        reviewerName: "Scarlett Wright",
        reviewerEmail: "scarlett.wright@x.dummyjson.com",
      },
    ],
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 24,
    meta: {
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      barcode: "9164035109868",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
  };

  const [isWishlist, setIsWishlist] = useState(false);

  const handleWishlist = () => {
    setIsWishlist((prev) => {
      return !prev;
    });
  };
  return (
    <>
    <Link to={`/product`} state={{data}}>
      <div className="w-[350px] border shadow-md rounded font-semibold">
        <div className="shadow overflow-x-hidden relative">
          {isWishlist && (
            <FaHeart
              color="red"
              className="absolute right-2 top-2"
              onClick={handleWishlist}
            />
          )}
          {!isWishlist && (
            <FaRegHeart
              className="absolute right-2 top-2"
              onClick={handleWishlist}
            />
          )}
          <img
            src={data.thumbnail}
            height={270}
            alt=""
            className="h-[270px] mx-auto"
          />
          <div className="flex items-center gap-1 absolute bottom-0 left-0" >
            <span className="font-semibold px-2 py-1 rounded flex w-16 items-center gap-2">
              {data.rating}
              <FaStar color="red" />
            </span>
            <span>({data.reviews.length})</span>
          </div>
        </div>
        <div className=" p-2">
          <h4 className="text-2xl" style={{ fontFamily: "sans-serif" }}>{data.brand}</h4>
          <h3 className="text-xl truncate" style={{ fontFamily: "sans-serif" }}>{data.title}</h3>

          <p className="font-bold">
            ₹{" "}
            {Math.floor(
              (data.price - (data.discountPercentage * data.price) / 100) * 84
            )}{" "}
            <span className="px-2 text-gray-500 font-normal line-through decoration-1">
              ₹{Math.floor(data.price * 84)}
            </span>
          </p>
          <p className="text-sm font-semibold text-red-500">
            {data.discountPercentage} % off
          </p>
        </div>
      </div>
      </Link>
    </>
  );
};

export default ProductCard;
