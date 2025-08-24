import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaUserCircle } from "react-icons/fa";
import Loading from "@/pages/_fronted/home/Loading";

export default function UserDetailsDashboard() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/get-user/${id}`);
      console.log("Details Data of Dashboard: ", data)
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <div className="text-center text-red-600">{error.message}</div>;
  if (!user) return <div className="text-center text-gray-500">User not found.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow p-6 mt-8">
      <div className="flex flex-col items-center gap-4">
        {user.avatar || user.photoURL ? (
          <img
            src={user.avatar || user.photoURL}
            alt={user.name || user.email}
            className="w-24 h-24 rounded-full border-4 border-[#c30027] object-cover"
          />
        ) : (
          <FaUserCircle className="w-24 h-24 text-[#c30027]" />
        )}
        <h2 className="text-2xl font-bold text-[#c30027]">{user.name || "No Name"}</h2>
        <div className="text-gray-700 dark:text-white">{user.email}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          Status: <span className={`font-bold ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>{user.status}</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          Role: <span className="capitalize font-bold text-[#c30027]">{user.role}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
          <div>
            <span className="font-semibold">Blood Group:</span> {user.bloodGroup || "N/A"}
          </div>
          <div>
            <span className="font-semibold">District:</span> {user.district || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Upazila:</span> {user.upazila || "N/A"}
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
}