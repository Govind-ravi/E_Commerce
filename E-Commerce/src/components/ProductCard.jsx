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
  const [isWishlist, setIsWishlist] = useState(false);
  const [collections, setCollections] = useState([]);

  const [newCollectionName, setNewCollectionName] = useState("");
  const [productId, setProductId] = useState("");
  const [isCollectionVisible, setIsCollectionVisible] = useState(false);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isProductRemoved, setIsProductRemoved] = useState(false);
  const handleWishlist = () => {
    setIsWishlist((prev) => {
      return !prev;
    });
  };
  const fetchCollections = async () => {
    try {
      const response = await fetch(APIs.fetchAdminCollections.url, {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setCollections(data.collections);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  const addProductToCollection = async (collectionId, productId) => {
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

  const removeProductFromCollection = async (collectionId, productId) => {
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

  useEffect(() => {
    fetchCollections();
  }, []);
  const handleAdminClick = () => {
    setIsCollectionVisible(!isCollectionVisible);
  };
  return (
    <>
      <div className="w-[350px] border shadow-md rounded font-semibold hover:scale-[1.02] transition">
        {product && (
          <div className=" overflow-x-hidden">
            <div className="relative group">
              {user.role !== "user" && isWishlist && (
                <FaHeart
                  color="red"
                  className="absolute right-2 top-2 z-10 cursor-pointer"
                  onClick={handleWishlist}
                />
              )}
              {user.role !== "user" && !isWishlist && (
                <FaRegHeart
                  className="absolute right-2 top-2 z-10 cursor-pointer"
                  onClick={handleWishlist}
                />
              )}
              {user.role !== "admin" && !isWishlist && (
                <>
                  <RiMenuAddFill
                    size={20}
                    className="group absolute right-2 top-2 z-10 cursor-pointer"
                    onClick={handleAdminClick}
                  />
                  {!isCollectionVisible && (
                    <span className="text-gray-700 absolute hidden right-8 top-1 group-hover:inline">
                      Add to collection
                    </span>
                  )}
                  {isCollectionVisible && (
                    <span className=" absolute right-8 bg-amber-200 top-1 z-10 flex flex-col gap-1 rounded">
                      {!isProductAdded && !isProductRemoved ? (
                        collections.map((collection) => {
                          return collection.collectionProductId.some(
                            (productObj) => productObj.id === product._id
                          ) ? (
                            <span
                              key={collection._id}
                              className="cursor-pointer px-1"
                              onClick={() => {
                                removeProductFromCollection(
                                  collection._id,
                                  product._id
                                );
                              }}
                            >
                              Remove from {collection.collectionName}
                            </span>
                          ) : (
                            <span
                              key={collection._id}
                              className="cursor-pointer px-1"
                              onClick={() => {
                                addProductToCollection(
                                  collection._id,
                                  product._id
                                );
                              }}
                            >
                              Add to {collection.collectionName}
                            </span>
                          );
                        })
                      ) : (
                        <div>
                          {isProductAdded && <span className="px-2">Added</span>}
                          {isProductRemoved && <span className="px-2">Removed</span>}
                        </div>
                      )}
                    </span>
                  )}
                </>
              )}
            </div>
            <Link to={`/product`} state={{ product }}>
              <div className="relative">
                <img
                  src={product.thumbnail}
                  height={270}
                  alt=""
                  className="h-[270px] mx-auto"
                />
                <div className="flex items-center gap-1 absolute bottom-0 left-0">
                  <span className="font-semibold px-2 py-1 rounded flex w-16 items-center gap-2">
                    {product.rating}
                    <FaStar color="red" />
                  </span>
                  <span>({product && product.reviews.length})</span>
                </div>
              </div>
              <div className=" p-2">
                <h4 className="text-2xl" style={{ fontFamily: "sans-serif" }}>
                  {product.brand? product.brand: 'Branded'}
                </h4>
                <h3
                  className="text-xl truncate"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {product.title}
                </h3>

                <p className="font-bold">
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
                <p className="text-sm font-semibold text-red-500">
                  {product.discountPercentage} % off
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
