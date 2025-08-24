import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Loading from "@/pages/_fronted/home/Loading";

export default function ViewContactsDashboard() {
  const axiosSecure = useAxiosSecure();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contacts");
      return data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 mb-12">
      <h2 className="text-2xl font-bold text-[#c30027] mb-6 text-center">
        All Contact Messages ({contacts.length})
      </h2>

      {contacts.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-[#3a3a3a]">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-[#c30027] text-white">
              <tr>
                <th className="px-4 py-3">SMS Sender</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3 text-center">Action</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-[#3a3a3a] bg-white dark:bg-[#18122B]">
              {contacts.map((contact, idx) => (
                <tr
                  key={contact._id || idx}
                  className="hover:bg-gray-50 dark:hover:bg-[#2a2440] transition"
                >
                  {/* User Info */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                     <BiUser className="size-5"/>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#c30027]">{contact.name}</span>
                        <span className="text-xs text-gray-500">{contact.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-3 font-semibold">{contact.subject}</td>

                  {/* Message preview */}
                  <td className="px-4 py-3 max-w-xs">
                    <div className="bg-[#FDEDF3] dark:bg-[#393053] p-2 rounded text-gray-700 dark:text-gray-200 line-clamp-3">
                      {contact.message.slice(0, 100) + '...'}
                    </div>
                  </td>

                  {/* Action: Eye button */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedMessage(contact)}
                      className="text-[#c30027] hover:text-[#a00020] transition text-xl"
                      title="View Full Message"
                    >
                      <FaEye />
                    </button>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {contact.createdAt
                      ? new Date(contact.createdAt).toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400">No contact messages found.</div>
      )}

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1e1e2e] rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-[#c30027] text-2xl"
              onClick={() => setSelectedMessage(null)}
              title="Close"
            >
              ✕
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedMessage.photoURL || "/logo/icon-2.png"}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h3 className="text-lg font-bold text-[#c30027]">{selectedMessage.name}</h3>
                <p className="text-xs text-gray-500">{selectedMessage.email}</p>
              </div>
            </div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Subject: {selectedMessage.subject}
            </h4>
            <div className="bg-gray-100 dark:bg-[#2e2e3e] p-4 rounded text-gray-800 dark:text-gray-200 max-h-80 overflow-y-auto whitespace-pre-line">
              {selectedMessage.message}
            </div>
            <p className="text-xs text-gray-400 text-right mt-4">
              {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
