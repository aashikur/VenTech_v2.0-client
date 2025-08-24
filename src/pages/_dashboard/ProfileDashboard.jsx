import { useContext, useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes, FaUpload } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";
import useRole from "@/hooks/useRole";
import Loading from "@/pages/_fronted/home/Loading";

const ProfileDashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();
  const { role, status } = useRole();

  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  useEffect(() => {
    if (user?.email && !edit) {
      axiosSecure.get(`/get-user-by-email?email=${user.email}`).then(res => {
        setProfile(res.data);
        setForm({
          name: res.data?.name || user.displayName || "",
          email: res.data?.email || user.email || "",
          avatar: res.data?.photoURL || user.photoURL || "",
          bloodGroup: res.data?.bloodGroup || "",
          district: res.data?.district || "",
          upazila: res.data?.upazila || "",
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
      bloodGroup: profile?.bloodGroup || "",
      district: profile?.district || "",
      upazila: profile?.upazila || "",
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
      await axiosSecure.patch("/update-user", {
        name: form.name,
        photoURL: form.avatar,
        bloodGroup: form.bloodGroup,
        district: form.district,
        upazila: form.upazila,
      });
      setEdit(false);
      const res = await axiosSecure.get(`/get-user-by-email?email=${user.email}`);
      setProfile(res.data);
      setForm({
        name: res.data?.name || user.displayName || "",
        email: res.data?.email || user.email || "",
        avatar: res.data?.photoURL || user.photoURL || "",
        bloodGroup: res.data?.bloodGroup || "",
        district: res.data?.district || "",
        upazila: res.data?.upazila || "",
      });
      Swal.fire("Success!", "Profile updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to update profile.", "error");
    }
    setLoading(false);
  };

  const upazilaOptions = getUpazilasByDistrict(form.district);

  if (!profile) return <Loading></Loading>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow p-4 mt-8">
      <div className="flex flex-col items-center gap-6">
        <img
          src={form?.avatar || "/logo/icon-2.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-[#c30027] object-cover"
        />

        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-2xl font-bold text-[#c30027]">My Profile</h2>
            {!edit ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#c30027] text-white font-semibold hover:bg-red-700 transition"
              >
                <FaEdit /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  <FaSave /> {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white">
              Role: <strong>{role || "User"}</strong>
            </span>
            <span className="inline-block ml-3 px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white">
              Status: <strong>{status || "Active"}</strong>
            </span>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full px-3 py-2 rounded-lg ${edit ? "bg-[#FDEDF3] dark:bg-[#393053]" : "bg-gray-100 dark:bg-[#393053]"} outline-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#393053] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Upload Photo</label>
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md bg-[#c30027] text-white hover:bg-red-700">
                <FaUpload /> Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!edit}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full px-3 py-2 rounded-lg ${edit ? "bg-[#FDEDF3] dark:bg-[#393053]" : "bg-gray-100 dark:bg-[#393053]"} outline-none`}
              >
                <option value="">Select</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">District</label>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full px-3 py-2 rounded-lg ${edit ? "bg-[#FDEDF3] dark:bg-[#393053]" : "bg-gray-100 dark:bg-[#393053]"} outline-none`}
              >
                <option value="">Select</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Upazila</label>
              <select
                name="upazila"
                value={form.upazila}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full px-3 py-2 rounded-lg ${edit ? "bg-[#FDEDF3] dark:bg-[#393053]" : "bg-gray-100 dark:bg-[#393053]"} outline-none`}
              >
                <option value="">Select</option>
                {upazilaOptions.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
