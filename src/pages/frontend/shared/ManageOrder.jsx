import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/axiosPublic";
import useRole from "@/hooks/useRole";

const ManageOrder = () => {
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { profile } = useRole();

  const LoginCustomer = profile?._id;
  console.log("LoginCustomer: ", LoginCustomer);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get("/api/v1/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 const handleCancelOrder = (id) => {
  Swal.fire({
    title: "Are you sure you want to cancel this order?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, cancel it!",
    cancelButtonText: "No, keep it",
    background: "#18122B",
    color: "#fff",
  }) 
  console.log("Canceled orderId: ", id);
 }


 const handleSentorder = (id) => {
  Swal.fire({
    title: "Are you sure you want to sent this order?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, sent it!",
    cancelButtonText: "No, keep it",
    background: "#18122B",
    color: "#fff",
  })
  console.log("Sent orderId: ", id);
 }

  // ✅ Filter orders: only those placed by the logged-in customer
  const filteredOrders = orders
    .filter((order) => order.addedByMerchant === LoginCustomer)
    .filter(
      (order) =>
        order.product.title.toLowerCase().includes(search.toLowerCase()) ||
        order.product.category.toLowerCase().includes(search.toLowerCase()) ||
        order.status.toLowerCase().includes(search.toLowerCase()) ||
        (order.product.addedByMerchant.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  console.log("filteredOrders: ", filteredOrders);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading orders...</div>;
  }

  return (
<motion.div
  className="p-6 bg-gray-50 dark:bg-[#0f0f14] min-h-screen transition-colors"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
    My Orders
  </h2>

  {/* Search */}
  <div className="max-w-2xl mx-auto mb-6">
    <input
      type="text"
      placeholder="Search by product, category, merchant, or status..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-5 py-3 rounded-3xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-pink-500 transition-all"
    />
  </div>

  {/* Table */}
  <div className="overflow-x-auto max-w-6xl mx-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
    {filteredOrders.length === 0 ? (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No orders found.
      </div>
    ) : (
      <table className="min-w-full text-sm text-gray-700 dark:text-gray-200 rounded-2xl overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-6 py-3 text-left font-medium">#</th>
            <th className="px-6 py-3 text-left font-medium">Product</th>
            <th className="px-6 py-3 text-left font-medium">Category</th>
            <th className="px-6 py-3 text-left font-medium">Quantity</th>
            <th className="px-6 py-3 text-left font-medium">Price</th>
            <th className="px-6 py-3 text-left font-medium">Status</th>
            <th className="px-6 py-3 text-left font-medium">Date</th>
            <th className="px-6 py-3 text-left font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredOrders.map((order, idx) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <td className="px-6 py-3 font-medium">{idx + 1}</td>
              <td className="px-6 py-3 font-semibold">{order.product.title}</td>
              <td className="px-6 py-3">{order.product.category}</td>
              <td className="px-6 py-3">{order.quantity}</td>
              <td className="px-6 py-3">{order.product.retailPrice * order.quantity} BDT</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                      : order.status === "sent"
                      ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-3">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="px-6 py-3 flex gap-2">
                <button
                  onClick={() => handleSentOrder(order._id)}
                  className="px-4 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Sent
                </button>
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</motion.div>

  );
};

export default ManageOrder;
