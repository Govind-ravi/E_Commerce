import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";

const Home = () => {
  const featuredRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/beauty"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/194");
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

  if (loading) {
    return <div>Loading...</div>;
  }
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
            {products && <Slider products={products} />}
          </div>
        </div>
        <div id="featured" ref={featuredRef} className="m-2">
          <h1 className="text-3xl font-semibold">Featured Products</h1>
          <div className="flex gap-4 flex-wrap">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} /> 
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
