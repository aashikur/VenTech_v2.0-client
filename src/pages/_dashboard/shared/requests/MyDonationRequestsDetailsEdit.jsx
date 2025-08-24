import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";
import Loading from "@/pages/_fronted/home/Loading";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // District/Upazila hook
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();

  const [form, setForm] = useState(null);

  // Fetch existing donation request data
  const { data: request, isLoading, isError } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-request/${id}`);
      return data;
    },
  });

  // Populate form state once data is loaded
  useEffect(() => {
    if (request && !form) {
      setForm({ ...request });
    }
  }, [request]);

  // Dynamic upazila options
  const upazilaOptions = form ? getUpazilasByDistrict(form.recipientDistrict) : [];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "recipientDistrict" ? { recipientUpazila: "" } : {}),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      delete form._id;
      const { data } = await axiosSecure.patch(`/donation-request/${id}`, form);
      if (data.modifiedCount > 0 || data.acknowledged) {
        Swal.fire("Success", "Donation request updated!", "success");
        queryClient.invalidateQueries(["donation-request", id]);
        navigate("/dashboard/my-donation-requests");
      } else {
        Swal.fire("No changes", "No updates were made.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update request", "error");
    }
  };

  if (isLoading) return <Loading></Loading>
  if (isError || !form) return <div className="text-red-500">Error loading data.</div>;

  return (
    <div className="bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10 p-6 mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#c30027] text-center">Edit Donation Request</h2>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full table-auto text-left">
          <tbody className="text-sm">
            {/* Requester Name */}
            <tr>
              <th className="p-3">Requester Name</th>
              <td className="p-3">
                <input
                  type="text"
                  name="requesterName"
                  value={form.requesterName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            {/* Requester Email */}
            <tr>
              <th className="p-3">Requester Email</th>
              <td className="p-3">
                <input
                  type="email"
                  name="requesterEmail"
                  value={form.requesterEmail}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            {/* Recipient Name */}
            <tr>
              <th className="p-3">Recipient Name</th>
              <td className="p-3">
                <input
                  type="text"
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            {/* District & Upazila */}
            <tr>
              <th className="p-3">District & Upazila</th>
              <td className="p-3 grid grid-cols-2 gap-4">
                <select
                  name="recipientDistrict"
                  value={form.recipientDistrict}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
                <select
                  name="recipientUpazila"
                  value={form.recipientUpazila}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                >
                  <option value="">Select Upazila</option>
                  {upazilaOptions.map((u) => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            {/* Hospital Name */}
            <tr>
              <th className="p-3">Hospital Name</th>
              <td className="p-3">
                <input
                  type="text"
                  name="hospitalName"
                  value={form.hospitalName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            {/* Address Line */}
            <tr>
              <th className="p-3">Address Line</th>
              <td className="p-3">
                <input
                  type="text"
                  name="addressLine"
                  value={form.addressLine}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            {/* Blood Group and Status */}
            <tr>
              <th className="p-3">Blood Group & Status</th>
              <td className="p-3 grid grid-cols-2 gap-4">
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="donationStatus"
                  value={form.donationStatus}
                  readOnly
                  disabled
                  className="input input-bordered w-full bg-gray-100"
                />
              </td>
            </tr>
            {/* Date and Time */}
            <tr>
              <th className="p-3">Donation Date & Time</th>
              <td className="p-3 grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="donationDate"
                  value={form.donationDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="time"
                  name="donationTime"
                  value={form.donationTime}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </td>
            </tr>
            {/* Request Message */}
            <tr>
              <th className="p-3 align-top">Request Message</th>
              <td className="p-3">
                <textarea
                  name="requestMessage"
                  value={form.requestMessage}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                ></textarea>
              </td>
            </tr>
            {/* Submit Button */}
            <tr>
              <td colSpan="2" className="p-3 pt-6 text-center">
                <button type="submit" className="btn bg-red-500 text-white w-full max-w-xs">
                  Save Changes
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default EditDonationRequest;