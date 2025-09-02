// Updated AllUsers.jsx with modern UI, merged columns, filters, pagination, and improved UX

import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaUserCircle, FaCheck, FaChevronDown, FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import UserModal from "./UserModal"; // Create this modal component


export default function ManageUsers() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view' | 'edit'

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, isError, data: users = [], error, isLoading } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-users");
      return data;
    },
  });
  // Delete user function
  const handleDeleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: `This will permanently delete the user with email: ${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c30027",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${email}`).then(({ data }) => {
          if (data.deletedCount) {
            queryClient.invalidateQueries(["all-user"]);
            Swal.fire("Deleted!", "User has been removed.", "success");
          } else {
            Swal.fire("Error!", "User not found or already deleted.", "error");
          }
        }).catch(() => {
          Swal.fire("Error!", "Failed to delete user.", "error");
        });
      }
    });
  };

  const [selectedRoles, setSelectedRoles] = useState({});
  const [savedRoles, setSavedRoles] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const term = searchTerm.toLowerCase();
        return (
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
        );
      })
      .filter(user =>
        statusFilter === "all" ? true : user.status === statusFilter || (!user.status && statusFilter === "no status")
      )
      .filter(user =>
        roleFilter === "all" ? true : user.role === roleFilter
      );
  }, [users, searchTerm, statusFilter, roleFilter]);

  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleRoleSelect = (email, value) => {
    setSelectedRoles(prev => ({ ...prev, [email]: value }));
    setSavedRoles(prev => ({ ...prev, [email]: false }));
  };

  const handleSaveRole = (email, currentRole) => {
    const role = selectedRoles[email];
    if (!role || role === currentRole) return;
    Swal.fire({
      title: "Are you sure?",
      text: `Change role to '${role}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#c30027",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch("/update-role", { role, email }).then(({ data }) => {
          if (data.modifiedCount) {
            setSavedRoles(prev => ({ ...prev, [email]: true }));
            queryClient.invalidateQueries(["all-user"]);
            Swal.fire("Updated!", "User role updated.", "success");
          }
        });
      }
    });
  };

  const handleStatusChangeDropdown = (email, currentStatus, newStatus) => {
    if (currentStatus === newStatus) return;
    Swal.fire("SMS Triggered", `Would send SMS for status change to '${newStatus}'`, "info");
    axiosSecure.patch("/update-status", { email, status: newStatus }).then(({ data }) => {
      if (data.modifiedCount) {
        queryClient.invalidateQueries(["all-user"]);
        Swal.fire("Updated!", `User is now ${newStatus}.`, "success");
      }
    });
  };

  const handleSearch = e => setSearchTerm(e.target.value);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">
        Manage Users from All Users: {users.length}
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search name/email..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 w-full md:w-64 text-sm"
        />
        <div className="flex gap-2">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded px-2 py-1 text-sm dark:bg-[#2d2b40]">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="no status">No Status</option>
          </select>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="rounded px-2 py-1 text-sm dark:bg-[#2d2b40]">
            <option value="all">All Roles</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>
      </div>

      <table className="w-full text-sm rounded-lg overflow-hidden shadow">
        <thead className="bg-[#FDEDF3] dark:bg-[#393053] text-[#c30027]">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">User</th>
            <th className="p-3">Status</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, i) => {
            const role = selectedRoles[user.email] || user.role;
            const changed = role && role !== user.role;
            const newStatus = selectedStatus[user.email] || user.status;
            return (
              <tr key={user._id} className="border-t border-gray-200 dark:border-gray-600">
                <td className="p-3">{(currentPage - 1) * usersPerPage + i + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} className="w-8 h-8 rounded-full" />
                  ) : (
                    <FaUserCircle className="text-[#c30027] w-8 h-8" />
                  )}
                  <div>
                    <p className="font-semibold">{user.name || "No Name"}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>

                <td className="p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm bg-gray-300"
                      checked={user.status === "active"}
                      onChange={() =>
                        handleStatusChangeDropdown(
                          user.email,
                          user.status,
                          user.status === "active" ? "blocked" : "active"
                        )
                      }
                    />
                    <span
                      className={`text-xs font-medium ${user.status === "active" ? "text-[#c30027]" : "text-gray-500"
                        }`}
                    >
                      {user.status === "active" ? "Active" : "Blocked"}
                    </span>
                  </div>
                </td>

                <td className="p-3 relative">
                  <div className="flex items-center gap-1">
                    <select
                      value={role}
                      onChange={e => handleRoleSelect(user.email, e.target.value)}
                      className="px-2 py-1 text-sm    border border-gray-300 dark:border-gray-600 text-white bg-[#c30027] rounded-full"
                    >
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="volunteer">admin</option>
                    </select>
                    {/* <FaChevronDown className="text-white" /> */}
                    {changed && (
                      <button
                        onClick={() => handleSaveRole(user.email, user.role)}
                        className="ml-1 text-red-500"
                      >
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-3 relative">
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-sm">
                      <FaEllipsisV />
                    </button>
                    {/* Replace Action column buttons */}
                    <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-32">
                      <li><button onClick={() => { setSelectedUser(user); setModalMode("view"); }}>View</button></li>
                      <li><button onClick={() => { setSelectedUser(user); setModalMode("edit"); }}>Edit</button></li>
                      <li><button onClick={() => handleDeleteUser(user.email)}>Delete</button></li>
                    </ul>

                    {selectedUser && (
                      <UserModal
                        user={selectedUser}
                        mode={modalMode}
                        onClose={() => setSelectedUser(null)}
                        onUserUpdated={() => queryClient.invalidateQueries(["all-user"])}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`mx-1 px-3 py-1 rounded-full text-sm ${currentPage === idx + 1 ? "bg-[#c30027] text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

