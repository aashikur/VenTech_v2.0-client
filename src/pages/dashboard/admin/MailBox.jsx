import { useEffect, useState, useMemo } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="min-h-screen bg-gray-50 dark:bg-[#0f0f14] p-4 md:p-6 transition-colors">
      {/* Header & Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
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
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none text-sm sm:text-base transition"
        />
      </motion.div>

      {/* Messages List */}
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence>
          {paginatedMails.length > 0 ? (
            paginatedMails.map((mail) => (
              <motion.div
                key={mail._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[#18122B] border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg">
                      {mail.name}{" "}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({mail.email})
                      </span>
                    </p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 sm:text-base leading-relaxed">
                      {mail.message}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap self-start sm:self-center">
                    {new Date(mail.createdAt).toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              No messages found
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-8 gap-3 flex-wrap"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Next
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default MailBox;
