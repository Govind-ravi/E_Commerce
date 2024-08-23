import { useEffect, useState } from "react";
import APIs from "../APIs";
import { fetchProductById } from "../helpers/fetchProduct";
import ProductCard from "./ProductCard";
import Slider from "./Slider";
import MobileSlider from "./MobileProductSlider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoadingScreen from "../helpers/LoadingScreen";

const AllCollections = () => {
  const [collections, setCollections] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [collectionsFetched, setCollectionsFetched] = useState(false);
  const [loading, setloading] = useState(false);

  const fetchAllCollections = async () => {
    setloading(true);
    try {
      const response = await fetch(APIs.allCollections.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCollections(data.data);
      setCollectionsFetched(true); // Set flag to true after fetching collections
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

    setCollectionProducts(allProducts);
    setloading(false); // Update state once
  };

  // Fetch collections only once when the component mounts
  useEffect(() => {
    fetchAllCollections();
  }, []); // Empty dependency array ensures it runs only once

  // Fetch products only when collections are fetched and updated
  useEffect(() => {
    if (collectionsFetched && collections.length > 0) {
      fetchAllProducts();
    }
  }, [collections, collectionsFetched]); // Dependencies: collections and collectionsFetched

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return (
      <div className="w-[95vw] mx-auto">
        <LoadingScreen width={"95vw"} height={"400px"} />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Govind Hub - Manage Collections</title>
        <meta
          name="description"
          content="Manage and organize product collections in the Govind Hub Admin Panel. Add, edit, or remove collections efficiently."
        />
        <meta
          name="keywords"
          content="Govind Hub, manage collections, product collections, admin panel, organize collections"
        />
      </Helmet>

      {collectionProducts &&
        collectionProducts.map((collection) => {
          const firstProduct = collection?.products[0];
          if (collection?.collectionName === "Best Seller" && firstProduct) {
            return (
              <div
                key={collection.collectionName}
                id="Best Seller"
                className="sm:mx-4 rounded-lg h-[25vh] xss:h-[30vh] xs:h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-[#f7ce98] flex items-center justify-between p-2 xxs:p-6 shadow-lg overflow-hidden"
              >
                <div className="w-[50%] xs:p-4 flex flex-col justify-center">
                  <h1 className="text-xl xss:text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {firstProduct?.title}
                  </h1>
                  <p className="text-lg xs:text-xl sm:text-2xl text-gray-800 mb-4">
                    ₹
                    {Math.floor(
                      (firstProduct?.price -
                        (firstProduct?.discountPercentage *
                          firstProduct?.price) /
                          100) *
                        84
                    )}
                    <span className="px-2 text-sm sm:text-lg text-gray-500 font-normal line-through">
                      ₹{Math.floor(firstProduct.price * 84)}
                    </span>
                  </p>
                  <p className="hidden sm:block text-gray-700 mb-4">
                    {firstProduct?.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link to="/product" state={{ product: firstProduct }}>
                      <button className="py-1 px-2 xs:py-2 xs:px-4 bg-[#fae04e] text-white font-semibold rounded-lg shadow-md hover:bg-[#fde355] transition duration-300">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-[150px] xxs:w-[170px] xs:w-[200px] sm:w-[300px] md:w-[350px] lg:w-[400px] sm:p-4">
                  <img
                    className="w-full h-full object-cover rounded-lg scale-125"
                    src={firstProduct?.thumbnail}
                    alt={firstProduct?.title}
                  />
                </div>
              </div>
            );
          } else return null;
        })}
      {collectionProducts &&
        collectionProducts.map((collection) => {
          if (
            collection?.collectionName === "Trending Now" &&
            collection?.products?.length > 0
          ) {
            return (
              <div
                key={collection.collectionName}
                id="Trending Now"
                className="mb-4"
              >
                <h1 className="text-lg mt-4 xs:text-2xl sm:text-3xl font-semibold m-2">
                  Trending Now
                </h1>
                <div
                  className={`relative xs:m-2 sm:m-4 rounded-lg h-[25vh] xss:h-[30vh] xs:h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-[#bfd5d4] p-2 sm:p-6 shadow-lg ${
                    isMobile ? "lg:hidden" : "hidden lg:flex"
                  }`}
                >
                  {isMobile ? (
                    <MobileSlider products={collection.products} />
                  ) : (
                    <Slider products={collection.products} />
                  )}
                </div>
              </div>
            );
          } else return null;
        })}
      {collectionProducts &&
        collectionProducts.map((collection) => {
          if (
            collection?.collectionName !== "Best Seller" &&
            collection?.collectionName !== "Trending Now" &&
            collection?.products?.length > 0
          ) {
            return (
              <div
                id={collection.collectionName}
                key={collection.collectionName}
                className="p-2"
              >
                <h2 className="text-2xl font-semibold">
                  {collection.collectionName}
                </h2>
                <div className="flex gap-2 xs:py-2 overflow-y-scroll">
                  {collection.products.map((product, i) => (
                    <ProductCard key={i} product={product} />
                  ))}
                </div>
              </div>
            );
          } else return null;
        })}
    </>
  );
};

export default AllCollections;
