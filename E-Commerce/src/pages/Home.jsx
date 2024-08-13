import React, { Component } from "react";
import Headphone from "../assets/Headphone.png";

export class Home extends Component {
  render() {
    return (
      <>
        <div className="m-4 rounded p-2 h-[60vh] bg-[#f7ce98] flex items-center">
          <div className="w-[60%] p-4">
            <h1 className="text-4xl text-wite font-semibold">
            Apple AirPods Max Silver
            </h1>
            <p>1000/-</p>
            <button className="py-2 px-4 rounded">Buy Now</button>
          </div>
          <div className="flex">
            <img width={400} src="https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png" alt="" />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
