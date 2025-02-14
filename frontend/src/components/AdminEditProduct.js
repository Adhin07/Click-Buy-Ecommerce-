import React, { useState } from "react";
import { MdOutlineClose, MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import { toast } from "react-toastify";

function AdminEditProduct({ onclose, productData, fetchdata }) {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle input change
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Handle product image upload
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadedImage = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadedImage.url],
    }));
  };

  // ✅ Handle deleting product image
  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await fetch(SummaryApi.updateProduct.url, {
        method: SummaryApi.updateProduct.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onclose();
        fetchdata();
      } else {
        toast.error(responseData?.message || "Failed to update product!");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product.");
      console.error("Product Update Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <button className="text-2xl hover:text-red-600" onClick={onclose}>
            <MdOutlineClose />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block font-medium">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md bg-gray-100"
              required
            />
          </div>

          {/* Brand Name */}
          <div>
            <label className="block font-medium">Brand Name:</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md bg-gray-100"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category:</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="w-full p-2 border rounded-md bg-gray-100"
              required
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={index}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Images */}
          <div>
            <label className="block font-medium">Product Images:</label>
            <label htmlFor="uploadImageInput" className="cursor-pointer">
              <div className="p-2 bg-gray-100 border rounded-md flex flex-col items-center justify-center h-32">
                <FaCloudUploadAlt className="text-4xl text-gray-500" />
                <p className="text-sm text-gray-600">Upload Product Image</p>
              </div>
              <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
            </label>

            {/* Display Uploaded Images */}
            <div className="flex gap-2 mt-3">
              {data.productImage.length > 0 ? (
                data.productImage.map((el, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={el}
                      alt={`Product ${index}`}
                      className="w-20 h-20 border rounded-md cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <button
                      onClick={() => handleDeleteProductImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hidden group-hover:block"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-red-600 text-xs">* Please upload product images</p>
              )}
            </div>
          </div>

          {/* Price & Selling Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Price:</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                className="w-full p-2 border rounded-md bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Selling Price:</label>
              <input
                type="number"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleOnChange}
                className="w-full p-2 border rounded-md bg-gray-100"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              rows="3"
              className="w-full p-2 border rounded-md bg-gray-100"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white font-semibold transition-all ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>

      {/* Fullscreen Image Display */}
      {openFullScreenImage && <DisplayImage onclose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />}
    </div>
  );
}

export default AdminEditProduct;
