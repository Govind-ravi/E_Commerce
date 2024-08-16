import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import categoryList from "../assets/CategoriesList";

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
          `https://dummyjson.com/products/category/${categoryName}`
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
  }, []);

  return (
    <>
    <h1 className="text-3xl">{category_name}</h1>
      <div className="flex flex-wrap gap-4">
        {products.map((product) => {
          return <ProductCard key={product.title} product={product} />;
        })}
      </div>
    </>
  );
};

export default CategoryProducts;
