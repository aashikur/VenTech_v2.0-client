import { useEffect, useState, useMemo } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaSearch, FaInbox, FaTag, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MailBox = () => {
  const [mails, setMails] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [newArrived, setNewArrived] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const mailsPerPage = 10;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const res = await axiosSecure.get("/api/public/mailbox");
        setMails(res.data);
        setNewArrived(res.data.slice(-2).map(mail => mail._id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMails();
  }, [axiosSecure]);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
    setNewArrived(prev => prev.filter((_, i) => i !== index));
  };

  // Simplified filter - only search by name
  const filteredMails = useMemo(() => {
    return mails.filter(mail => 
      mail.name.toLowerCase().includes(search.toLowerCase()) ||
      mail.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [mails, search]);

  const totalPages = Math.ceil(filteredMails.length / mailsPerPage);
  const paginatedMails = filteredMails.slice(
    (currentPage - 1) * mailsPerPage,
    currentPage * mailsPerPage
  );

  const categories = [
    { value: "all", label: "All Messages", icon: <FaInbox /> },
    { value: "Merchant Pending", label: "Merchant Pending", icon: <FaTag /> },
    { value: "Report Merchant", label: "Report Merchant", icon: <FaTag /> },
    { value: "Sponsor VenTech", label: "Sponsor VenTech", icon: <FaStar /> },
    { value: "Others", label: "Others", icon: <FaTag /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="p-4 md:p-6">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-orange-200 
                dark:border-orange-800/30 bg-white dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 
                transition-shadow"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          {paginatedMails.length > 0 ? paginatedMails.map((mail, i) => (
            <motion.div
              key={mail._id}
              layout
              className={`border-b border-orange-100 dark:border-orange-900/20 last:border-0
                ${i % 2 === 0 
                  ? 'bg-orange-50/30 dark:bg-orange-900/5' 
                  : 'bg-white dark:bg-gray-800'}`}
            >
              <button
                onClick={() => toggleExpand(i)}
                className="w-full px-6 py-4 text-left hover:bg-orange-100/50 
                  dark:hover:bg-orange-900/10 transition-colors"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {mail.name}
                      </span>
                      <span className="text-sm text-orange-600 dark:text-orange-400">
                        {mail.email}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {mail.message}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(mail.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-4 bg-orange-50/50 dark:bg-orange-900/5 
                      border-t border-orange-100 dark:border-orange-900/20"
                  >
                    <div className="space-y-4">
                      <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                        {mail.message}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )) : (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              No messages found
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
                border border-orange-200 dark:border-orange-800/30
                disabled:opacity-50 hover:bg-orange-50 dark:hover:bg-orange-900/10 
                text-orange-600 dark:text-orange-400
                transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
                border border-orange-200 dark:border-orange-800/30
                disabled:opacity-50 hover:bg-orange-50 dark:hover:bg-orange-900/10 
                text-orange-600 dark:text-orange-400
                transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailBox;
