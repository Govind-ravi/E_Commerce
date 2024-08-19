import { useEffect, useState } from "react";
import APIs from "../APIs";
import { fetchProductById } from "../helpers/fetchProduct";
import ProductCard from "./ProductCard";
import Slider from "./Slider";

const AllCollections = () => {
  const [collections, setCollections] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);

  const fetchAllCollections = async () => {
    try {
      const response = await fetch(APIs.allCollections.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCollections(data.data);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  const fetchAllProducts = async () => {
    const allProducts = []; // Local variable to store all products

    for (const collection of collections) {
      const products = await Promise.all(
        collection.collectionProductId.map((id) => fetchProductById(id.id))
      );
      allProducts.push({
        collectionName: collection.collectionName,
        products: products,
      });
    }

    setCollectionProducts(allProducts); // Update state once
  };

  useEffect(() => {
    fetchAllCollections();
  }, []);

  useEffect(() => {
    if (collections.length > 0) {
      fetchAllProducts();
    }
  }, [collections]);

  return (
    <>
      {collectionProducts &&
        collectionProducts.map((collection) => {
          const firstProduct = collection?.products[0];
          if (collection?.collectionName === "Best Seller" && firstProduct) {
            return (
              <div
                key={collection.collectionName}
                id="bestSeller"
                className="m-4 rounded-lg h-[60vh] bg-[#f7ce98] flex items-center justify-between p-6 shadow-lg overflow-hidden"
              >
                <div className="w-[50%] p-4 flex flex-col justify-center">
                  <h1 className="text-5xl font-bold text-white mb-2">
                    {firstProduct?.title}
                  </h1>
                  <p className="text-xl text-gray-800 mb-4">
                    ₹
                    {Math.floor(
                      (firstProduct?.price -
                        (firstProduct?.discountPercentage *
                          firstProduct?.price) /
                          100) *
                        84
                    )}
                  </p>
                  <p className="text-md text-gray-700 mb-4">
                    {firstProduct?.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                      onClick={() =>
                        (window.location.href = `/product/${firstProduct.id}`)
                      }
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="w-[35%] p-4">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={firstProduct?.thumbnail}
                    alt={firstProduct?.title}
                  />
                </div>
              </div>
            );
          } else if (
            collection?.collectionName === "Trending Now" &&
            collection?.products?.length > 0
          ) {
            return (
              <div key={collection.collectionName} id="topDeals" className="">
                <h1 className="text-3xl font-semibold m-2">Trending Now</h1>
                <div className="relative m-4 rounded-lg h-[60vh] bg-[#E0F2F1] flex items-center justify-between p-6 shadow-lg">
                  <Slider products={collection.products} />
                </div>
              </div>
            );
          } else if (collection?.products?.length > 0) {
            return (
              <div key={collection.collectionName} className="p-2">
                <h2 className="text-2xl font-semibold">
                  {collection.collectionName}
                </h2>
                <div className="flex gap-2 py-2 overflow-y-scroll">
                  {collection.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
    </>
  );
};

export default AllCollections;
