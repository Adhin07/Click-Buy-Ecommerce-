import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRcurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all w-48 min-h-[240px] flex flex-col justify-between">
      {/* Product Image */}
      <div className="w-full h-32 flex justify-center items-center bg-white rounded-md">
        <img
          src={data?.productImage[0]}
          alt="Product"
          className="mx-auto object-fill h-full "
        />
      </div>

      {/* Product Details */}
      <div className="mt-2">
        <h1 className="text-md font-semibold text-gray-700 truncate">
          {data.productName}
        </h1>
        <p className="text-green-600 font-bold">
          {displayINRcurrency(data.sellingPrice)}
        </p>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setEditProduct(true)}
        className="p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white transition-all w-fit mx-auto"
      >
        <MdModeEditOutline className="text-xl" />
      </button>

      {/* Edit Product Modal */}
      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-all">
          <AdminEditProduct
            productData={data}
            onclose={() => setEditProduct(false)}
            fetchdata={fetchdata}
          />
        </div>
      )}
    </div>
  );
};

export default AdminProductCard;
