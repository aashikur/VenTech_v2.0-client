import React from "react";
import { format } from "date-fns";
import { Link } from "react-router";

const CustomerDashboard = ({ customerName = "Customer" }) => {
  const today = format(new Date(), "EEEE, MMMM do, yyyy");

  const cards = [
    {
      title: "My Orders",
      description: "View and track your orders",
      link: "/customer/orders",
    },
    {
      title: "My Profile",
      description: "Update your personal details",
      link: "/customer/profile",
    },
    {
      title: "Documents",
      description: "Manage your important documents",
      link: "/customer/documents",
    },
    {
      title: "Wishlist",
      description: "Check your saved products",
      link: "/customer/wishlist",
    },
    {
      title: "Support Tickets",
      description: "Raise or view support requests",
      link: "/customer/support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10">
      {/* ---------------- Welcome + Date ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-center items-start">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Welcome
          </h2>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
            {customerName}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-center items-start">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Today
          </h2>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
            {today}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-center items-start">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Customer
          </h2>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
            Dashboard
          </p>
        </div>
      </div>

      {/* ---------------- Cards Section ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
