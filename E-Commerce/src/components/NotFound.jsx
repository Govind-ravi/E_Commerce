import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Govind Hub - Page Not Found</title>
        <meta
          name="description"
          content="The page you're looking for cannot be found. Please check the URL or return to the homepage."
        />
        <meta
          name="keywords"
          content="Govind Hub, 404 error, page not found, URL error, homepage"
        />
      </Helmet>

      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-2xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
