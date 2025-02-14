import React, { useEffect, useState, useCallback } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const data = await response.json();
      setAllProducts(data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div>
      {/* Header Section */}
      <div className=" py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/* Product Grid - 6 per row on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll px-4">
        {allProducts.map((product, index) => (
          <AdminProductCard data={product} key={`product-${index}`} fetchdata={fetchAllProducts} />
        ))}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && <UploadProduct onclose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProducts} />}
    </div>
  );
};

export default AllProducts;
