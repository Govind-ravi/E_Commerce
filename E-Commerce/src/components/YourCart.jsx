import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProductById } from "../helpers/fetchProduct";
import { FaPlus, FaMinus } from "react-icons/fa";
import APIs from "../APIs";

const YourCart = () => {
  const user = useSelector((state) => state.user?.user);
  const [products, setProducts] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = user?.cart?.map(async (item) => {
        const product = await fetchProductById(item.id); // Ensure this function returns a promise
        return { ...product, quantity: item.quantity }; // Include quantity in the product data
      });

      try {
        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts); // Set the state with the array of products
        // Initialize quantities
        const quantities = fetchedProducts.reduce((acc, product) => {
          acc[product._id] = product.quantity;
          return acc;
        }, {});
        setCartQuantities(quantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user?.cart?.length) {
      fetchProducts();
    }
  }, [user?.cart]);

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
      }
    } catch (error) {
      console.error("Error decreasing product quantity:", error);
    }
  };

  const clearCart= async()=>{
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
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  return (
    <>
      <div className="relative w-[80%] rounded-r py-2 px-4">
        <div className="absolute w-28 h-10 bottom-4 right-10 rounded">
          <button className="h-full w-full rounded font-semibold">
            Place Order
          </button>
        </div>
        <h1 className="text-4xl font-semibold">My Cart</h1>
        {user?.cart?.length === 0 ? (
          <p className="text-lg my-2">No Products in your Cart</p>
        ) : (
          <div className="flex flex-col gap-2 my-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 border-[1px] border-gray-500 flex w-1/3 p-2 rounded"
              >
                <div className="min-w-32">
                  <img
                    width={108}
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <p className="font-bold text-lg">
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
                  <div className="flex justify-between items-center rounded border-2  border-[#fde66a] w-24">
                    <div
                      className="bg-[#fde66a] h-full flex items-center p-1"
                      onClick={() => handleDecreaseQuantity(product._id)}
                    >
                      <FaMinus className="h-full cursor-pointer" />
                    </div>
                    <span>{cartQuantities[product._id] || 0}</span>
                    <div
                      className="bg-[#fde66a] h-full flex items-center p-1"
                      onClick={() => handleIncreaseQuantity(product._id)}
                    >
                      <FaPlus className="h-full cursor-pointer" />
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
