import { useContext, useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaUpload, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

import useRole from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";

const ProfileDashboard = () => {


  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const districts = null;
  const getUpazilasByDistrict = null;
  const { role, status, isVenTech, userData } = useRole();

  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    district: "",
    upazila: "",
    // Merchant specific fields
    shopName: "",
    shopNumber: "",
    shopAddress: "",
    tradeLicense: "",
  });

  useEffect(() => {
    if (user?.email && !edit) {
      axiosSecure.get(`/get-user-by-email?email=${user.email}`).then(res => {
        setProfile(res.data);
        setForm({
          name: res.data?.name || user.displayName || "",
          email: res.data?.email || user.email || "",
          avatar: res.data?.photoURL || user.photoURL || "",
          phone: res.data?.phone || "",
          district: res.data?.district || "",
          upazila: res.data?.upazila || "",
          // Merchant fields
          shopName: res.data?.shopDetails?.shopName || "",
          shopNumber: res.data?.shopDetails?.shopNumber || "",
          shopAddress: res.data?.shopDetails?.shopAddress || "",
          tradeLicense: res.data?.shopDetails?.tradeLicense || "",
        });
      });
    }
  }, [user, axiosSecure, edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "district" ? { upazila: "" } : {}),
    }));
  };

  const handleFileChange = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;
    const apiKey = "dff59569a81c30696775e74f040e20bb";
    const formData = new FormData();
    formData.append("image", imageFile);

    setLoading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, avatar: data.data.url }));
        Swal.fire("Uploaded!", "Image uploaded successfully.", "success");
      } else {
        Swal.fire("Error", "Image upload failed!", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Image upload failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setEdit(true);

  const handleCancel = () => {
    setForm({
      name: profile?.name || user.displayName || "",
      email: profile?.email || user.email || "",
      avatar: profile?.photoURL || user.photoURL || "",
      phone: profile?.phone || "",
      district: profile?.district || "",
      upazila: profile?.upazila || "",
      shopName: profile?.shopDetails?.shopName || "",
      shopNumber: profile?.shopDetails?.shopNumber || "",
      shopAddress: profile?.shopDetails?.shopAddress || "",
      tradeLicense: profile?.shopDetails?.tradeLicense || "",
    });
    setEdit(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser({
        displayName: form.name,
        photoURL: form.avatar,
      });

      const updateData = {
        name: form.name,
        photoURL: form.avatar,
        phone: form.phone,
        district: form.district,
        upazila: form.upazila,
      };

      // Add shop details for merchants
      if (isVenTech && role === "merchant") {
        updateData.shopDetails = {
          shopName: form.shopName,
          shopNumber: form.shopNumber,
          shopAddress: form.shopAddress,
          tradeLicense: form.tradeLicense,
        };
      }

      await axiosSecure.patch("/update-user", updateData);
      setEdit(false);
      
      const res = await axiosSecure.get(`/get-user-by-email?email=${user.email}`);
      setProfile(res.data);
      setForm({
        name: res.data?.name || user.displayName || "",
        email: res.data?.email || user.email || "",
        avatar: res.data?.photoURL || user.photoURL || "",
        phone: res.data?.phone || "",
        district: res.data?.district || "",
        upazila: res.data?.upazila || "",
        shopName: res.data?.shopDetails?.shopName || "",
        shopNumber: res.data?.shopDetails?.shopNumber || "",
        shopAddress: res.data?.shopDetails?.shopAddress || "",
        tradeLicense: res.data?.shopDetails?.tradeLicense || "",
      });
      
      Swal.fire("Success!", "Profile updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to update profile.", "error");
    }
    setLoading(false);
  };

  const upazilaOptions = getUpazilasByDistrict(form.district);

  // Get display role
  const getDisplayRole = () => {
    if (isVenTech) {
      return role === "customer" ? "Customer" : role === "merchant" ? "Merchant" : "Admin";
    }
    return role === "donor" ? "Customer" : role === "volunteer" ? "Marchent" : "Admin";
  };

  // Get status color
  const getStatusColor = () => {
    if (status === "active") return "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700";
    if (status === "pending") return "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700";
    if (status === "blocked") return "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700";
    return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700";
  };

  if (!profile) return <Loading></Loading>;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow-xl p-6 mt-8">
      <div className="flex flex-col items-center gap-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={form?.avatar || "/logo/logo-V.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-pink-500 to-yellow-500 object-cover shadow-lg"
          />
          {isVenTech && (
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              VenTech
            </div>
          )}
        </div>

        <div className="w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                {isVenTech ? (role === "merchant" ? "Shop Profile" : "My Profile") : "My Profile"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isVenTech ? "Manage your VenTech marketplace profile" : "Manage your profile information"}
              </p>
            </div>
            
            {!edit ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold hover:opacity-90 transition shadow-lg"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-lg disabled:opacity-50"
                >
                  <FaSave /> {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition shadow-lg"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-4 py-2 text-sm rounded-full border bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold">
              <FaStore className="mr-2" />
              {getDisplayRole()}
            </span>
            <span className={`inline-flex items-center px-4 py-2 text-sm rounded-full border font-semibold ${getStatusColor()}`}>
              Status: {status || "Active"}
            </span>
            {isVenTech && role === "merchant" && status === "pending" && (
              <span className="inline-flex items-center px-4 py-2 text-sm rounded-full border border-orange-300 bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-400 font-semibold">
                ⏳ Waiting for Admin Approval
              </span>
            )}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                👤 Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!edit}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      edit 
                        ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                        : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    } outline-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!edit}
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      edit 
                        ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                        : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    } outline-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Profile Photo</label>
                  <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-lg font-semibold transition ${
                    edit 
                      ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                    <FaUpload /> Choose New Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={!edit}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Location & Business Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FaMapMarkerAlt /> Location & {isVenTech && role === "merchant" ? "Business" : "Additional"} Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">District</label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    disabled={!edit}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      edit 
                        ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                        : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    } outline-none`}
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Upazila</label>
                  <select
                    name="upazila"
                    value={form.upazila}
                    onChange={handleChange}
                    disabled={!edit}
                    className={`w-full px-4 py-3 rounded-lg border transition ${
                      edit 
                        ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                        : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    } outline-none`}
                  >
                    <option value="">Select Upazila</option>
                    {upazilaOptions.map((u) => (
                      <option key={u.id} value={u.name}>{u.name}</option>
                    ))}
                  </select>
                </div>

                {/* Merchant-specific fields */}
                {isVenTech && role === "merchant" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Shop Name</label>
                      <input
                        type="text"
                        name="shopName"
                        value={form.shopName}
                        onChange={handleChange}
                        disabled={!edit}
                        placeholder="Enter your shop name"
                        className={`w-full px-4 py-3 rounded-lg border transition ${
                          edit 
                            ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        } outline-none`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Shop Number</label>
                      <input
                        type="text"
                        name="shopNumber"
                        value={form.shopNumber}
                        onChange={handleChange}
                        disabled={!edit}
                        placeholder="Unique shop identifier"
                        className={`w-full px-4 py-3 rounded-lg border transition ${
                          edit 
                            ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        } outline-none`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Shop Address</label>
                      <textarea
                        name="shopAddress"
                        value={form.shopAddress}
                        onChange={handleChange}
                        disabled={!edit}
                        placeholder="Enter your shop address"
                        rows="3"
                        className={`w-full px-4 py-3 rounded-lg border transition ${
                          edit 
                            ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        } outline-none resize-none`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Trade License (Optional)</label>
                      <input
                        type="text"
                        name="tradeLicense"
                        value={form.tradeLicense}
                        onChange={handleChange}
                        disabled={!edit}
                        placeholder="Trade license number"
                        className={`w-full px-4 py-3 rounded-lg border transition ${
                          edit 
                            ? "bg-pink-50 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700 focus:ring-2 focus:ring-pink-500" 
                            : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        } outline-none`}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;