import useAxiosPublic from '@/hooks/axiosPublic';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import Loading from '@/pages/_fronted/home/Loading';


const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATUSES = ['All', 'pending', 'approved', 'rejected'];
const ITEMS_PER_PAGE = 10;

const ActionMenu = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="19" cy="12" r="2" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-lg z-10">
          <button onClick={onView} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">View</button>
          <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
          <button onClick={onDelete} className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">Delete</button>
        </div>
      )}
    </div>
  );
};

const ManageDonationsAdmin = () => {
  const axiosPublic = useAxiosPublic();
  const [donations, setDonations] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [bloodFilter, setBloodFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get('public-donation-requests');
      setDonations(res.data);
      setLoading(false);
      return res.data;
    },
  });

  const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Delete this donation request?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#c30027",
    cancelButtonColor: "#aaa",
    confirmButtonText: "Yes, delete!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosPublic.delete(`/donation-request/${id}`).then(() => {
        Swal.fire("Deleted!", "Donation request deleted.", "success");
        // Optionally refetch data (if using React Query)
        // queryClient.invalidateQueries(["donationRequests"]);
        // Or, remove from state if using useState
        setDonations((prev) => prev.filter((d) => d._id !== id));
      });
    }
  });
};

  const filtered = donations.filter(donation => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      donation.requesterName.toLowerCase().includes(searchText) ||
      donation.bloodGroup.toLowerCase().includes(searchText) ||
      donation.requesterEmail.toLowerCase().includes(searchText) ||
      donation.recipientDistrict.toLowerCase().includes(searchText) ||
      donation.recipientUpazila.toLowerCase().includes(searchText);

    const matchesBlood = bloodFilter === 'All' || donation.bloodGroup === bloodFilter;
    const matchesStatus = statusFilter === 'All' || donation.donationStatus === statusFilter;

    return matchesSearch && matchesBlood && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  React.useEffect(() => {
    setPage(1);
  }, [search, bloodFilter, statusFilter]);

  if (loading) return <Loading></Loading>
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Manage Donations from All Requests ({donations.length})
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="Search name, blood group, email, area..."
          className="w-full md:w-1/3 px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            value={bloodFilter}
            onChange={e => setBloodFilter(e.target.value)}
          >
            {BLOOD_GROUPS.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          <select
            className="px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <th className="px-4 py-3 text-left">Requester</th>
              <th className="px-4 py-3 text-left">Recipient</th>
              <th className="px-4 py-3 text-left">Blood Group</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Hospital</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">No donations found.</td>
              </tr>
            ) : paginated.map(donation => (
              <tr key={donation._id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-3">{donation.requesterName}</td>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{donation.recipientName}</div>
                    <div className="text-xs text-gray-500">{donation.recipientDistrict}, {donation.recipientUpazila}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{donation.bloodGroup}</td>
                <td className="px-4 py-3">{donation.donationDate}</td>
                <td className="px-4 py-3">{donation.donationTime}</td>
                <td className="px-4 py-3">{donation.hospitalName}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${donation.donationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      donation.donationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}>
                    {donation.donationStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ActionMenu
                    onView={() =>Swal.fire("Coming soon")}
                    onEdit={() => Swal.fire("Coming soon")}
                    onDelete={() => handleDelete(donation._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600 dark:text-gray-400">
        <div>
          Showing {(page - 1) * ITEMS_PER_PAGE + 1} - {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-600"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-gray-200 dark:bg-gray-700 font-bold' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-600"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageDonationsAdmin;
