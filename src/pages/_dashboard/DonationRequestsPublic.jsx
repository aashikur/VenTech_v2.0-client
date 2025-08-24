import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import Loading from "@/pages/_fronted/home/Loading";
import BloodRequestCard from "@/components/home/BloodRequestCard";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    inprogress: "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
};

export default function DonationRequestsPublic() {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    // Search/filter state
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Fetch all requests
    const { data: requests = [], isLoading, isError  } = useQuery({
        queryKey: ["public-donation-requests"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/public-donation-requests");
            return data;
        },
    });

    // Filter by status and search
    const filteredRequests = requests
        .filter((r) =>
            statusFilter === "all" ? true : r.donationStatus === statusFilter
        )
        .filter((r) =>
            search
                ? r.recipientName?.toLowerCase().includes(search.toLowerCase()) ||
                r.recipientDistrict?.toLowerCase().includes(search.toLowerCase()) ||
                r.bloodGroup?.toLowerCase().includes(search.toLowerCase())
                : true
        );

    // Respond handler
    const handleRespond = (id) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to login first!",
            })
            navigate("/login");
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Donate blood to this Person?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#c30027",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Yes, Please!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/donation-request/${id}/respond`).then(() => {
                    Swal.fire("Thank you!", "You have responded to donate.", "success");
                    // Optionally refetch data
                            queryClient.invalidateQueries(["public-donation-requests"]);

                });
            }
        });
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="p-4 max-w-6xl mx-auto">
           <div className="flex flex-col sm:flex-row gap-2  justify-between border border-gray-100 dark:border-gray-700 shadow px-4 py-3 items-center rounded-2xl my-4">
             <h2 className="text-xl sm:text-2xl font-bold text-[#c30027]  text-center">
               Total Requested : ({filteredRequests.length})
            </h2>
            <button className="flex btn justify-center items-center gap-2 bg-gradient-to-tr from-red-800   to-red-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a80020] transition cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg> Create Request</button>


           </div>
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by recipient, location, or blood group"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 rounded-full border border-[#c30027]/30 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
                />
                <div className="flex gap-2 items-center flex-wrap justify-center">
                    <span className="font-semibold ">Status:</span>
                    {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
                        <button
                            key={status}
                            className={`px-3 py-1 rounded-full font-semibold text-xs ${statusFilter === status
                                    ? "bg-[#c30027] text-white"
                                    : "bg-gray-200 text-[#c30027]"
                                }`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req, idx) => (
                        // <div
                        //     key={req._id}
                        //     className="bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10 p-5 flex flex-col gap-2"
                        // >
                        //     <div className="flex justify-between items-center">
                        //         <span className="font-bold text-[#c30027] text-lg">
                        //             {req.recipientName}
                        //         </span>
                        //         <span
                        //             className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[req.donationStatus] || "bg-gray-200"
                        //                 }`}
                        //         >
                        //             {req.donationStatus}
                        //         </span>
                        //     </div>
                        //     <div className="text-sm text-gray-500 dark:text-gray-300">
                        //         <b>Location:</b> {req.recipientDistrict}, {req.recipientUpazila}
                        //     </div>
                        //     <div className="text-sm">
                        //         <b>Date:</b> {req.donationDate} <b>Time:</b> {req.donationTime}
                        //     </div>
                        //     <div className="text-sm">
                        //         <b>Blood Group:</b>{" "}
                        //         <span className="font-bold text-[#c30027]">{req.bloodGroup}</span>
                        //     </div>
                        //     <div className="flex gap-2 mt-2">
                        //         <button
                        //             className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition text-xs"
                        //             onClick={() => navigate(`/dashboard/donation-request-details/${req._id}`)}
                        //         >
                        //             View
                        //         </button>
                        //         {/* Respond/Responded Button */}
                        //         {req.donationStatus === "pending" ? (
                        //             <button
                        //                 className="px-3 py-1 rounded-full bg-[#c30027] text-white font-semibold hover:bg-red-700 transition text-xs"
                        //                 onClick={() => handleRespond(req._id)}
                        //             >
                        //                 Respond
                        //             </button>
                        //         ) : (
                        //             <button
                        //                 className="px-3 py-1 rounded-full bg-gray-300 text-gray-500 font-semibold cursor-not-allowed text-xs"
                        //                 disabled
                        //             >
                        //                 Responded
                        //             </button>
                        //         )}
                        //     </div>
                         // </div>
<BloodRequestCard key={req._id} req={req} handleRespond={handleRespond} />
                 
                    ))
                ) : (
                    <div className="col-span-full text-center p-4 text-gray-400">
                        No requests found
                    </div>
                )}
            </div>
        </div>
    );
}