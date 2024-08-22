import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import categoryList from "../assets/CategoriesList";
import APIs from "../APIs";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category_name = categoryList.map((item, i) => {
    if (item.category === categoryName) {
      return item.name;
    }
  });

  useEffect(() => {
    const fetchProducts = async () => {
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

  if(products.length === 0){
    return (
      <div className="p-4 font-semibold text-xl">No Products found in this category</div>
    )
  }
  return (
    <>
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
