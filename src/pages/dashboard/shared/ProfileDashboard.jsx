import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";

const ProfileDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { role, status, profile, setProfile, loading: roleLoading } = useRole();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Sync form with profile data
  useEffect(() => {
    if (profile && !edit) {
      setForm({
        name: profile.name || user.displayName || "",
        email: profile.email || user.email || "",
        avatar: profile.photoURL || user.photoURL || "",
        phone: profile.phone || "",
        photoURL: profile.photoURL || user.photoURL || "",
        district: profile.district || "",
        upazila: profile.upazila || "",
        shopName: profile.shopDetails?.shopName || "",
        shopNumber: profile.shopDetails?.shopNumber || "",
        shopAddress: profile.shopDetails?.shopAddress || "",
        tradeLicense: profile.shopDetails?.tradeLicense || "",
      });
    }
  }, [profile, user, edit]);

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
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, avatar: data.data.url }));
        Swal.fire("Uploaded!", "Image uploaded successfully.", "success");
      } else Swal.fire("Error", "Image upload failed!", "error");
    } catch {
      Swal.fire("Error", "Image upload failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setEdit(true);

  const handleCancel = () => {
    setEdit(false);
    if (profile) {
      setForm({
        name: profile.name || user.displayName || "",
        email: profile.email || user.email || "",
        avatar: profile.photoURL || user.photoURL || "",
        phone: profile.phone || "",
        photoURL: profile.photoURL || user.photoURL || "",

        district: profile.district || "",
        upazila: profile.upazila || "",
        shopName: profile.shopDetails?.shopName || "",
        shopNumber: profile.shopDetails?.shopNumber || "",
        shopAddress: profile.shopDetails?.shopAddress || "",
        tradeLicense: profile.shopDetails?.tradeLicense || "",
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser({ displayName: form.name, photoURL: form.avatar });

      const updateData = {
        name: form.name,
        avatar: form.avatar, // ✅ match DB schema
        phone: form.phone,
        photoURL: form.photoURL,

        district: form.district,
        upazila: form.upazila,
        ...(role === "merchant"
          ? {
            shopDetails: {
              shopName: form.shopName,
              shopNumber: form.shopNumber,
              shopAddress: form.shopAddress,
              tradeLicense: form.tradeLicense,
            },
          }
          : {}),
      };

      await axiosSecure.patch("/api/v1/auth/update-profile", updateData);

      const refreshed = await axiosSecure.get("/api/v1/auth/me");
      Swal.fire("Success!", "Profile updated successfully.", "success");
      setEdit(false);

      // sync form with updated user
      const refreshedUser = refreshed.data.user;
      setForm({
        name: refreshedUser.name || "",
        email: refreshedUser.email || "",
        avatar: refreshedUser.photoURL || "",
        phone: refreshedUser.phone || "",
        district: refreshedUser.district || "",
        photoURL: refreshedUser.photoURL || "",
        upazila: refreshedUser.upazila || "",
        shopName: refreshedUser.shopDetails?.shopName || "",
        shopNumber: refreshedUser.shopDetails?.shopNumber || "",
        shopAddress: refreshedUser.shopDetails?.shopAddress || "",
        tradeLicense: refreshedUser.shopDetails?.tradeLicense || "",
      });
    } catch {
      Swal.fire("Error!", "Failed to update profile.", "error");
    }
    setLoading(false);
  };

  const handleRequestMerchant = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.post("/api/v1/auth/request-merchant");
      Swal.fire("Success!", "Request sent to admin for approval.", "success");

      // Update local profile state in real-time
      setProfile(prev => ({
        ...prev,
        roleRequest: "merchant",
        status: "pending",
      }));
    } catch (err) {
      console.error("Request merchant error:", err.response?.data || err.message);
      Swal.fire("Error!", err.response?.data?.message || "Failed to send request.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (roleLoading) return <Loading />;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow-xl p-6 mt-8">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={form.avatar || "/logo/logo-V.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-pink-500 to-yellow-500 object-cover shadow-lg"
          />
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {role === "merchant" ? "Shop Profile" : "My Profile"}
            </h2>
            {!edit ? (
              <button onClick={handleEdit} className="btn btn-primary">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn btn-success"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="badge badge-info">{role}</span>
            <span
              className={`badge ${status === "active"
                  ? "badge-success"
                  : status === "pending"
                    ? "badge-warning"
                    : "badge-error"
                }`}
            >
              Status: {status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="space-y-4">
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!edit}
                className="input input-bordered w-full"
              />
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                disabled
                className="input input-bordered w-full"
              />
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!edit}
                className="input input-bordered w-full"
              />
              <label>Profile Photo</label>
              <input type="file" onChange={handleFileChange} disabled={!edit} />
            </div>

            {/* Merchant Info */}
            {role === "merchant" && (
              <div className="space-y-4">
                <label>Shop Name</label>
                <input
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  disabled={!edit}
                  className="input input-bordered w-full"
                />
                <label>Shop Number</label>
                <input
                  name="shopNumber"
                  value={form.shopNumber}
                  onChange={handleChange}
                  disabled={!edit}
                  className="input input-bordered w-full"
                />
                <label>Shop Address</label>
                <textarea
                  name="shopAddress"
                  value={form.shopAddress}
                  onChange={handleChange}
                  disabled={!edit}
                  className="textarea textarea-bordered w-full"
                ></textarea>
                <label>Trade License</label>
                <input
                  name="tradeLicense"
                  value={form.tradeLicense}
                  onChange={handleChange}
                  disabled={!edit}
                  className="input input-bordered w-full"
                />
              </div>
            )}
          </div>

          {/* Request Merchant */}
          {!edit && role === "customer" && (
            <button
              onClick={handleRequestMerchant}
              className="btn btn-warning mt-4"
              disabled={profile?.status === "pending"}
            >
              {profile?.status === "pending" ? "Request Pending" : "Request to Become Merchant"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
