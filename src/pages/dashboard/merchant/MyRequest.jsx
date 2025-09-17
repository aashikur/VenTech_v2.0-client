import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import useRole from "@/hooks/useRole";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FcCancel } from "react-icons/fc";

const MyRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const axiosSecure = useAxiosSecure();
  const { profile, loading: roleLoading } = useRole();
  const loginMerchant = profile?._id;

  // Fetch all request list
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/request-list`);
        setRequests(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        Swal.fire("Error", "Failed to fetch requests", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Fetch all users
  useEffect(() => {
    if (roleLoading) return;
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/api/v1/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [roleLoading]);

  const handleCancelRequest = (requestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Canceled requestId: ", requestId);
        Swal.fire("Canceled!", "Request has been canceled.", "success");
      }
    });
  };

  const filteredRequests = requests
    .filter((r) => r.requestedByMerchant?._id === loginMerchant)
    .filter(
      (r) =>
        r.productTitle.toLowerCase().includes(search.toLowerCase()) ||
        r.productCategory.toLowerCase().includes(search.toLowerCase()) ||
        (r.requestedByMerchant.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (r.requestedToMerchant.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading requests...
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-50 dark:bg-[#0f0f14] min-h-screen transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        My Requests
      </h2>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title, category, or merchant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 shadow-sm transition"
        />
      </div>

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No requests found.
        </div>
      ) : (
        <div className="overflow-x-auto max-w-5xl mx-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Requested By</th>
                <th className="px-4 py-3 text-left">Requested To</th>
                <th className="px-4 py-3 text-left">Product Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {filteredRequests.map((req) => (
                  <motion.tr
                    key={req._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">Me</td>
                    <td className="px-4 py-3">{req.requestedToMerchant.name || "N/A"}</td>
                    <td className="px-4 py-3">{req.productTitle}</td>
                    <td className="px-4 py-3">{req.productCategory}</td>
                    <td className="px-4 py-3">
                      {new Date(req.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <span
                        className={`hidden px-2 py-1 text-xs rounded-full font-semibold ${
                          req.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                            : req.status === "approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400"
                        }`}
                      >
                        {req.status || "N/A"}
                      </span>
                      <button
                        onClick={() => handleCancelRequest(req._id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                      >
                        <FcCancel /> Cancel
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyRequest;
