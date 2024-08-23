import { Link } from "react-router-dom";
import categoryList from "../assets/CategoriesList";
import { useEffect, useState } from "react";

const Categories = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = () => {
      let loadedImagesCount = 0;
      categoryList.forEach((category) => {
        const img = new Image();
        img.src = category.image;
        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount === categoryList.length) {
            setLoading(false); // All images are loaded
          }
        };
      });
    };

    preloadImages();
  }, []);

  if (loading)
    return (
      <div className="h-40 sm:h-40 px-4 gap-2 sm:gap-4 flex overflow-x-scroll items-center justify-between">
        {categoryList.map((category, i) => (
          <div key={i} className="relative group">
            <div className="animate-pulse-sync flex items-center text-center justify-center w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full bg-gray-300 hover:-translate-y-2 transition-transform duration-200 ease-in-out"></div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="h-40 sm:h-40 px-4 gap-2 sm:gap-4 flex overflow-x-scroll items-center justify-between">
      {categoryList.map((category, i) => (
        <div key={i} className="relative group">
          <Link
            to={{
              pathname: `/category/${category.category}`,
              state: { category: category.category },
            }}
          >
            <div className="flex items-center text-center justify-center w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full bg-gray-400 hover:-translate-y-2 transition-transform duration-200 ease-in-out">
              <img
                src={category.image}
                alt={category.name}
                className="group rounded-full w-full h-full object-cover"
              />
            </div>
          </Link>
          <p className="font-semibold text-xxs sm:text-sm lg:bg-gray-100 rounded py-1 px-2 inline lg:hidden group-hover:inline absolute -bottom-8 text-nowrap left-1/2 transform -translate-x-1/2">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
