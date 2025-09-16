import { Fragment, useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useRole from "@/hooks/useRole";

const PendingMerchants = () => {
  const { user } = useRole();
  const [merchants, setMerchants] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const res = await axiosSecure.get("/api/v1/admin/pending-merchants");
        setMerchants(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMerchants();
  }, [axiosSecure]);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/api/v1/admin/approve-merchant/${id}`);
      Swal.fire("Approved!", res.data.message, "success");
      setMerchants(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Failed", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/api/v1/admin/reject-merchant/${id}`);
      Swal.fire("Rejected!", res.data.message, "info");
      setMerchants(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Failed", "error");
    }
  };

  return (
    <section className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        Pending Merchant Requests
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#18122B]"
      >
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-sm">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Shop</th>
              <th className="px-6 py-4">Requested At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {merchants.length > 0 ? (
              merchants.map((m) => (
                <Fragment key={m._id}>
                  <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="px-6 py-4 font-medium flex items-center justify-between">
                      {m.name}
                      <button
                        onClick={() => setExpanded(expanded === m._id ? null : m._id)}
                        className="ml-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {expanded === m._id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </td>
                    <td className="px-6 py-4">{m.email}</td>
                    <td className="px-6 py-4">{m.shopDetails?.shopName || "-"}</td>
                    <td className="px-6 py-4">
                      {new Date(m.roleRequest.requestedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2">
                      <button
                        onClick={() => handleApprove(m._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-semibold hover:opacity-90 transition shadow"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(m._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-semibold hover:opacity-90 transition shadow"
                      >
                        <FaTimes /> Reject
                      </button>
                    </td>
                  </tr>

                  <AnimatePresence initial={false}>
                    {expanded === m._id && (
                      <motion.tr
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 dark:bg-gray-900 overflow-hidden"
                      >
                        <td colSpan="5" className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Phone:</strong> {m.phone || "-"}</div>
                            <div><strong>District:</strong> {m.district || "-"}</div>
                            <div><strong>Upazila:</strong> {m.upazila || "-"}</div>
                            <div><strong>Shop Name:</strong> {m.shopDetails?.shopName || "-"}</div>
                            <div><strong>Shop Number:</strong> {m.shopDetails?.shopNumber || "-"}</div>
                            <div><strong>Shop Address:</strong> {m.shopDetails?.shopAddress || "-"}</div>
                            <div><strong>Trade License:</strong> {m.shopDetails?.tradeLicense || "-"}</div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  No pending requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
};

export default PendingMerchants;
