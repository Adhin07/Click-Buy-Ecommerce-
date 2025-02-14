import React, { useEffect, useState } from "react";
import displayINRcurrency from "../helpers/displayCurrency";
import moment from "moment";
import SummaryApi from "../common";

function AllOrders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(SummaryApi.allOrder.url, {
        method: SummaryApi.allOrder.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (result.success) setOrders(result.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (orders.length === 0)
    return <p className="p-4 text-center">No orders available</p>;

  return (
    <div className="p-4 w-full space-y-6">
      {orders.map((order, index) => (
        <div
          key={`${order.userId}-${index}`}
          className="border p-4 rounded-md bg-white shadow-md"
        >
          {/* Order Date */}
          <p className="font-semibold text-lg text-gray-700">
            {moment(order.createdAt).format("LL")}
          </p>

          <div className="border rounded-lg p-4 mt-2">
            <div className="grid gap-6 lg:flex justify-between">
              {/* Product Details */}
              <div className="space-y-4">
                {order.productDetails.map((product, pIndex) => (
                  <div
                    key={`${product.productId}-${pIndex}`}
                    className="flex gap-4 bg-gray-100 p-3 rounded-md"
                  >
                    <img
                      src={product.Image?.[0]}
                      className="w-28 h-28 bg-gray-200 object-scale-down p-2 rounded-md"
                      alt="product"
                    />
                    <div>
                      <p className="font-medium text-lg text-ellipsis line-clamp-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-lg text-red-500">
                          {displayINRcurrency(product.price)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="min-w-[300px] space-y-4">
                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Payment Details
                  </h3>
                  <p className="text-gray-600">
                    Method: {order.paymentDetails.payment_method_types[0]}
                  </p>
                  <p className="text-gray-600">
                    Status: {order.paymentDetails.payment_status}
                  </p>
                </div>

                {/* Shipping Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Shipping Details
                  </h3>
                  {order.shipping_options.map((shipping, sIndex) => (
                    <p key={sIndex} className="text-gray-600">
                      Shipping Amount:{" "}
                      {displayINRcurrency(shipping.shipping_amount)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Amount */}
            <div className="font-semibold text-lg text-right text-gray-800 mt-4">
              Total Amount: {displayINRcurrency(order.totalAmount)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllOrders;
