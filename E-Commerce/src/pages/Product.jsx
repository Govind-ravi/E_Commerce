import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import APIs from "../APIs";
import Context from "../context";

const Product = () => {
  const user = useSelector((action) => action?.user?.user);
  const { fetchUserDetails } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const [activeImage, setActiveImage] = useState("");
  const [imageZoomCoordinates, setImageZoomCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [zoomVisible, setZoomVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isCheckOut, setIsCheckOut] = useState(false);

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

  const handleIncreaseQuantity = async () => {
    await handleAddToCart(); // Same API call to increase quantity
  };

  const handleDecreaseQuantity = async () => {
    try {
      const response = await fetch(APIs.removeFromCart.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedItem = data.cart.find((item) => item.id === product._id);
        if (updatedItem) {
          setCartQuantity(updatedItem.quantity);
        } else {
          setCartQuantity(0);
        }
      }
    } catch (error) {
      alert("Error decreasing product quantity");
    } finally {
      setIsCheckOut(true);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    try {
      const response = await fetch(APIs.addToCart.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedItem = data.cart.find((item) => item.id === product._id);
        if (updatedItem) {
          setCartQuantity(updatedItem.quantity);
        }
      } else {
        console.log("Error updating");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsCheckOut(true);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    try {
      const response = await fetch(APIs.addToWishlist.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added to wishlist", data);
      } else {
        console.log("Error adding to wishlist");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    } finally {
      setIsWishlist((prev) => {
        return !prev;
      });
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const response = await fetch(APIs.removeFromWishlist.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product removed from wishlist", data);
      } else {
        console.log("Error removing from wishlist");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    } finally {
      setIsWishlist((prev) => {
        return !prev;
      });
    }
  };

  const handleCloseCheckOut = () => {
    setIsCheckOut(false);
  };

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      const productData = location?.state?.product;
      setProduct(productData);
      if (productData && !activeImage) {
        setActiveImage(productData.images[0]); // Set initial active image if product exists
      }
      fetchUserDetails();
      setLoading(false);
    };

    const updateCartQuantity = () => {
      if (user && product) {
        const cartItem = user.cart.find((item) => item.id === product._id);
        if (cartItem) {
          setCartQuantity(cartItem.quantity);
        }
      }
    };

    if (user && product) {
      const isProductInWishlist = user?.wishlist?.some(
        (item) => item.id === product._id
      );
      setIsWishlist(isProductInWishlist); // Update state once data is available
    }

    fetchProduct();
    updateCartQuantity();
  }, [location, user, product?._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isCheckOut && (
        <div
          className="fixed text-xl flex items-center justify-between w-40 bottom-20 right-20 bg-amber-200 px-1 pl-2 py-1 rounded font-semibold"
        >
          <p className="cursor-pointer"
          onClick={() => navigate("/profile")}>Check Out</p>
          <AiFillCloseSquare
            className="z-10 cursor-pointer"
            onClick={handleCloseCheckOut}
            size={22}
          />
        </div>
      )}
      {product ? (
        <div className="flex gap-2 w-[95vw] mx-auto">
          <div className="relative group m-2 flex gap-2 ml-16">
            {user?.role === "user" && isWishlist && (
              <>
                <FaHeart
                  color="red"
                  className="absolute right-2 top-2 z-10 cursor-pointer"
                  onClick={handleRemoveFromWishlist}
                />
                <span className="text-gray-700 absolute hidden right-8 top-1 group-hover:inline">
                  Remove from Wishlist
                </span>
              </>
            )}
            {user?.role === "user" && !isWishlist && (
              <>
                <FaRegHeart
                  className="absolute right-2 top-2 z-10 cursor-pointer"
                  onClick={handleAddToWishlist}
                />
                <span className="text-gray-700 absolute hidden right-8 top-1 group-hover:inline">
                  Add to wishlist
                </span>
              </>
            )}
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
              <div className="flex gap-2 my-2 font-semibold items-center">
                <div className=" w-1/2">
                  {cartQuantity === 0 ? (
                    <button
                      className="py-2 w-full px-4 rounded border-2 border-[#fde66a]"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex justify-between items-center rounded border-2 h-full border-[#fde66a]">
                      <div
                        className="bg-[#fde66a] h-full flex items-center p-2"
                        onClick={handleDecreaseQuantity}
                      >
                        <FaMinus className="h-full cursor-pointer" />
                      </div>
                      <span>{cartQuantity}</span>
                      <div
                        className="bg-[#fde66a] h-full flex items-center p-2"
                        onClick={handleIncreaseQuantity}
                      >
                        <FaPlus className="h-full cursor-pointer" />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="py-2 px-4 w-1/2 rounded"
                  style={{
                    background: "white",
                    border: "3px solid gold",
                    boxSizing: "border-box",
                  }}
                >
                  {user ? "Buy Now" : "Login to Buy"}
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
                    {product.reviews?.map((review, i) => (
                      <div
                        key={i}
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
