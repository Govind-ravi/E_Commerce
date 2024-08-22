import { useEffect, useState } from "react";
import APIs from "../APIs";
import { IoMdClose } from "react-icons/io";
import ProductCard from "../components/ProductCard";
import { fetchProductById } from "../helpers/fetchProduct";
import { Helmet } from "react-helmet";

const AdminCollections = () => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isAddCollectionVisible, setIsAddCollectionVisible] = useState(false);
  const [products, setProducts] = useState({});

  const createNewCollections = async () => {
    if (!newCollectionName) return;
    try {
      const response = await fetch(APIs.createAdminCollections.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName: newCollectionName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCollections([...collections, data.newCollection]);
        setNewCollectionName("");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to create collection:", error);
    } finally {
      setIsAddCollectionVisible(!isAddCollectionVisible);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(APIs.fetchAdminCollections.url, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setCollections(data.data);

        // Fetch all products based on product IDs in the collections
        const productIds = data.data?.flatMap((collection) =>
          collection.collectionProductId?.map((idObj) => idObj.id)
        );

        const productsData = await Promise.all(
          productIds?.map(async (id) => {
            const productData = await fetchProductById(id);
            return { id, productData };
          })
        );

        // Create a lookup table for product data
        const productLookup = productsData.reduce(
          (acc, { id, productData }) => {
            acc[id] = productData;
            return acc;
          },
          {}
        );

        setProducts(productLookup);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  useEffect(() => {
    fetchCollections();
    console.log(1);
  }, [setCollections]);

  return (
    <>
      <Helmet>
        <title>Govind Hub - My Collections</title>
        <meta
          name="description"
          content="Manage and organize product collections in the Govind Hub Admin Panel. Add, edit, or remove collections as needed."
        />
        <meta
          name="keywords"
          content="Govind Hub, admin collections, manage collections, product collections, admin panel"
        />
      </Helmet>

      <div className="flex flex-col gap-2">
        {!isAddCollectionVisible && (
          <button
            className="px-2 py-1 rounded my-2 w-fit"
            onClick={() => setIsAddCollectionVisible(!isAddCollectionVisible)}
          >
            Add New Collection
          </button>
        )}
        {isAddCollectionVisible && (
          <div className="w-1/3 ">
            <div className="flex justify-between text-xl font-semibold my-1">
              <span>Add New Collection</span>
              <IoMdClose
                onClick={() =>
                  setIsAddCollectionVisible(!isAddCollectionVisible)
                }
                className="bg-gray-700 text-white"
                size={22}
              />
            </div>
            <div className="flex">
              <input
                className="w-full px-2 py-1 rounded-l bg-gray-200 text-base font-semibold placeholder-gray-600 outline-none"
                type="text"
                placeholder="New Collection Name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <button
                className="text-nowrap px-2 py-1 rounded-r"
                onClick={createNewCollections}
              >
                Create Collection
              </button>
            </div>
          </div>
        )}
        <h2 className="text-3xl font-semibold">Your Collections</h2>
        <div className="">
          {collections?.map((collection) => (
            <div className="" key={collection._id}>
              <h3 className="mt-4 mb-1 text-2xl font-semibold">
                {collection.collectionName}
              </h3>
              <div className="flex flex-wrap gap-2">
                {collection.collectionProductId?.map((idObj) => {
                  const productData = products[idObj.id];
                  return productData ? (
                    <ProductCard key={idObj.id} product={productData} />
                  ) : (
                    <div key={idObj.id}>Loading product...</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminCollections;
