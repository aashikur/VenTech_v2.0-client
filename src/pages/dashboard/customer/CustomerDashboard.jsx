import React from "react";
import { format } from "date-fns";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CustomerDashboard = ({ customerName = "Customer" }) => {
  const today = format(new Date(), "EEEE, MMMM do, yyyy");

  const cards = [
    {
      title: "My Orders",
      description: "View and track your orders",
      link: "/dashboard/my-orders",
    },
    {
      title: "My Profile",
      description: "Update your personal details",
      link: "/dashboard/profile",
    },
    {
      title: "Documents",
      description: "Manage your important documents",
      link: "/dashboard/profile",
    },
    {
      title: "Wishlist",
      description: "Check your saved products",
      link: "/dashboard/profile",
    },
    {
      title: "Support Tickets",
      description: "Raise or view support requests",
      link: "/dashboard/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F14] px-6 py-12 transition-colors">
      {/* ---------------- Header ---------------- */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            {customerName}
          </span>
          !
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">{today}</p>
      </motion.div>

      {/* ---------------- Cards ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={card.link}
              className="group relative block bg-white dark:bg-[#18122B] p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-pink-500/10 via-red-500/10 to-yellow-500/10 rounded-3xl"></div>

              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0  left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-b-3xl"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
