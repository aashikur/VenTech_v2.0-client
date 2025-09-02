import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaUser, FaTint, FaDonate, FaRegListAlt } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useDashboardStars from "@/hooks/useDashboardStars";
const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  inprogress: "bg-blue-100 text-blue-700",
  done: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequest: 0,
    totalFunding: 0,
  });

  const { totalFundingAmount } = useDashboardStars()
  console.log(totalFundingAmount)
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure("/admin-dashboard-stats").then(({ data }) => setStats(data));
    // Example: fetch latest requests
    // axiosSecure("/latest-requests?limit=5").then(({ data }) => setLatestRequests(data));
  }, []);

  const { user } = useContext(AuthContext);


  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-donation-requests-home", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-donation-requests?email=${user.email}&limit=3`);
      console.log("Hello Man: ", requests)
      return data;
    },
  });
  // console.log(requests)
  // Example stat cards config
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUser className="text-3xl text-white" />,
      gradient: "from-[#c30027] to-pink-400",
      sub: "All registered users",
    },
    {
      title: "Total Requests",
      value: stats.totalRequest,
      icon: <FaRegListAlt className="text-3xl text-white" />,
      gradient: "from-pink-400 to-[#c30027]",
      sub: "All blood requests",
    },
    {
      title: "Total Funding",
      value: totalFundingAmount ? `৳${totalFundingAmount}` : "৳0",
      icon: <FaDonate className="text-3xl text-white" />,
      gradient: "from-[#c30027] to-[#43e97b]",
      sub: "Total funds raised",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#FDEDF3] dark:bg-[#18122B] min-h-screen">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "/logo/icon-2.png"}
            alt="Admin"
            className="w-14 h-14 rounded-full border-2 border-[#c30027]"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#c30027]">Welcome, {user?.displayName || "Admin"} 👋</h2>
            <p className="text-gray-500 dark:text-gray-300">Here’s your BloodAid dashboard overview</p>
          </div>
        </div>
        {/* (Optional) Add a search or quick action bar here */}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-2xl p-6 flex flex-col gap-2 shadow-lg bg-gradient-to-tr ${stat.gradient} relative overflow-hidden`}
          >
            <div className="absolute right-4 top-4 opacity-30">{stat.icon}</div>
            <div className="text-white text-lg font-semibold">{stat.title}</div>
            <div className="text-3xl font-extrabold text-white">{stat.value}</div>
            <div className="text-white text-sm opacity-80">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="p-4">
        {
          isLoading ? <span className="loading loading-spinner text-error"></span>
            :
            requests.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Your Recent Requests</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10">
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
                      {requests.map((req) => (
                        <tr key={req._id} className="border-t">
                          <td className="p-3">{req.recipientName}</td>
                          <td className="p-3">{req.recipientDistrict}, {req.recipientUpazila}</td>
                          <td className="p-3">{req.donationDate}</td>
                          <td className="p-3">{req.donationTime}</td>
                          <td className="p-3">{req.bloodGroup}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[req.donationStatus] || "bg-gray-200"
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
                <button
                  className="mt-4 px-4 py-2 bg-[#c30027] text-white rounded-full font-semibold hover:bg-red-700 transition"
                  onClick={() => navigate("/dashboard/my-donation-requests")}
                >
                  View My All Requests
                </button>
              </>
            ) : (
              <div className="text-gray-500 mt-8">You have not made any donation requests yet.</div>
            )}
      </div>
    </div>
  );
};

export default AdminDashboard;