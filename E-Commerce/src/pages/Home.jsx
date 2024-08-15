import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import headphone from "../assets/Headphone.png";
import Slider from "../components/Slider";

const Home = () => {
  const featuredRef = useRef(null);
  const [products, setProducts] = useState([]); // State to store products
  const [product, setProduct] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category/beauty');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products); // Set products state
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/194');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data); // Set products state
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProduct();
    fetchProducts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-2">
        <div
          id="bestSeller"
          className="m-2 rounded h-[50vh] bg-[#f7ce98] flex items-center min-w-[90vw] p-2 px-4"
        >
          <div className="w-[60%] p-4">
            <h1 className="text-4xl text-white font-semibold">
              {product.title}
            </h1>
            <p>{product.price}/-</p>
            <button className="py-2 px-4 rounded">Buy Now</button>
          </div>
          <div className="flex">
            <img width={400} src={product.thumbnail} alt={product.title} />
          </div>
        </div>
        <div id="topDeals">
          <h1 className="text-3xl font-semibold m-2">Top Deals</h1>
          <div className="m-2 rounded h-[50vh] bg-blue-200 flex min-w-[90vw]">
            <Slider products={products} />
          </div>
        </div>
        <div id="featured" ref={featuredRef} className="m-2">
          <h1 className="text-3xl font-semibold">Featured Products</h1>
          <div className="flex gap-4 flex-wrap">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} /> // Pass product as a prop
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
