import { useContext, useEffect, useRef, useState, useCallback } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRcurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct?.data || []);
      setLoading(false);
    };
    fetchData();
  }, [category]);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const scrollRight = useCallback(() => {
    scrollElement.current.scrollLeft += 300;
  }, []);

  const scrollLeft = useCallback(() => {
    scrollElement.current.scrollLeft -= 300;
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      {/* Scroll Buttons */}
      <button
        className="bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 hidden md:block z-10"
        onClick={scrollLeft}
      >
        <FaAngleLeft size={20} />
      </button>

      <button
        className="bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block z-10"
        onClick={scrollRight}
      >
        <FaAngleRight size={20} />
      </button>

      {/* Product List */}
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all scroll-smooth"
        ref={scrollElement}
      >
        {loading
          ? Array.from({ length: 13 }).map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 flex items-center justify-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <div className="h-6 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse"></div>
                  <div className="flex gap-3">
                    <div className="w-full h-5 bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="w-full h-5 bg-slate-200 rounded-full animate-pulse"></div>
                  </div>
                  <button className="w-full h-8 bg-slate-200 rounded-full animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 flex items-center justify-center">
                  <img
                    src={product.productImage?.[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    alt="Product"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                    {product.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRcurrency(product.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRcurrency(product.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
