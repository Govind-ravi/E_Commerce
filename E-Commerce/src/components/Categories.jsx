import { Link } from "react-router-dom";
import categoryList from "../assets/CategoriesList";

const Categories = () => {
  return (
    <>
      <div className="h-44 mt-26 px-4 gap-4 flex overflow-x-scroll items-center justify-betwen">
        {categoryList.map((category) => {            
          return (
            <>
              <div className="relative group ">
              <Link
                    to={{
                      pathname: `/category/${category.category}`,
                      state: { category: category.category }, 
                    }}
                  >
                <div
                  key={category.name}
                  className="flex items-center justify-center w-24 h-24 flex-shrink-0 rounded-full bg-gray-400 hover:-translate-y-2 transition-transform duration-200 ease-in-out"
                >
                  
                    <img
                      src={category.image}
                      alt={category.name}
                      className="group rounded-full w-full h-full object-cover"
                    />
                </div>
                  </Link>
                <p className="font-semibold text-sm bg-gray-100 rounded py-1 px-2 hidden group-hover:inline absolute -bottom-8 text-nowrap left-1/2 transform -translate-x-1/2">
                  {category.name}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
