import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import useRole from "@/hooks/useRole";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  
  // console.log("users: ", users);

  // Fetch all request list
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/request-list`);
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



    const axiosSecure = useAxiosSecure();
    const { profile, loading: roleLoading } = useRole();
    const loginMerchant = profile?._id;
    console.log("loginMerchant: ", loginMerchant);

    const handleApprove = (id) => {
      console.log("ID to approve: ", id); // Log the ID to be approved hereid: ", id);
      Swal.fire("Approved!", "Request approved successfully", "success");
    }

    const handleReject = (id) => {
      console.log("ID to reject: ", id); // Log the ID to be rejected here
      Swal.fire("Rejected!", "Request rejected successfully", "info");
    }
  
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

  const filteredRequests = requests
    .filter((r) => r.requestedToMerchant?._id === loginMerchant) // ✅ only requests sent TO me
  .filter(
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

  console.log("filteredRequests: ", filteredRequests);

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
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-4 py-3">{req.requestedByMerchant.name || req.requestedByMerchant}</td>
                  <td className="px-4 py-3">{/*req.requestedToMerchant.name || req.requestedToMerchant*/} Me</td>
                  <td className="px-4 py-3">{req.productTitle}</td>
                  <td className="px-4 py-3">{req.productCategory}</td>
                  <td className="px-4 py-3">{new Date(req.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 flex">
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md ml-2"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ManageRequest;
