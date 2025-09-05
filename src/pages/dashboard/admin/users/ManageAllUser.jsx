import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaUserShield, FaTrashAlt } from "react-icons/fa";

const ManageAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
const memoizedAxios = useMemo(() => axiosSecure, [axiosSecure]);

const { role, loading: roleLoading } = useRole();

useEffect(() => {
  if (roleLoading) return; // wait until role is fetched
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/api/v1/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchUsers();
}, [roleLoading]); // dependency only on roleLoading


  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Users
        </h1>

        {/* Search */}
        <div className="w-full sm:w-80">
          <div className="flex items-center bg-white dark:bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <FaSearch className="ml-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* Avatar + Name */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={user.photoURL || "/avatar.png"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <span className="font-medium">{user.name}</span>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">{user.email}</td>

                  {/* Role */}
                  <td className="px-6 py-4 capitalize">{user.role}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                          : user.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs font-semibold shadow hover:opacity-90 transition">
                      <FaUserShield /> Set Role
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-500 text-red-500 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageAllUsers;
