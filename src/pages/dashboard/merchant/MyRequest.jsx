import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

const MyRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all request list
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/request-list");
        setRequests(res.data.data || []); // data array from backend
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        Swal.fire("Error", "Failed to fetch requests", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(
    (r) =>
      r.productTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.productCategory.toLowerCase().includes(search.toLowerCase()) ||
      (r.requestedByMerchant.name || r.requestedByMerchant)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (r.requestedToMerchant.name || r.requestedToMerchant)
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading requests...</div>;
  }

  return (
    <motion.div
      className="p-6 bg-gray-50 dark:bg-[#0f0f14] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        My Requests
      </h2>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title, category, or merchant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 shadow-sm"
        />
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Requested By</th>
                <th className="px-4 py-3 text-left">Requested To</th>
                <th className="px-4 py-3 text-left">Product Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{req.requestedByMerchant.name || req.requestedByMerchant}</td>
                  <td className="px-4 py-3">{req.requestedToMerchant.name || req.requestedToMerchant}</td>
                  <td className="px-4 py-3">{req.productTitle}</td>
                  <td className="px-4 py-3">{req.productCategory}</td>
                  <td className="px-4 py-3">{new Date(req.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyRequest;
