import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import useAxiosPublic from "@/hooks/axiosPublic";
import useRole from "@/hooks/useRole";

const MyOrder = () => {
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { profile } = useRole();
  const [refresh, setRefresh] = useState(0);

  const LoginCustomer = profile?._id;

  const fetchOrders = async () => {
    try {
      const res = await axiosPublic.get("/api/v1/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/api/v1/cancel-orders/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Order has been deleted.", "success");
            setRefresh(refresh + 1);
          })
          .catch(() =>
            Swal.fire("Error", "Failed to delete the order.", "error")
          );
      }
    });
  };

  const filteredOrders = orders
    .filter((order) => order.orderedBy === LoginCustomer)
    .filter(
      (order) =>
        order.product.title.toLowerCase().includes(search.toLowerCase()) ||
        order.product.category.toLowerCase().includes(search.toLowerCase()) ||
        order.status.toLowerCase().includes(search.toLowerCase()) ||
        (order.product.addedByMerchant?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <motion.div
      className="p-6 md:p-10 bg-gray-50 dark:bg-[#0f0f14] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ---------- Header ---------- */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          My Orders
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage and track your recent purchases
        </p>
      </div>

      {/* ---------- Search ---------- */}
      <div className="max-w-2xl mx-auto mb-8 relative">
        <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search by product, category, merchant, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 
          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
          focus:ring-2 focus:ring-pink-500 shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      {/* ---------- Table ---------- */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-lg">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 text-lg">
            No orders found.
          </div>
        ) : (
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow
          justify-start uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Qty</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Merchant</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              {filteredOrders.map((order, idx) => (
                <motion.tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="px-6 py-3 font-medium">{idx + 1}</td>
                  <td className="px-6 py-3 font-semibold">
                    {order.product.title}
                  </td>
                  <td className="px-6 py-3">{order.product.category}</td>
                  <td className="px-6 py-3">{order.quantity}</td>
                  <td className="px-6 py-3 font-semibold">
                    {order.product.retailPrice * order.quantity} BDT
                  </td>
                  <td className="px-6 py-3">
                    {order.product.addedByMerchant?.name}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition shadow-sm"
                      title="Delete order"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default MyOrder;
