import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import categoryList from "../assets/CategoriesList";
import APIs from "../APIs";
import { Helmet } from "react-helmet";
import LoadingScreen from "../helpers/LoadingScreen";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${APIs.getProductsByCategory.url}/${categoryName}`
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
    fetchProducts();
  }, [categoryName]);

  if (loading) return <div className="my-2 mx-4 flex flex-wrap gap-4">
  <LoadingScreen width={'250px'} height={'150px'}/>
  <LoadingScreen width={'250px'} height={'150px'}/>
  <LoadingScreen width={'250px'} height={'150px'}/>
  <LoadingScreen width={'250px'} height={'150px'}/>
</div>;

  if (products.length === 0) {
    return (
      <div className="p-4 font-semibold text-xl">
        No Products found in this category
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>
          Govind Hub - {`${products[0]?.category.replace(/-/g, " ")}`} Products
        </title>
        <meta
          name="description"
          content="Browse products by category on Govind Hub. Find the best items in each category and make your purchase today."
        />
        <meta
          name="keywords"
          content="Govind Hub, category products, product categories, shop by category, online shopping"
        />
      </Helmet>

      <h1 className="text-3xl m-2 sm:m-4 capitalize">
        {products[0]?.category.replace(/-/g, " ")}
      </h1>
      <div className="flex flex-wrap gap-2 xs:gap-4 mx-2 md:mx-4">
        {products.map((product) => {
          return <ProductCard key={product.title} product={product} />;
        })}
      </div>
    </>
  );
};

export default CategoryProducts;
