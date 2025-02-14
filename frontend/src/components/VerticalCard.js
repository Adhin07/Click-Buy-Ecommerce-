import React, { useContext } from "react";
import scrollTop from "../helpers/scrolllTop";
import displayINRcurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
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
              className="w-full min-w-[280px] md:min-w-[300px] max-w-[300px] bg-white rounded-sm shadow"
              onClick={scrollTop}
            >
              <div className="bg-slate-200 h-48 flex items-center justify-center">
                <img
                  src={product.productImage?.[0]}
                  alt={product.productName}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
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
  );
};

export default VerticalCard;
