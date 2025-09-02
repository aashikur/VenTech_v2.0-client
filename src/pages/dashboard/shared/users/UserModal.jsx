import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function UserModal({ user, mode, onClose, onUserUpdated }) {
  const axiosSecure = useAxiosSecure();
  const [editMode, setEditMode] = useState(mode === "edit");
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    bloodGroup: user.bloodGroup || "",
    district: user.district || "",
    upazila: user.upazila || "",
    photoURL: user.photoURL || "",
    status: user.status || "active",
    role: user.role || "donor",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosSecure.patch(`/user/${user.email}`, form);
      Swal.fire("Success!", "User updated successfully.", "success");
      setEditMode(false);
      onUserUpdated && onUserUpdated();
      onClose();
    } catch {
      Swal.fire("Error!", "Failed to update user.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-[#18122B] rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-[#c30027]"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-[#c30027] mb-4">
          {editMode ? "Edit User" : "User Details"}
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="px-4 py-2 rounded-lg border bg-gray-100 dark:bg-[#393053] outline-none"
            placeholder="Email"
          />
          <input
            type="text"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="Blood Group"
          />
          <input
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="District"
          />
          <input
            type="text"
            name="upazila"
            value={form.upazila}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="Upazila"
          />
          <input
            type="text"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="Photo URL"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={!editMode}
            className="px-4 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
          >
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
          {editMode ? (
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="w-full py-2 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:bg-[#a80020] transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          ) : null}
        </form>
        {!editMode && (
          <button
            className="mt-4 w-full py-2 rounded-full bg-[#c30027] text-white font-semibold hover:bg-red-700 transition"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}