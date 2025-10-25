import React from "react";
import { format } from "date-fns";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaUser,
  FaFileAlt,
  FaHeart,
  FaHeadset,
} from "react-icons/fa";

const CustomerDashboard = ({ customerName = "Customer" }) => {
  const today = format(new Date(), "EEEE, MMMM do, yyyy");

  const cards = [
    {
      title: "My Orders",
      description: "View and track your orders easily.",
      icon: <FaShoppingCart />,
      link: "/dashboard/my-orders",
    },
    {
      title: "My Profile",
      description: "Update your personal details and preferences.",
      icon: <FaUser />,
      link: "/dashboard/profile",
    },
    {
      title: "Documents",
      description: "Manage your important uploaded files.",
      icon: <FaFileAlt />,
      link: "/dashboard/profile",
    },
    {
      title: "Wishlist",
      description: "View your saved products and favorites.",
      icon: <FaHeart />,
      link: "/dashboard/profile",
    },
    {
      title: "Support Tickets",
      description: "Raise or track your customer support issues.",
      icon: <FaHeadset />,
      link: "/dashboard/profile",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      {/* ---------------- Header ---------------- */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100">
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            {customerName}
          </span>
          !
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">{today}</p>
      </motion.div>

      {/* ---------------- Cards ---------------- */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
          >
            <NavLink
              to={card.link}
              className="group block p-8 rounded-2xl shadow-md bg-white dark:bg-[#18122B] hover:shadow-xl transition relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-500/10 via-red-500/10 to-yellow-500/10" />

              {/* Icon & Text */}
              <div className="relative flex flex-col items-center justify-center text-center gap-4">
                <span className="text-4xl text-pink-500">{card.icon}</span>
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-xl">
                  {card.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                  {card.description}
                </p>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
