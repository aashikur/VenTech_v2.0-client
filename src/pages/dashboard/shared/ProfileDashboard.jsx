import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";
import MerchantRequestForm from "@/components/profile/MerchantRequestForm";

const ProfileDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { role, status, profile, setProfile, loading: roleLoading } = useRole();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Sync form with profile
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
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow-xl p-6 mt-8">
      <div className="flex flex-col items-center gap-6">
        <img
          src={form.avatar || "/logo/logo-V.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-pink-500 to-yellow-500 object-cover shadow-lg"
        />

        <div className="w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              {role === "merchant" ? "Shop Profile" : "My Profile"}
            </h2>

            {!edit && role === "customer" && (
              <button
                onClick={() => setIsRequestOpen(true)}
                className="btn btn-warning"
                disabled={profile?.roleRequest?.status === "pending"}
              >
                {profile?.roleRequest?.status === "pending"
                  ? "Request Pending"
                  : "Request to Become Merchant"}
              </button>
            )}

            {!edit && (
              <button onClick={handleEdit} className="btn btn-primary ml-2">
                Edit Profile
              </button>
            )}
          </div>

          {/* Role & Status */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="badge badge-info">{role}</span>
            <span
              className={`badge ${
                status === "active"
                  ? "badge-success"
                  : status === "pending"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              Status: {status}
            </span>
          </div>

          {/* General Profile Form */}
          {edit && (
            <div className="space-y-4">
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="input input-bordered w-full"
              />
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>
          )}

          {/* Merchant Request Form Inline */}
          {isRequestOpen && (
            <MerchantRequestForm
              form={form}
              setForm={setForm}
              setIsRequestOpen={setIsRequestOpen}
              setProfile={setProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
