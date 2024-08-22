import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import APIs from "../APIs";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const AdminProducts = () => {
  const user = useSelector((action) => action?.user?.user);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploadform, setIsUploadform] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(APIs.getProducts.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchProducts();
  }, []);

  const initialProductData = {
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    tags: [""],
    rating: 0,
    brand: "",
    weight: 0,
    warrantyInformation: "",
    availabilityStatus: "In Stock",
    returnPolicy: "",
    reviews: [
      {
        rating: 0,
        comment: "",
        date: new Date(),
        reviewerName: "",
        reviewerEmail: "",
      },
    ],
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    images: [""],
    thumbnail: "",
  };

  const [productData, setProductData] = useState(initialProductData);

  const handleUploadFormVisble = () => {
    setIsUploadform(!isUploadform);
    setProductData(initialProductData);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags") {
      const tagValue = value;
      const tagsArray = tagValue.split(",");
      console.log(tagsArray);

      setProductData((prevData) => ({
        ...prevData,
        [name]: tagsArray,
      }));
    } else if (name in productData.dimensions) {
      // Update dimensions separately
      setProductData((prevData) => ({
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [name]: value,
        },
      }));
    } else {
      // Update the rest of the fields
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(APIs.uploadProduct.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productData }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Product uploaded successfully:", data);
      setIsUploadform(false);
      setProduct(initialProductData);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const handleImageChange = (index, event) => {
    const newImages = [...productData.images];
    newImages[index] = event.target.value;
    setProductData({ ...productData, images: newImages });
  };

  const handleAddImage = () => {
    setProductData({ ...productData, images: [...productData.images, ""] });
  };

  const handleRemoveImage = (index) => {
    if (productData.images.length > 1) {
      // Ensure at least one input remains
      const newImages = productData.images.filter((_, i) => i !== index);
      setProductData({ ...productData, images: newImages });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Govind Hub - Admin Products</title>
        <meta
          name="description"
          content="Manage and update product listings on the Govind Hub Admin Panel. Add, edit, or remove products and organize inventory."
        />
        <meta
          name="keywords"
          content="Govind Hub, admin products, manage products, product listings, inventory management"
        />
      </Helmet>

      {isUploadform && (
        <form
          action=""
          className="font-semibold p-2"
          onSubmit={handleProductSubmit}
        >
          <div className="relative flex w-4/5 mx-auto gap-12 p-2 justify-center border m-2">
            <IoMdClose
              size={24}
              className="bg-gray-300 absolute top-0 right-0"
              onClick={handleUploadFormVisble}
            />
            <div className="w-1/2 flex flex-col gap-4 m-2 p-2">
              {/* Title */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="title"
                    value={productData.title}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Product Title"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>

              {/* Description */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleProductChange}
                    placeholder="Product Description"
                    className="border-2 p-2 w-full bg-transparent rounded-lg focus:outline-none"
                    rows="5"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>

              {/* Category */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="category"
                    value={productData.category}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Category"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>

              {/* Price */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="price"
                    value={productData.price}
                    onChange={handleProductChange}
                    type="number"
                    placeholder="Price"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>

              {/* Discount Percentage */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="discountPercentage"
                    value={productData.discountPercentage}
                    onChange={handleProductChange}
                    type="number"
                    step="0.01"
                    placeholder="Discount Percentage"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>

              {/* Stock */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="stock"
                    value={productData.stock}
                    onChange={handleProductChange}
                    type="number"
                    placeholder="Stock"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>

              {/* Tags */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="tags"
                    value={productData.tags}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
                {productData.tags[0] && (
                  <span className="text-gray-600">(Comma separated)</span>
                )}
                <div className="flex flex-wrap gap-1">
                  {productData.tags[0] &&
                    productData.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className=" px-1 rounded text-gray-600 bg-gray-300"
                        >
                          {tag}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-4 m-2 p-2">
              {/* Brand */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="brand"
                    value={productData.brand}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Brand"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
              {/* Weight */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="weight"
                    value={productData.weight}
                    onChange={handleProductChange}
                    type="number"
                    step="0.01"
                    placeholder="Weight (in grams)"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
              {/* Warranty Information */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="warrantyInformation"
                    value={productData.warrantyInformation}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Warranty Information"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
              {/* Availability Status */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="availabilityStatus"
                    value={productData.availabilityStatus}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Availability Status"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
              {/* Return Policy */}
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="returnPolicy"
                    value={productData.returnPolicy}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Return Policy"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
              {/* Dimensions */}
              <div>
                <label className="font-semibold">Dimensions (in cm):</label>
                <div className="flex gap-4">
                  <div>
                    <input
                      name="width"
                      value={productData.dimensions.width}
                      onChange={handleProductChange}
                      type="number"
                      step="0.01"
                      placeholder="Width"
                      className="w-full bg-transparent rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      name="height"
                      value={productData.dimensions.height}
                      onChange={handleProductChange}
                      type="number"
                      step="0.01"
                      placeholder="Height"
                      className="w-full bg-transparent rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      name="depth"
                      value={productData.dimensions.depth}
                      onChange={handleProductChange}
                      type="number"
                      step="0.01"
                      placeholder="Depth"
                      className="w-full bg-transparent rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
              {/* Images */}
              <div className="flex flex-col">
                Add Image URLs
                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-2 mb-2"
                  >
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e)}
                      placeholder="Image URL"
                      className="w-full bg-transparent rounded-lg focus:outline-none"
                    />
                    {productData.images.length > 1 && (
                      <div
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute right-0 text-red-500"
                      >
                        <FaTrash size={12} />
                      </div>
                    )}
                  </div>
                ))}
                <div
                  type="button"
                  onClick={handleAddImage}
                  className="flex items-center"
                >
                  <FaPlus size={12} className="mr-2" />
                  Add another image
                </div>
              </div>
              <div>
                <div className="relative flex items-center justify-between rounded-lg">
                  <input
                    name="thumbnail"
                    value={productData.thumbnail}
                    onChange={handleProductChange}
                    type="text"
                    placeholder="Thumbnail URL"
                    className="w-full bg-transparent rounded-lg focus:outline-none"
                  />
                </div>
                <div className="h-[0.05rem] mt-2 bg-black"></div>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex flex-col gap-2">
            {user.role === "user" ? (
              <button
                type="submit"
                className="disabled cursor-not-allowed font-semibold text-black rounded p-2 w-40 mx-auto transition duration-200"
              >
                Only Admin can upload Product
              </button>
            ) : (
              <button
                type="submit"
                className="font-semibold text-black rounded p-2 w-40 mx-auto transition duration-200"
              >
                Upload Product
              </button>
            )}
          </div>
        </form>
      )}
      {!isUploadform && (
        <button
          onClick={handleUploadFormVisble}
          className="py-2 px-4 font-semibold rounded my-2"
        >
          Upload a product
        </button>
      )}
      {products.length > 1 && (
        <div>
          <h1 className="text-2xl">Your Products</h1>
          <div className="flex flex-wrap gap-2">
            {products.map((product) => {
              return <ProductCard product={product} />;
            })}
          </div>
        </div>
      )}
      {products.length === 1 && (
        <div>
          <ProductCard product={product} />
        </div>
      )}
    </>
  );
};

export default AdminProducts;
