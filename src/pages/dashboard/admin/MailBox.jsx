import { useEffect, useState, useMemo } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
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
    setNewArrived((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter + Search
  const filteredMails = useMemo(() => {
    return mails.filter(mail => {
      const matchesSearch = mail.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : mail.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [mails, search, filter]);

  // Pagination
  const totalPages = Math.ceil(filteredMails.length / mailsPerPage);
  const paginatedMails = filteredMails.slice(
    (currentPage - 1) * mailsPerPage,
    currentPage * mailsPerPage
  );

  const categories = [
    "all",
    "Merchant Pending",
    "Report a Merchant",
    "Report a Product",
    "Report a Bug",
    "Other",
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Mail Box <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({filteredMails.length} messages)</span>
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center w-full sm:w-80 bg-white dark:bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <FaSearch className="ml-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 text-sm"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
          className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm shadow"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
          ))}
        </select>
      </div>

      {/* Table / Mail List */}
      <div className="overflow-x-auto">
        {paginatedMails.length > 0 ? paginatedMails.map((mail, i) => (
          <motion.div
            key={mail._id}
            layout
            className={`border rounded-xl overflow-hidden cursor-pointer 
              ${newArrived.includes(mail._id) ? "bg-yellow-50 dark:bg-yellow-900/20 animate-pulse" : "bg-white dark:bg-gray-800"} 
              border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition mb-3`}
            onClick={() => toggleExpand(i)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 items-center">
              <p className="font-medium">{(currentPage - 1) * mailsPerPage + i + 1}</p>
              <p className="truncate">{mail.email}</p>
              <p className="truncate">{mail.subject}</p>
              <p className="truncate">{mail.name}</p>
              <p className="flex justify-between items-center">
                {newArrived.includes(mail._id) && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>}
                {new Date(mail.createdAt).toLocaleDateString()}
                {expanded === i ? <FaChevronUp /> : <FaChevronDown />}
              </p>
            </div>

            {/* Expandable Drawer */}
            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                >
                  <p className="text-gray-800 dark:text-gray-100"><strong>Message:</strong></p>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{mail.message}</p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Category: {mail.category}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No mails found
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MailBox;
