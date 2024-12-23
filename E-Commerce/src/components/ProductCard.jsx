import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiMenuAddFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import APIs from "../APIs";

const ProductCard = ({ product }) => {
  const user = useSelector((action) => action?.user?.user);
  const isProductInWishlist = user?.wishlist.some(
    (item) => item.id === product._id
  );
  const [isWishlist, setIsWishlist] = useState(isProductInWishlist);
  const [collections, setCollections] = useState([]);
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);

  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isProductRemoved, setIsProductRemoved] = useState(false);

  const fetchCollections = async () => {
    try {
      const response = await fetch(APIs.fetchAdminCollections.url, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setCollections(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  const addProductToCollection = async (collectionId, productId, e) => {
    e.preventDefault();
    if (!collectionId || !productId) return;

    try {
      const response = await fetch(APIs.addProductToCollection.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
          productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection._id === collectionId
              ? {
                  ...collection,
                  collectionProductId: [
                    ...collection.collectionProductId,
                    productId,
                  ],
                }
              : collection
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to add product to collection:", error);
    } finally {
      setIsProductAdded(true);
      setTimeout(() => {
        setIsProductAdded(false);
        setIsCollectionVisible(false);
      }, 2000);
    }
  };

  const removeProductFromCollection = async (collectionId, productId, e) => {
    e.preventDefault();
    if (!collectionId || !productId) return;

    try {
      const response = await fetch(APIs.deletProductIdFromCollection.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
          productId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection._id === collectionId
              ? {
                  ...collection,
                  collectionProductId: collection.collectionProductId.filter(
                    (id) => id !== productId
                  ),
                }
              : collection
          )
        );
        fetchCollections();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to remove product from collection:", error);
    } finally {
      setIsProductRemoved(true);
      setTimeout(() => {
        setIsProductRemoved(false);
        setIsCollectionVisible(false);
      }, 2000);
    }
  };

  const handleAddToWishlist = async (e) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    e.preventDefault();
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

  const handleRemoveFromWishlist = async (e) => {
    e.preventDefault();
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

  useEffect(() => {
    fetchCollections();
  }, [user]);
  const handleAdminClick = (e) => {
    e.preventDefault();
    setIsCollectionVisible(!isCollectionVisible);
  };
  return (
    <>
      <div className="relative pr-2 w-[140px] vs:w-[160px] sm:w-[200px] md:w-[250px] lg:w-[300px] border bg-white shadow-lg rounded-lg font-semibold hover:scale-[1.05] transition-transform duration-200 ease-in-out">
        {product && (
          <div className="overflow-hn">
            <Link to={`/product`} state={{ product }}>
              <div className="flex flex-col md:flex-row items-center">
                {/* Product Image Section */}
                <div className="w-[100px] h-[100px] md:h-full md:w-[150px] p-2 flex items-center justify-center overflow-hidden m-0.5">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="max-w-full h-auto max-h-32 object-cover rounded-md scale-125"
                  />
                </div>

                {/* Product Details Section */}
                <div className="w-fit mx-auto px-2 py-1 md:py-2">
                  {/* Rating and Wishlist/Collection Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-center text-xs md:text-sm justify-between">
                      <div className="flex items-center text-xs md:text-sm gap-1">
                        <span className="text-base md:text-base">
                          {product.rating}
                        </span>
                        <FaStar color="gold" />
                        <span>({product.reviews.length})</span>
                      </div>
                      <span className="hidden sm:inline md:hidden bg-gray-200 rounded px-1 truncate py-0.5 text-xs text-gray-700">
                        {product?.brand ? product.brand : product.tags[0]}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 group z-100">
                      {!user && (
                        <>
                          <FaRegHeart
                            className="cursor-pointer"
                            onClick={handleAddToWishlist}
                          />
                          <span className="text-nowrap text-gray-700 text-sm absolute hidden -right-12 top-3 group-hover:inline">
                            Login to Save
                          </span>
                        </>
                      )}
                      {user?.role == "user" && isWishlist && (
                        <>
                          <FaHeart
                            color="red"
                            className="cursor-pointer"
                            onClick={handleRemoveFromWishlist}
                          />
                          <span className="text-nowrap text-gray-700 text-sm absolute hidden -right-16 top-3 group-hover:inline">
                            Remove from Wishlist
                          </span>
                        </>
                      )}
                      {user?.role == "user" && !isWishlist && (
                        <>
                          <FaRegHeart
                            className="cursor-pointer"
                            onClick={handleAddToWishlist}
                          />
                          <span className="text-nowrap text-gray-700 text-sm absolute hidden -right-12 top-3 group-hover:inline">
                            Add to Wishlist
                          </span>
                        </>
                      )}
                      {user?.role == "admin" && (
                        <>
                          <RiMenuAddFill
                            size={20}
                            className="cursor-pointer"
                            onClick={handleAdminClick}
                          />
                          {isCollectionVisible && (
                            <span className="flex flex-col absolute z-[500] bg-gray-500 rounded p-1 text-white -right-full text-nowrap text-sm">
                              {collections?.map((collection) =>
                                collection.collectionProductId?.some(
                                  (productObj) => productObj.id === product._id
                                ) ? (
                                  <span
                                    key={collection._id}
                                    className="cursor-pointer px-1"
                                    onClick={(e) =>
                                      removeProductFromCollection(
                                        collection._id,
                                        product._id,
                                        e
                                      )
                                    }
                                  >
                                    Remove from {collection.collectionName}
                                  </span>
                                ) : (
                                  <span
                                    key={collection._id}
                                    className="cursor-pointer px-1"
                                    onClick={(e) =>
                                      addProductToCollection(
                                        collection._id,
                                        product._id,
                                        e
                                      )
                                    }
                                  >
                                    Add to {collection.collectionName}
                                  </span>
                                )
                              )}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Product Brand */}
                  <span className="hidden md:inline bg-gray-200 rounded px-2 py-0.5 text-xs text-gray-700">
                    {product?.brand ? product.brand : product.tags[0]}
                  </span>

                  {/* Product Title */}
                  <h3
                    className="text-sm sm:text-base md:text-lg font-bold w-[140px] truncate mt"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {product.title}
                  </h3>

                  {/* Price and Discount */}
                  <div className="mt-1">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                      ₹
                      {Math.floor(
                        (product.price -
                          (product.discountPercentage * product.price) / 100) *
                          84
                      )}
                      <span className="px-2 text-sm text-gray-500 font-normal line-through">
                        ₹{Math.floor(product.price * 84)}
                      </span>
                    </p>
                    <p className="text-sm font-semibold text-red-500">
                      {product.discountPercentage}% off
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
