import { useLocation, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Product = () => {
    
  const location = useLocation()
  const Product = location.state?.data

  return (
    <>
      { Product && 
        <div className="flex w-[80vw] mx-auto">
          <div className="w-[30%] border-2 m-2">
            <img src={Product.images} alt="" />
          </div>
          <div className="m-4 w-[50%]">
            <h1 className="text-4xl" style={{ fontFamily: "sans-serif" }}>
              {Product.title}
            </h1>
            <p style={{ fontFamily: "sans-serif" }}>{Product.description}</p>
            <div className="flex items-center gap-1 bottom-0 left-0">
              <span className="font-semibold px-2 py-1 rounded flex w-16 items-center gap-2">
                {Product.rating}
                <FaStar color="red" />
              </span>
              <span>({Product.reviews.length})</span>
            </div>
            <div className="flex items-center text-xl gap-2">
              <p
                className="font-bold text-2xl"
                style={{ fontFamily: "sans-serif" }}
              >
                ₹{" "}
                {Math.floor(
                  (Product.price -
                    (Product.discountPercentage * Product.price) / 100) *
                    84
                )}{" "}
                <span className="px-1 text-gray-500 font-normal line-through decoration-1">
                  ₹{Math.floor(Product.price * 84)}
                </span>
              </p>
              <p className="font-semibold text-red-500">
                {Product.discountPercentage} % off
              </p>
            </div>
            <div className="font-semibold text-lg">
              Details:
              <div className="font-normal flex flex-col text-sm">
                {Product.weight && <span>Weight: {Product.weight}kg</span>}
                {Product.dimensions.width && <span>Width: {Product.dimensions.width}kg</span>}
                {Product.dimensions.height && <span>Height: {Product.dimensions.height}kg</span>}
                {Product.dimensions.depth && <span>Depth: {Product.dimensions.depth}kg</span>}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Product;
