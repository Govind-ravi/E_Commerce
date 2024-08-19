import React from "react";
import Categories from "../components/Categories";
import AllCollections from "../components/AllCollections";

const Home = () => {

  return (
    <>
      <Categories />
      <div className="px-2 ">
        <AllCollections />
      </div>
    </>
  );
};

export default Home;
