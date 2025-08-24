import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";
import useRole from "@/hooks/useRole";
import { useNavigate } from "react-router";
import Loading from "@/pages/_fronted/home/Loading";


const CreateDonationRequestDashboard = () => {
  // Custom hook থেকে data/function আনো
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    addressLine: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });
  const [upazilaOptions, setUpazilaOptions] = useState([]);

  // ফর্ম ফিল্ড চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "recipientDistrict" ? { recipientUpazila: "" } : {}),
    }));
    if (name === "recipientDistrict") {
      setUpazilaOptions(getUpazilasByDistrict(value)); // ফিক্সড
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Blocked user check (optional)
    if (user.status === "blocked") {
      Swal.fire("Blocked!", "You are blocked and cannot create requests. Please contact support.", "error");
      return;
    }

    const requestData = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      ...form,
      donationStatus: "pending", // default
    };

    try {
      await axiosSecure.post("/donation-request", requestData);
      Swal.fire("Success!", "Donation request created.", "success");
      setForm({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        addressLine: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
      });
      setUpazilaOptions([]);
    } catch (err) {
      Swal.fire("Error!", "Failed to create request.", "error");
    }
  };
  const {status} = useRole();
  if(!status) return <Loading></Loading>
  if(status === "blocked") { Swal.fire("Blocked!", "You are blocked and cannot create requests. Please contact support.", "error"); navigate("/"); 
  return null; }

  return (
<div className="max-w-6xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow p-6 mt-8">
  <h2 className="text-2xl font-bold text-[#c30027] mb-6 text-center">Create Donation Request</h2>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Full-width Requester Info */}
    <div className="md:col-span-2 lg:col-span-3">
      <label className="block text-sm font-semibold mb-1">Requester Name</label>
      <input
        type="text"
        value={user.displayName}
        readOnly
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-gray-100 dark:bg-[#393053] outline-none"
      />
    </div>
    <div className="md:col-span-2 lg:col-span-3">
      <label className="block text-sm font-semibold mb-1">Requester Email</label>
      <input
        type="email"
        value={user.email}
        readOnly
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-gray-100 dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Recipient Name */}
    <div>
      <label className="block text-sm font-semibold mb-1">Recipient Name</label>
      <input
        type="text"
        name="recipientName"
        value={form.recipientName}
        onChange={handleChange}
        required
        placeholder="Enter recipient's name"
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Recipient District */}
    <div>
      <label className="block text-sm font-semibold mb-1">Recipient District</label>
      <select
        name="recipientDistrict"
        value={form.recipientDistrict}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>
    </div>

    {/* Recipient Upazila */}
    <div>
      <label className="block text-sm font-semibold mb-1">Recipient Upazila</label>
      <select
        name="recipientUpazila"
        value={form.recipientUpazila}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      >
        <option value="">Select Upazila</option>
        {getUpazilasByDistrict(form.recipientDistrict).map((u) => (
          <option key={u.id} value={u.name}>{u.name}</option>
        ))}
      </select>
    </div>

    {/* Hospital Name */}
    <div>
      <label className="block text-sm font-semibold mb-1">Hospital Name</label>
      <input
        type="text"
        name="hospitalName"
        value={form.hospitalName}
        onChange={handleChange}
        required
        placeholder="e.g. Dhaka Medical College Hospital"
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Full Address */}
    <div className="md:col-span-2 lg:col-span-3">
      <label className="block text-sm font-semibold mb-1">Full Address Line</label>
      <input
        type="text"
        name="addressLine"
        value={form.addressLine}
        onChange={handleChange}
        required
        placeholder="e.g. Zahir Raihan Rd, Dhaka"
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Blood Group */}
    <div>
      <label className="block text-sm font-semibold mb-1">Blood Group</label>
      <select
        name="bloodGroup"
        value={form.bloodGroup}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      >
        <option value="">Select Blood Group</option>
        {bloodGroups.map((bg) => (
          <option key={bg} value={bg}>{bg}</option>
        ))}
      </select>
    </div>

    {/* Donation Date */}
    <div>
      <label className="block text-sm font-semibold mb-1">Donation Date</label>
      <input
        type="date"
        name="donationDate"
        value={form.donationDate}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Donation Time */}
    <div>
      <label className="block text-sm font-semibold mb-1">Donation Time</label>
      <input
        type="time"
        name="donationTime"
        value={form.donationTime}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Request Message */}
    <div className="md:col-span-2 lg:col-span-3">
      <label className="block text-sm font-semibold mb-1">Request Message</label>
      <textarea
        name="requestMessage"
        value={form.requestMessage}
        onChange={handleChange}
        required
        rows={3}
        placeholder="Why do you need blood?"
        className="w-full px-3 py-2 rounded-lg border border-gray-50 dark:border-gray-700 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
      />
    </div>

    {/* Submit Button (Full Width) */}
    <div className="md:col-span-2 lg:col-span-3">
      <button
        type="submit"
        className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:bg-[#a80020] transition"
      >
        Request
      </button>
    </div>
  </form>
</div>

  

);
};

export default CreateDonationRequestDashboard;