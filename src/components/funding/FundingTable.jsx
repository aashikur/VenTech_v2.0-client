import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import useAxiosPublic from "@/hooks/axiosPublic";

export default function FundingTable() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["fundings", page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/fundings?page=${page}&limit=${pageSize}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const { fundings = [], total = 0 } = data;
  const totalPages = Math.ceil(total / pageSize);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full min-h-[400px]">
      <h3 className="text-lg font-semibold mb-2 text-[#c30027]">Funding History</h3>
      <table className="min-w-full min-h-32 mb-auto bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10">
        <thead>
          <tr className="bg-[#FDEDF3] dark:bg-[#393053] text-[#c30027]">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden md:table-cell">Email</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left hidden md:table-cell">Date</th>
          </tr>
        </thead>
        <tbody>
          {fundings.map((f, idx) => (
            <tr key={f._id} className="border-t border-gray-300">
              <td className="p-3">{(page - 1) * pageSize + idx + 1}</td>
              <td className="p-3">{f.userName}</td>
              <td className="p-3 hidden md:table-cell">{f.userEmail}</td>
              <td className="p-3">{f.amount} ৳ </td>
              <td className="p-3 hidden md:table-cell">
                {new Date(f.fundingDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded-md text-sm ${
                page === i + 1
                  ? "bg-[#c30027] text-white"
                  : "bg-white dark:bg-[#1e1b2f] text-[#c30027] border-[#c30027]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
