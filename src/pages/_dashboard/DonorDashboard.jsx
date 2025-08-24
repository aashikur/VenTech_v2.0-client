import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { FaTint, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
// import Loading from "@/pages/_fronted/home/Loading";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  inprogress: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};

export default function DonorDashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all requests for this user (no limit, for summary)
  const { data: allRequests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests-home", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      return data;
    },
  });

  // Recent 3 requests for table
  const recentRequests = allRequests.slice(0, 3);

  // Summary stats
  const total = allRequests.length;
  const pending = allRequests.filter(r => r.donationStatus === "pending").length;
  const inprogress = allRequests.filter(r => r.donationStatus === "inprogress").length;
  const done = allRequests.filter(r => r.donationStatus === "done").length;
  const canceled = allRequests.filter(r => r.donationStatus === "canceled").length;

  // if (isLoading) return <Loading></Loading>

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-[#c30027] mb-6 text-center">
        Welcome, {user.displayName || user.email}!
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          icon={<FaTint className="text-2xl text-[#c30027]" />}
          label="Total Requests"
          value={total}
          color="from-[#c30027] to-pink-400"
        />
        <SummaryCard
          icon={<FaClock className="text-2xl text-yellow-600" />}
          label="Pending"
          value={pending}
          color="from-yellow-400 to-yellow-200"
        />
        <SummaryCard
          icon={<FaCheckCircle className="text-2xl text-green-600" />}
          label="Done"
          value={done}
          color="from-green-400 to-green-200"
        />
        <SummaryCard
          icon={<FaTimesCircle className="text-2xl text-red-600" />}
          label="Canceled"
          value={canceled}
          color="from-red-400 to-red-200"
        />
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10 p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#c30027]">Your Recent Requests</h3>
        {recentRequests.length > 0 ? (
          <div className="overflow-x-auto">
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
                {recentRequests.map((req) => (
                  <tr key={req._id} className="border-t">
                    <td className="p-3">{req.recipientName}</td>
                    <td className="p-3">{req.recipientDistrict} , {req.recipientUpazila}</td>
                    <td className="p-3">{req.donationDate}</td>
                    <td className="p-3">{req.donationTime}</td>
                    <td className="p-3">{req.bloodGroup}</td>
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
                        className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition text-xs"
                        onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500 mt-8">You have not made any donation requests yet.</div>
          // <span></span>
        )}
       {recentRequests.length > 0 && <button
          className="mt-4 px-4 py-2 bg-[#c30027] text-white rounded-full font-semibold hover:bg-red-700 transition"
          onClick={() => navigate("/dashboard/my-donation-requests")}
        >
          View My All Requests
        </button>}
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ icon, label, value, color }) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-2 shadow-lg bg-gradient-to-tr ${color} relative overflow-hidden`}>
      <div className="absolute right-4 top-4 opacity-20">{icon} </div>
      <div className="text-white text-lg font-semibold">{label}</div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
    </div>
  );
}