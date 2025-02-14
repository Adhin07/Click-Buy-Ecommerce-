import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import displayINRcurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { setCartProductCount } from "../store/userSlice";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cartProductCount = useSelector((state) => state.user.cartProductCount);
  const dispatch = useDispatch();

  // Fetch cart data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
        dispatch(setCartProductCount(responseData.data.length));
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Increase quantity
  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  // Decrease quantity
  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  // Delete cart product
  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ _id: id }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  // Handle Payment
  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cartItems: data }),
    });

    const responseData = await response.json();
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  // Calculate total
  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p className="bg-white py-5">No Data</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* Cart Items */}
        <div className="w-full max-w-3xl">
          {loading
            ? Array.from({ length: cartProductCount }).map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map((product, index) => (
                <div
                  key={product?._id + "Add To Cart Loading"}
                  className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                      alt=""
                    />
                  </div>

                  <div className="px-4 py-2 relative">
                    {/* Delete Product */}
                    <div
                      className="absolute right-0 text-red-600 p-2 w- rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteCartProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text lg:text-xl text-ellipsis line-clamp-2">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRcurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold text-lg">
                        {displayINRcurrency(product?.productId?.sellingPrice * product?.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="p-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex rounded justify-center items-center"
                        onClick={() => decreaseQty(product?._id, product?.quantity)}
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="p-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex rounded justify-center items-center"
                        onClick={() => increaseQty(product?._id, product?.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        {data.length > 0 && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
            <p>Quantity: {totalQty}</p>
            <p>Total Price: {displayINRcurrency(totalPrice)}</p>
            <button className="bg-blue-600 p-2 text-white w-full mt-2" onClick={handlePayment}>
              Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
