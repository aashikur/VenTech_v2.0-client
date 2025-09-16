import React, { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/axiosPublic";

const Order = () => {
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get("/api/v1/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [axiosPublic]);

  if (loading) {
    return <div className="text-center mt-10">Loading orders...</div>;
  }
 console.log(orders)
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Product</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Quantity</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Merchant</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Ordered By</th>
              <th className="px-4 py-2 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, idx) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border-b">{idx + 1}</td>
                  <td className="px-4 py-2 border-b">{order.product.title}</td>
                  <td className="px-4 py-2 border-b">{order.product.category}</td>
                  <td className="px-4 py-2 border-b">{order.quantity}</td>
                  <td className="px-4 py-2 border-b">
                    {order.product.retailPrice * order.quantity} BDT
                  </td>
                  <td className="px-4 py-2 border-b">
                    {order.product.addedByMerchant.name}
                  </td>
                  <td className="px-4 py-2 border-b capitalize">{order.status}</td>
                  <td className="px-4 py-2 border-b">{order.orderedBy}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
