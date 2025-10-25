import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";
import MerchantRequestForm from "@/components/profile/MerchantRequestForm";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaStore } from "react-icons/fa";

const ProfileDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { role, status, profile, setProfile, loading: roleLoading } = useRole();
  const [edit, setEdit] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    district: "",
    upazila: "",
    shopName: "",
    shopNumber: "",
    shopAddress: "",
    tradeLicense: "",
  });

  useEffect(() => {
    if (profile && !edit) {
      setForm({
        name: profile.name || user.displayName || "",
        email: profile.email || user.email || "",
        avatar: profile.photoURL || user.photoURL || "",
        phone: profile.phone || "",
        district: profile.district || "",
        upazila: profile.upazila || "",
        shopName: profile.shopDetails?.shopName || "",
        shopNumber: profile.shopDetails?.shopNumber || "",
        shopAddress: profile.shopDetails?.shopAddress || "",
        tradeLicense: profile.shopDetails?.tradeLicense || "",
      });
    }
  }, [profile, user, edit]);

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  if (roleLoading) return <Loading />;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <img
            src={form.avatar || "/logo/logo-V.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-pink-500 object-cover shadow-lg"
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {form.name || "Unnamed User"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Role:{" "}
              <span className="capitalize text-pink-500 font-semibold">
                {role}
              </span>
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Status:{" "}
              <span
                className={`${
                  status === "active"
                    ? "text-green-500"
                    : status === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                } font-semibold`}
              >
                {status}
              </span>
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:justify-center gap-3 text-center text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-pink-500" /> {form.email}
            </div>
            {form.phone && (
              <div className="flex items-center gap-2">
                <FaPhone className="text-pink-500" /> {form.phone}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 mb-6">
          {!edit && role === "customer" && (
            <button
              onClick={() => setIsRequestOpen(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-medium shadow hover:opacity-90 transition"
              disabled={profile?.roleRequest?.status === "pending"}
            >
              {profile?.roleRequest?.status === "pending"
                ? "Request Pending"
                : "Request to Become Merchant"}
            </button>
          )}
          {!edit ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-medium shadow hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // TODO: save changes with axiosSecure.patch if needed
                  Swal.fire({
                    icon: "success",
                    title: "Profile Updated Successfully",
                  });
                  setEdit(false);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white font-medium shadow hover:opacity-90 transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-medium shadow hover:opacity-90 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Edit Form */}
        {edit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                disabled
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400 cursor-not-allowed rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-lg p-2"
              />
            </div>
          </motion.div>
        )}

        {/* Merchant Request Form */}
        {isRequestOpen && (
          <MerchantRequestForm
            form={form}
            setForm={setForm}
            setIsRequestOpen={setIsRequestOpen}
            setProfile={setProfile}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProfileDashboard;
