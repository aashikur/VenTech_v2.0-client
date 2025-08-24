import {
  FaMapMarkerAlt,
  FaTint,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const BloodRequestCard = ({ req, handleRespond }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-800 rounded-2xl p-6 w-full max-w-md mx-auto hover:scale-[1.01] transition duration-300 ease-in-out">
      {/* Blood Group Badge - Main Focus */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center shadow-inner border-4 border-red-600">
          <p className="text-3xl font-extrabold text-red-700 dark:text-red-300">{req.bloodGroup}</p>
        </div>
      </div>

      {/* Header: Name & Status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {req.recipientName}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            statusColors[req.donationStatus] || "bg-gray-200 text-gray-800"
          }`}
        >
          {req.donationStatus}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 text-sm">
        <FaMapMarkerAlt className="mr-2 text-red-500" />
        <p>
          {req.recipientDistrict}, {req.recipientUpazila}
        </p>
      </div>

      {/* Date and Time */}
      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 text-sm">
        <FaCalendarAlt className="mr-2 text-blue-500" />
        <p>{req.donationDate}</p>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4 text-sm">
        <FaClock className="mr-2 text-purple-500" />
        <p>{req.donationTime}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-xs"
          onClick={() =>
            navigate(`/dashboard/donation-request-details/${req._id}`)
          }
        >
          View
        </button>

        {req.donationStatus === "pending" ? (
          <button
            className="px-3 py-1 rounded-full bg-[#c30027] hover:bg-red-700 text-white font-semibold transition text-xs flex items-center gap-1"
            onClick={() => handleRespond(req._id)}
          >
            <FaCheckCircle /> Respond
          </button>
        ) : (
          <button
            className="px-3 py-1 rounded-full bg-gray-300 text-gray-500 font-semibold cursor-not-allowed text-xs"
            disabled
          >
            Responded
          </button>
        )}
      </div>
    </div>
  );
};

export default BloodRequestCard;
