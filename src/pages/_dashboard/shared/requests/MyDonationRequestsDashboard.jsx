import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loading from "@/pages/_fronted/home/Loading";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  inprogress: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};

export default function MyDonationRequestsDashboard() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Pagination & Filter
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const pageSize = 8;

  // Fetch all requests for this user
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      return data;
    },
  });

  // Filter by status
  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.donationStatus === statusFilter);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const paginatedRequests = filteredRequests.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Delete request
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c30027",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-request/${id}`).then(() => {
          Swal.fire("Deleted!", "Request deleted.", "success");
          queryClient.invalidateQueries(["my-donation-requests", user.email]);
        });
      }
    });
  };

  // Status change (inprogress -> done/canceled)
  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark this request as "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c30027",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/donation-request/${id}`, { donationStatus: newStatus })
          .then(() => {
            Swal.fire("Success!", "Status updated.", "success");
            queryClient.invalidateQueries(["my-donation-requests", user.email]);
          });
      }
    });
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="p-4 max-w-6xl mx-auto ">
  <h3 className="text-lg font-semibold mb-4 text-[#c30027] text-center">
    My Donation Requests ({requests.length})
  </h3>

      {/* Filter */}
      <div className="mb-4 flex flex-wrap gap-2 items-center justify-center">
        <span className="font-semibold">Filter by status:</span>
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded-full ${
              statusFilter === status
                ? "bg-[#c30027] text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
        
      </div>
      {/* Grid Layout */}
<div className="bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10 p-4 overflow-x-auto">

  {paginatedRequests.length > 0 ? (
    <table className="min-w-full">
      <thead>
        <tr className="bg-[#FDEDF3] dark:bg-[#393053] text-[#c30027]">
          <th className="p-3 text-left">Recipient</th>
          <th className="p-3 text-left">Location</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Time</th>
          <th className="p-3 text-left">Blood Group</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedRequests.map((req) => (
          <tr key={req._id} className="border-t">
            <td className="p-3 font-semibold text-[#c30027]">{req.recipientName}</td>
            <td className="p-3">{req.recipientDistrict}, {req.recipientUpazila}</td>
            <td className="p-3">{req.donationDate}</td>
            <td className="p-3">{req.donationTime}</td>
            <td className="p-3 font-bold">{req.bloodGroup}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  statusColors[req.donationStatus] || "bg-gray-200"
                }`}
              >
                {req.donationStatus}
              </span>
            </td>
            <td className="p-3 flex flex-wrap gap-2">
              <button
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition text-xs"
                onClick={() => navigate(`/dashboard/donation-request-details-edit/${req._id}`)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition text-xs"
                onClick={() => handleDelete(req._id)}
              >
                Delete
              </button>
              <button
                className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition text-xs"
                onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
              >
                View
              </button>

              {req.donationStatus === "inprogress" && (
                <>
                  <button
                    className="px-3 py-1 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition text-xs"
                    onClick={() => handleStatusChange(req._id, "done")}
                  >
                    Mark as Done
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition text-xs"
                    onClick={() => handleStatusChange(req._id, "canceled")}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition text-xs"
                    onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                  >
                    Donor Info
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-gray-500 mt-8 text-center">
      No donation requests found.
    </div>
  )}

  {/* Pagination */}
  {totalPages > 1 && (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          className={`px-3 py-1 rounded-full font-semibold ${
            page === idx + 1 ? "bg-[#c30027] text-white" : "bg-gray-200"
          }`}
          onClick={() => setPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  )}
</div>

      {/* Pagination */}
      {/* <div className="flex justify-center mt-6 gap-2 ">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded-full font-semibold ${
              page === idx + 1 ? "bg-[#c30027] text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
}