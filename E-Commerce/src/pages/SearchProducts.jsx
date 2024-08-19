import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIs from "../APIs";
import ProductCard from "../components/ProductCard";

const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(
      `${APIs.searchProducts.url}?query=${searchTerm}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm) {
        // Use searchTerm instead of query
        const result = await searchProducts(searchTerm);
        setProducts(result);
        console.log(result);
      }
    };

    fetchProducts();
  }, [searchTerm]); // Dependency array should include searchTerm

  return (
    <div className="m-2">
      <h1 className="text-2xl font-bold">Search Results</h1>
      <div className="flex gap-2 flex-wrap">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
