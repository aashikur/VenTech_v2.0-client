import { useState } from "react";
import districtsData from "@/data/bd-districts.json";
import upazilasData from "@/data/bd-upazilas.json";
import useAxiosPublic from "@/hooks/axiosPublic";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function OptionSearch() {
  const axiosPublic = useAxiosPublic();

  const [form, setForm] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [upazilaOptions, setUpazilaOptions] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const districts = districtsData.districts;
  const allUpazilas = upazilasData.upazilas;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "district" ? { upazila: "" } : {}),
    }));
    if (name === "district") {
      const selectedDistrict = districts.find((d) => d.name === value);
      if (selectedDistrict) {
        setUpazilaOptions(
          allUpazilas.filter((u) => u.district_id === selectedDistrict.id)
        );
      } else {
        setUpazilaOptions([]);
      }
    }
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      // Fix blood group encoding (p/n)
      let bloodFixed =
        form.bloodGroup.length === 3
          ? form.bloodGroup.slice(0, 2)
          : form.bloodGroup.slice(0, 1);
      bloodFixed =
        form.bloodGroup.slice(-1) === "+" ? bloodFixed + "p" : bloodFixed + "n";

      const { data } = await axiosPublic.get(
        `/search-donors?bloodGroup=${bloodFixed}&district=${form.district}&upazila=${form.upazila}`
      );
      setDonors(data);
    } catch {
      setDonors([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[70vh] grid md:grid-cols-4 gap-6">
      {/* Left Sidebar Filter */}
      <div className="md:col-span-1 bg-white dark:bg-[#1c1c2e] p-5 rounded-2xl shadow-md h-fit">
        <h2 className="text-xl font-bold text-[#c30027] mb-4 text-center">
          Search Donors
        </h2>
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
          >
            <option value="">District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            name="upazila"
            value={form.upazila}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
          >
            <option value="">Upazila</option>
            {upazilaOptions.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-[#c30027] text-white font-semibold hover:bg-red-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Right Content */}
      <div className="md:col-span-3 flex flex-col gap-8">
        <Section1 />
        <Section2 donors={donors} searched={searched} loading={loading} />
      </div>
    </div>
  );
}

/* =============================
   Section 1 – Hero/Content Area
   ============================= */
const Section1 = () => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-[#1a1528] dark:to-[#241a35] rounded-2xl p-8 shadow-md">
      <h2 className="text-2xl font-bold text-[#c30027] mb-3">
        Donate Blood, Save Lives ❤️
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Every drop of blood can be a lifeline for someone in need. By joining
        our community of donors, you become a real-life hero. Your generosity
        ensures that no patient has to wait for hope.
      </p>
      <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 text-sm space-y-2">
        <li>Find verified blood donors instantly.</li>
        <li>Search by blood group, district, and upazila.</li>
        <li>Join a trusted community committed to saving lives.</li>
      </ul>
    </div>
  );
};

/* =============================
   Section 2 – Search Results
   ============================= */
const Section2 = ({ donors, searched, loading }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#c30027]">
        Search Results
      </h3>
      {loading && <div className="text-center">Searching...</div>}
      {searched && !loading && (
        donors.length > 0 ? (
          <DonorGrid donors={donors} />
        ) : (
          <div className="text-center text-gray-400">
            No donors found for your search.
          </div>
        )
      )}
    </div>
  );
};

/* =============================
   Donor Grid Component
   ============================= */
function DonorGrid({ donors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {donors.map((donor, idx) => (
        <div
          key={donor._id || idx}
          className="bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10 p-5 flex flex-col gap-2 hover:shadow-lg transition"
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
            <b>Blood Group:</b>{" "}
            <span className="font-bold text-[#c30027]">
              {donor.bloodGroup}
            </span>
          </div>
          <div className="text-sm">
            <b>Location:</b> {donor.district}, {donor.upazila}
          </div>
          <div className="text-sm">
            <b>Status:</b>{" "}
            <span
              className={
                donor.status === "active"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {donor.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
