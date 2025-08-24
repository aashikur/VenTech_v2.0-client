import { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function Search() {
  const axiosSecure = useAxiosSecure();

  // Dynamic search state
  const [dynamicSearch, setDynamicSearch] = useState("");
  const [dynamicDonors, setDynamicDonors] = useState([]);
  const [dynamicLoading, setDynamicLoading] = useState(false);

  // Dynamic search handler
  const handleDynamicSearch = async (e) => {
    const value = e.target.value;
    setDynamicSearch(value);
    if (!value) {
      setDynamicDonors([]);
      return;
    }
    setDynamicLoading(true);
    try {
      // Backend API: /search-donors-dynamic?query=...
      const { data } = await axiosSecure.get(`/search-donors-dynamic?query=${value}`);
      setDynamicDonors(data);
    } catch {
      setDynamicDonors([]);
    }
    setDynamicLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-8 mb-12">
      <h2 className="text-2xl font-bold text-[#c30027] mb-6 text-center">Search Donors</h2>
      {/* Dynamic Search */}
      <input
        type="text"
        placeholder="🔍 Type to search (name, blood group, district, upazila)"
        value={dynamicSearch}
        onChange={handleDynamicSearch}
        className="w-full md:w-2/3 mx-auto px-4 py-2 rounded-full border border-[#c30027]/30 bg-[#FDEDF3] dark:bg-[#393053] outline-none mb-4 block"
      />
      <div className="text-center text-xs text-gray-500 mb-4">
        Your search result will be here
      </div>
      {dynamicLoading && <div className="text-center">Searching...</div>}
      {dynamicSearch && !dynamicLoading && (
        dynamicDonors.length > 0 ? (
          <DonorGrid donors={dynamicDonors} />
        ) : (
          <div className="text-center text-gray-400">No donors found for your search.</div>
        )
      )}
    </div>
  );
}

// DonorGrid component
function DonorGrid({ donors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {donors.map((donor, idx) => (
        <div
          key={donor._id || idx}
          className="bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10 p-5 flex flex-col gap-2"
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={donor.photoURL || "/logo/icon-2.png"}
              alt={donor.name}
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <div className="font-bold text-[#c30027]">{donor.name}</div>
              <div className="text-xs text-gray-500">{donor.email}</div>
            </div>
          </div>
          <div className="text-sm">
            <b>Blood Group:</b> <span className="font-bold text-[#c30027]">{donor.bloodGroup}</span>
          </div>
          <div className="text-sm">
            <b>Location:</b> {donor.district}, {donor.upazila}
          </div>
          <div className="text-sm">
            <b>Status:</b> <span className={donor.status === "active" ? "text-green-600" : "text-red-600"}>{donor.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}