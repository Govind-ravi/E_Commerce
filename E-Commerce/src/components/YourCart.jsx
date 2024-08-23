import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchProductById } from "../helpers/fetchProduct";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import APIs from "../APIs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoadingScreen from "../helpers/LoadingScreen";

const YourCart = () => {
  const user = useSelector((state) => state.user?.user);
  const [products, setProducts] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // Memoize fetchProducts
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    if (!user?.cart?.length) return setLoading(false);

    const productPromises = user.cart.map(async (item) => {
      try {
        const product = await fetchProductById(item.id);
        return { ...product, quantity: item.quantity };
      } catch (error) {
        console.error(`Error fetching product ${item.id}:`, error);
        return null;
      }
    });

    try {
      const fetchedProducts = await Promise.all(productPromises);
      setProducts(fetchedProducts.filter(Boolean)); // Remove null values
      const quantities = fetchedProducts.reduce((acc, product) => {
        acc[product._id] = product.quantity;
        return acc;
      }, {});
      setCartQuantities(quantities);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [user?.cart]); // Memoized dependencies

  // Ensure useEffect runs only when necessary
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Only include fetchProducts here

  const handleIncreaseQuantity = async (productId) => {
    try {
      const response = await fetch(APIs.addToCart.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedItem = data.cart.find((item) => item.id === productId);
        if (updatedItem) {
          setCartQuantities((prev) => ({
            ...prev,
            [productId]: updatedItem.quantity,
          }));
        }
      } else {
        console.error("Failed to increase quantity");
      }
    } catch (error) {
      console.error("Error increasing product quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const response = await fetch(APIs.removeFromCart.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedItem = data.cart.find((item) => item.id === productId);
        if (updatedItem) {
          setCartQuantities((prev) => ({
            ...prev,
            [productId]: updatedItem.quantity,
          }));
        } else {
          setCartQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[productId];
            return newQuantities;
          });
        }
      } else {
        console.error("Failed to decrease quantity");
      }
    } catch (error) {
      console.error("Error decreasing product quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(APIs.clearCart.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.cart);
        setCartQuantities({});
      } else {
        console.error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsOrderPlaced(true);
      setTimeout(() => setIsOrderPlaced(false), 3000); // Use setTimeout instead of setInterval
    }
  };

  if (loading)
    return (
      <>
        <div className="flex flex-col flex-wrap0 mx-4 ">
          <LoadingScreen width={'300px'} height={'150px'}/>
          <LoadingScreen width={'300px'} height={'150px'}/>
          <LoadingScreen width={'300px'} height={'150px'}/>
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>Govind Hub - {`${user?.name}`}'s' Cart</title>
        <meta
          name="description"
          content="View and manage the items in your cart on Govind Hub. Review your selections and proceed to checkout when ready."
        />
        <meta
          name="keywords"
          content="Govind Hub, your cart, shopping cart, manage cart, checkout"
        />
      </Helmet>

      <div className="relative w-full lg:w-[80%] rounded-r py-2 px-4">
        {user?.cart?.length > 0 && (
          <div className="absolute w-28 h-10 bottom-4 right-10 rounded">
            <button
              onClick={clearCart}
              className="h-full w-full rounded font-semibold"
            >
              {isOrderPlaced ? "Order Placed" : "Place Order"}
            </button>
          </div>
        )}
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold">
          My Cart
        </h1>
        {user?.cart?.length === 0 ? (
          <p className="text-lg my-2">
            {isOrderPlaced ? "Order Placed" : "No Products in your Cart"}
          </p>
        ) : (
          <div className="flex flex-col gap-2 my-2 overflow-y-scroll h-[calc(100vh-200px)]">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 border-[1px] border-gray-500 flex items-center w-4/5 xss:w-3/4 xs:w-1/2 md:w-1/3 p-2 rounded"
              >
                <div className="w-[40%]">
                  <Link
                    className="cursor-pointer"
                    to="/product"
                    state={product}
                  >
                    <img
                      className="w-full"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </Link>
                </div>
                <div className="w-[60%] flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      {product.title}
                    </h3>
                    <p className="w-full truncate">{product.description}</p>
                    <p className="font-bold text-base sm:text-lg">
                      ₹{" "}
                      {Math.floor(
                        (product.price -
                          (product.discountPercentage * product.price) / 100) *
                          84
                      )}{" "}
                      <span className="px-2 text-gray-500 font-normal line-through decoration-1">
                        ₹{Math.floor(product.price * 84)}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center rounded border-2 border-[#fde66a] w-20 sm:w-24">
                    <div
                      className="bg-[#fde66a] h-full flex items-center p-1"
                      onClick={() => handleDecreaseQuantity(product._id)}
                    >
                      {cartQuantities[product._id] === 1 ? (
                        <FaTrash
                          color="black"
                          className="h-full cursor-pointer"
                          size={12}
                        />
                      ) : (
                        <FaMinus className="h-full cursor-pointer" size={12} />
                      )}
                    </div>
                    <span className="font-semibold">
                      {cartQuantities[product._id] || 0}
                    </span>
                    <div
                      className="bg-[#fde66a] h-full flex items-center p-1"
                      onClick={() => handleIncreaseQuantity(product._id)}
                    >
                      <FaPlus className="h-full cursor-pointer" size={12} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default YourCart;
