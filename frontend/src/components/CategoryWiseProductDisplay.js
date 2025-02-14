import { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRcurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import scrollTop from "../helpers/scrolllTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = Array.from({ length: 6 });

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* ✅ Show Loading Skeleton */}
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-md shadow-md animate-pulse"
              >
                <div className="bg-gray-200 h-48 w-full rounded-t-md"></div>
                <div className="p-4">
                  <div className="bg-gray-200 h-6 w-3/4 rounded-md"></div>
                  <div className="bg-gray-200 h-4 w-1/2 mt-2 rounded-md"></div>
                  <div className="flex justify-between mt-4">
                    <div className="bg-gray-200 h-6 w-1/4 rounded-md"></div>
                    <div className="bg-gray-200 h-6 w-1/4 rounded-md"></div>
                  </div>
                  <div className="bg-gray-200 h-8 w-full mt-4 rounded-md"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="w-full bg-white rounded-md shadow-md hover:shadow-lg transition-all"
                onClick={scrollTop}
              >
                {/* ✅ Product Image */}
                <div className="bg-gray-100 h-48 flex items-center justify-center rounded-t-md">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="h-full object-contain mix-blend-multiply transition-all hover:scale-105"
                  />
                </div>

                {/* ✅ Product Details */}
                <div className="p-4">
                  <h2 className="font-medium text-base md:text-lg text-gray-800 truncate">
                    {product.productName}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {product?.category}
                  </p>

                  {/* ✅ Price & Discount */}
                  <div className="flex justify-between mt-2">
                    <p className="text-red-600 font-bold">
                      {displayINRcurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-gray-500 line-through">
                      {displayINRcurrency(product?.price)}
                    </p>
                  </div>

                  {/* ✅ Add to Cart Button */}
                  <button
                    className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product._id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
