import React, { Component, useRef } from "react";
import ProductCard from "../components/ProductCard";

const Home = () =>{
    const featuredRef = useRef(null)
    return (
      <>
        <div className="p-2">
          <div className="m-2 rounded h-[60vh] bg-[#f7ce98] flex items-center">
            <div className="w-[60%] p-4">
              <h1 className="text-4xl text-wite font-semibold">
                Apple AirPods Max Silver
              </h1>
              <p>1000/-</p>
              <button className="py-2 px-4 rounded">Buy Now</button>
            </div>
            <div className="flex">
              <img
                width={400}
                src="https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png"
                alt=""
              />
            </div>
          </div>
          <div id="featured" ref={featuredRef} className="m-2">
            <h1 className="text-3xl font-semibold">Featured Products</h1>
            <div className="flex gap-4">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </>
    );
  }

export default Home;
