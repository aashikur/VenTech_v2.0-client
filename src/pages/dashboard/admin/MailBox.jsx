import { useEffect, useState, useMemo } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MailBox = () => {
  const [mails, setMails] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mailsPerPage = 10;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const res = await axiosSecure.get("/api/public/mailbox");
        setMails(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMails();
  }, [axiosSecure]);

  const filteredMails = useMemo(() => {
    return mails.filter(
      (mail) =>
        mail.name.toLowerCase().includes(search.toLowerCase()) ||
        mail.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [mails, search]);

  const totalPages = Math.ceil(filteredMails.length / mailsPerPage);
  const paginatedMails = filteredMails.slice(
    (currentPage - 1) * mailsPerPage,
    currentPage * mailsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Header & Search */}
      <div className="max-w-3xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Messages
        </h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 outline-none shadow-sm"
        />
      </div>

      {/* Messages List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {paginatedMails.length > 0 ? (
          paginatedMails.map((mail) => (
            <div
              key={mail._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {mail.name} <span className="text-sm text-gray-500 dark:text-gray-400">({mail.email})</span>
                  </p>
                  <p className="mt-2 text-gray-500 text-sm dark:text-gray-200  sm:text-lg leading-relaxed">
                    {mail.message}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(mail.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No messages found
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MailBox;
