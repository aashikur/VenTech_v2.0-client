import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { bloodGroups, districts, upazilasByDistrict } from "@/utils/bdLocationData";
import Loading from "@/pages/_fronted/home/Loading";

export default function MyDonationRequestsDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: request, isLoading, isError, error } = useQuery({
    queryKey: ["donation-request-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-request/${id}`);
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>
  if (isError) return <div className="text-red-600 text-center py-10">{error.message}</div>;
  if (!request) return <div className="text-center py-10">No data found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-[#18122B] shadow-md rounded-2xl p-6 md:p-10 space-y-6">
        <h2 className="text-3xl font-bold text-[#c30027] text-center mb-6">
          View Details ~ Donation Request
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Recipient Info */}
          <ReadOnlyField label="Recipient Name" value={request.recipientName} />
          <ReadOnlyField label="Hospital Name" value={request.hospitalName} />

          {/* Location */}
          <ReadOnlyField label="District" value={request.recipientDistrict} />
          <ReadOnlyField label="Upazila" value={request.recipientUpazila} />
          <div className="sm:col-span-2">
            <ReadOnlyField label="Address" value={request.addressLine} />
          </div>

          {/* Donation Info */}
          <ReadOnlyField label="Blood Group" value={request.bloodGroup} />
          <ReadOnlyField label="Donation Date" value={request.donationDate} />
          <ReadOnlyField label="Donation Time" value={request.donationTime} />
          <ReadOnlyField label="Status" value={request.donationStatus} />

          {/* Request Message */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Request Message</label>
            <textarea
              value={request.requestMessage}
              disabled
              rows={4}
              className="w-full px-3 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none resize-none cursor-not-allowed"
            />
          </div>

          {/* Donor Info */}
          {request.donorInfo && (
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Donor Info</label>
              <div className="w-full px-3 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                {request.donorInfo.name} ({request.donorInfo.email})
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Read-Only Field Component
function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="w-full px-3 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
        {value || "-"}
      </div>
    </div>
  );
}
