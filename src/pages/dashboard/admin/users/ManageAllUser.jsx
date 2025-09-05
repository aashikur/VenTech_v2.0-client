import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import { useEffect, useState, useMemo } from "react";
import { FaSearch, FaUserShield, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ManageAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const axiosSecure = useAxiosSecure();
  const { loading: roleLoading } = useRole();

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

  // 🔹 Delete user
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/v1/admin/users/${id}`);
        setUsers((prev) => prev.filter((u) => u._id !== id));
        Swal.fire("Deleted!", "User has been removed.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  // 🔹 Change Role (hidden)
  const handleSetRole = async (id, currentRole) => {
    const { value: role } = await Swal.fire({
      title: "Change User Role",
      input: "select",
      inputOptions: {
        customer: "Customer",
        merchant: "Merchant",
        admin: "Admin",
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: "Update",
      inputValidator: (value) => {
        if (!value) return "Please select a role!";
      },
    });

    if (role) {
      try {
        await axiosSecure.patch(`/api/v1/admin/users/${id}/role`, { role });
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
        Swal.fire("Updated!", `User role set to ${role}.`, "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to update role.", "error");
      }
    }
  };

  // 🔹 Apply search + filter
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" ? true : user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // 🔹 Role Counts
  const roleCounts = useMemo(() => {
    return {
      customer: users.filter((u) => u.role === "customer").length,
      merchant: users.filter((u) => u.role === "merchant").length,
      admin: users.filter((u) => u.role === "admin").length,
      all: users.length,
    };
  }, [users]);

  return (
    <section className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage All Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Total:{" "}
            <span className="font-semibold">
              {roleFilter === "all"
                ? roleCounts.all
                : roleCounts[roleFilter]}{" "}
              {roleFilter === "all" ? "Users" : roleFilter + "s"}
            </span>
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="w-full sm:w-80">
            <div className="flex items-center bg-white dark:bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <FaSearch className="ml-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 text-sm"
              />
            </div>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm shadow"
          >
            <option value="all">All Users ({roleCounts.all})</option>
            <option value="customer">
              Customers ({roleCounts.customer})
            </option>
            <option value="merchant">
              Merchants ({roleCounts.merchant})
            </option>
          </select>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#18122B]"
      >
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-sm">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, idx) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* Index */}
                  <td className="px-6 py-4">
                    {(currentPage - 1) * usersPerPage + idx + 1}
                  </td>

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
                    {/* Hidden Set Role button */}
                    <button
                      onClick={() => handleSetRole(user._id, user.role)}
                      className="flex hidden items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs font-semibold shadow hover:opacity-90 transition"
                    >
                      <FaUserShield /> Set Role
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-500 text-red-500 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default ManageAllUsers;
