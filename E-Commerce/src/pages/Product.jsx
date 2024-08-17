import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import { useSelector } from "react-redux";

const Product = () => {
  const user = useSelector((action) => action?.user?.user);
  
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const [activeImage, setActiveImage] = useState("");
  const [imageZoomCoordinates, setImageZoomCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [zoomVisible, setZoomVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      const productData = location?.state?.product;
      setProduct(productData);
      if (productData) {
        setActiveImage(productData.images[0]); // Set initial active image if product exists
      }
      setLoading(false);
    };

    fetchProduct();
  }, [location]);

  const handleImageChange = (image) => {
    setActiveImage(image); // Update active image when hovering over a thumbnail
  };

  const handleZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setImageZoomCoordinates({ x, y });
    setZoomVisible(true); // Show zoom box when mouse moves
  };

  const handleMouseLeave = () => {
    setZoomVisible(false); // Hide zoom box when mouse leaves the image
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {product ? (
        <div className="flex gap-2 w-[95vw] mx-auto">
          <div className="relative m-2 flex gap-2 ml-16">
            <div className="flex flex-col gap-2">
              {product.images.map((image, i) => (
                <div
                  key={i}
                  className="w-24 border-2 bg-gray-50 min-h-24"
                  onMouseOver={() => handleImageChange(image)}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
            <div>
              <div
                className="w-[400px] h-[400px] border-2 bg-gray-50 cursor-crosshair"
                onMouseMove={handleZoom}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="w-full h-full object-contain"
                  src={activeImage}
                  alt=""
                />
              </div>
              <div className="flex gap-2 font-semibold">
                <button className="py-2 px-4 w-1/2 my-2 rounded">
                  {user? "Add to Cart": "Login to add to cart"}
                </button>
                <button className="py-2 px-4 w-1/2 my-2 rounded" style={{background: 'white', border: '3px solid gold'}}>
                {user? "Buy Now": "Login to Buy"}
                </button>
              </div>
            </div>
            {zoomVisible && (
              <div className="w-[450px] h-[450px] bg-gray-50 overflow-hidden border absolute -right-[460px] top-0">
                <div
                  className="h-[450px] w-[450px]"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${imageZoomCoordinates.x * 100}% ${
                      imageZoomCoordinates.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="mt-2 w-[45%] h-[80vh] overflow-scroll">
            <span className="bg-amber-200 py-1 px-4 text-sm rounded-lg">
              {product.brand ? product.brand : "Branded"}
            </span>
            <h1 className="text-4xl mt-2" style={{ fontFamily: "sans-serif" }}>
              {product.title}
            </h1>
            <p className="mb-2" style={{ fontFamily: "sans-serif" }}>
              {product.description}
            </p>
            <div className="flex my-2 gap-1">
              <StarRating rating={product.rating} />{" "}
              <span className="mx=2">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            <div className="flex items-center text-xl gap-2">
              <p
                className="font-bold text-2xl"
                style={{ fontFamily: "sans-serif" }}
              >
                ₹{" "}
                {Math.floor(
                  (product.price -
                    (product.discountPercentage * product.price) / 100) *
                    84
                )}{" "}
                <span className="px-1 text-gray-500 font-normal line-through decoration-1">
                  ₹{Math.floor(product.price * 84)}
                </span>
              </p>
              <p className="font-semibold text-red-500">
                {product.discountPercentage} % off
              </p>
            </div>
            <div className="font-semibold text-2xl my-4">
              Product Details:
              <div className="font-normal flex flex-col text-xl">
                {product.weight && (
                  <span className="text-lg">Weight: {product.weight}kg</span>
                )}
                <div className="flex gap-2 items-center">
                  <h3 className="font-semibold">Dimensions: </h3>
                  <div className="flex gap-2 text-base">
                    {product.dimensions?.width && (
                      <span>Width: {product.dimensions.width}kg,</span>
                    )}
                    {product.dimensions?.height && (
                      <span>Height: {product.dimensions.height}kg,</span>
                    )}
                    {product.dimensions?.depth && (
                      <span>Depth: {product.dimensions.depth}kg</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Reviews: </h3>
                  <div className="flex flex-col gap-2">
                    {product.reviews?.map((review) => (
                      <div
                        key={review.id}
                        className="p-2 rounded border w-1/2 bg-gray-200"
                      >
                        <div className="flex gap-2 items-center">
                          <p className="text-lg">{review.comment}</p>
                          <span className="text-base font-bold bg-white px-1 rounded flex gap-1 items-center">
                            {review.rating}
                            <FaStar color="gold" />
                          </span>
                        </div>
                        <span className="text-sm text-gray-700 font-semibold">
                          {review.reviewerName}
                        </span>
                        <span className="text-sm text-gray-700 mx-4">
                          {new Date(review.date).toLocaleString("en-us", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No product found.</div>
      )}
    </>
  );
};

export default Product;
