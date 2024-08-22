import { useSelector } from "react-redux";
import { fetchProductById } from "../helpers/fetchProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosHeartDislike } from "react-icons/io";
import APIs from "../APIs";

const YourWishlist = () => {
  const user = useSelector((state) => state.user?.user);
  const [products, setProducts] = useState([]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(APIs.removeFromWishlist.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: productId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product removed from wishlist", data);

        // Update the local state to reflect the removed item
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        console.log("Error removing from wishlist");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = user?.wishlist?.map(async (item) => {
        const product = await fetchProductById(item.id);
        return product;
      });

      try {
        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user?.wishlist?.length) {
      fetchProducts();
    }
  }, [user?.wishlist]);

  return (
    <div className="relative w-full xs:w-[95%] lg:w-[80%] rounded-r py-2 px-4">
      <h1 className="text-4xl font-semibold">My Wishlist</h1>
      {user?.wishlist?.length === 0 ? (
        <p className="text-lg my-2">No Products in your Wishlist</p>
      ) : (
        <div className="flex flex-wrap gap-2 my-2 lg:overflow-y-scroll lg:h-[calc(100vh-200px)]">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group bg-gray-100 border-[1px] border-gray-500 flex  flex-col w-[140px] sm:flex-row xs:w-[150px] sm:w-[280px] lg:w-[300px] xl:w-[300px] p-1 xs:p-4 rounded"
            >
              <div className="absolute right-2 top-2 z-10 cursor-pointer">
                <IoIosHeartDislike
                  color="red"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                />
              </div>
              <span className="text-gray-700 absolute hidden right-7 top-1 group-hover:inline text-sm">
                Remove from Wishlist
              </span>
              <div className="min-w-32">
                <img width={108} src={product.thumbnail} alt={product.title} />
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
                <Link
                  className="w-fit py-1 px-2 rounded cursor-pointer bg-amber-300"
                  to={`/product`}
                  state={{ product }}
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourWishlist;
