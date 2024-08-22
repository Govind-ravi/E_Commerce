import React from "react";
import Categories from "../components/Categories";
import AllCollections from "../components/AllCollections";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Govind Hub - Home</title>
        <meta
          name="description"
          content="Welcome to Govind Hub. Explore our latest products and collections."
        />
        <meta
          name="keywords"
          content="Govind Hub, e-commerce, online shopping, best products, collections"
        />
      </Helmet>
      <Categories />
      <div className="px-2 ">
        <AllCollections />
      </div>
    </>
  );
};

export default Home;
