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
import ImageSlider from "../components/ProductImageSlider";
import { Helmet } from "react-helmet";

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
    const fetchProduct = async () => {
      setLoading(true);
      const productData = location?.state?.product;
      if (productData) {
        setProduct(productData);
        if (!activeImage && productData.images.length > 0) {
          setActiveImage(productData.images[0]); // Set initial active image if product exists
        }
      }
      await fetchUserDetails(); // Await if fetchUserDetails is asynchronous
      setLoading(false);
    };

    fetchProduct();
  }, [location?.state?.product]); // Only re-run effect if location.state.product changes

  useEffect(() => {
    if (user && product) {
      const cartItem = user.cart.find((item) => item.id === product._id);
      if (cartItem) {
        setCartQuantity(cartItem.quantity);
      }
      const isProductInWishlist = user?.wishlist?.some(
        (item) => item.id === product._id
      );
      setIsWishlist(isProductInWishlist); // Update wishlist state
    }
  }, [user, product?._id]); // Only re-run effect if user or product._id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Govind Hub - {`${product?.title}`}</title>
        <meta
          name="description"
          content="View detailed information about this product on Govind Hub. Check out the specifications, pricing, and reviews."
        />
        <meta
          name="keywords"
          content={`Govind Hub, product details, product information, buy product, product reviews, ${product?.title}`}
        />
      </Helmet>

      {isCheckOut && (
        <div className="fixed text-xl flex items-center justify-between w-40 bottom-20 right-20 bg-amber-200 px-1 pl-2 py-1 rounded font-semibold">
          <p className="cursor-pointer" onClick={() => navigate("/profile")}>
            Check Out
          </p>
          <AiFillCloseSquare
            className="z-10 cursor-pointer"
            onClick={handleCloseCheckOut}
            size={22}
          />
        </div>
      )}
      {product ? (
        <div className="flex flex-col sm:flex-row items-center md:items-start gap-2 w-screen lg:w-[95vw] mx-auto sm:py-4 justify-center">
          <div className="lg:w-[40%] relative group m-2 flex gap-2 lg:ml-10">
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
            <div className="hidden lg:flex flex-col gap-2">
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
                className="hidden lg:block w-full h-full xl:w-[450px] xl:h-[450px] border-2 bg-gray-50 cursor-crosshair"
                onMouseMove={handleZoom}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="w-full h-full object-contain"
                  src={activeImage}
                  alt=""
                />
              </div>

              <div className="lg:hidden w-[300px] h-[300px] xs:w-[400px] xs:h-[400px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                <ImageSlider images={product.images} />
              </div>
              <div className="flex gap-2 my-2 font-semibold items-center">
                <div className="w-1/2">
                  {cartQuantity === 0 ? (
                    <button
                      className="py-2 w-full px-4 rounded border-2 border-[#f6e1b1]"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex justify-between items-center rounded border-2 h-full border-[#f6e1b1]">
                      <div
                        className="bg-[#f6e1b1] h-full flex items-center p-2"
                        onClick={handleDecreaseQuantity}
                      >
                        <FaMinus className="h-full cursor-pointer" />
                      </div>
                      <span>{cartQuantity}</span>
                      <div
                        className="bg-[#f6e1b1] h-full flex items-center p-2"
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
                    border: "3px solid #f6e1b1",
                    boxSizing: "border-box",
                  }}
                >
                  {user ? "Buy Now" : "Login to Buy"}
                </button>
              </div>
            </div>
            {zoomVisible && (
              <div className="w-[500px] h-[500px] bg-gray-50 overflow-hidden border absolute -right-[82%] top-0">
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
          <div className="px-2 xs:px-8 sm:px-0 w-[60%] sm:w-1/2 mt-2 sm:h-[80vh] sm:overflow-scroll">
            <span className="bg-amber-200 py-1 px-4 text-sm rounded-lg">
              {product.brand ? product.brand : "Branded"}
            </span>
            <h1
              className="text-xl md:text-2xl lg:text-4xl mt-2 font-semibold lg:font-normal"
              style={{ fontFamily: "sans-serif" }}
            >
              {product.title}
            </h1>
            <p
              className="mb-2 text-sm md:text-base"
              style={{ fontFamily: "sans-serif" }}
            >
              {product.description}
            </p>
            <div className="flex my-2 gap-1">
              <StarRating rating={product.rating} />{" "}
              <span className="mx-2">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            <div className="flex items-center md:text-xl gap-2">
              <p
                className="font-bold text-xl md:text-2xl"
                style={{ fontFamily: "sans-serif" }}
              >
                ₹{" "}
                {Math.floor(
                  (product.price -
                    (product.discountPercentage * product.price) / 100) *
                    84
                )}{" "}
                <span className="px-1 text-gray-500 text-lg font-normal line-through decoration-1">
                  ₹{Math.floor(product.price * 84)}
                </span>
              </p>
              <p className="font-semibold text-red-500">
                {product.discountPercentage} % off
              </p>
            </div>
            <div className="font-semibold text-lg md:text-xl lg:text-2xl my-4">
              Product Details:
              <div className="font-normal flex flex-col">
                {product.weight && (
                  <span className="text-base lg:text-lg">
                    Weight: {product.weight}kg
                  </span>
                )}
                <div className="lg:flex gap-2 items-center">
                  <h3 className="font-semibold text-lg lg:text-xl">
                    Dimensions:
                  </h3>
                  <div className="flex gap-2 text-sm lg:text-base text-nowrap">
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
                  <h3 className="font-semibold text-lg md:text-xl lg:text-2xl mt-2">
                    Reviews:{" "}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {product.reviews?.map((review, i) => (
                      <div
                        key={i}
                        className="p-2 rounded border w-2/3 md:w-1/2 bg-gray-200"
                      >
                        <div className="flex gap-2 items-center">
                          <p className="text-base lg:text-lg">
                            {review.comment}
                          </p>
                          <span className="text-base font-bold bg-white px-1 rounded flex gap-1 items-center">
                            {review.rating}
                            <FaStar color="gold" />
                          </span>
                        </div>
                        <span className="text-sm text-gray-700 font-semibold">
                          {review.reviewedBy}
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
        <div className="flex items-center justify-center w-screen h-screen">
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      )}
    </>
  );
};

export default Product;
