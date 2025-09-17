import React from "react";
import { format } from "date-fns";
import { Link } from "react-router";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12">
      {/* ---------------- Welcome ---------------- */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            {customerName}
          </span>
          !
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">{today}</p>
      </div>

      {/* ---------------- Cards Section ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="relative bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.title}
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">{card.description}</p>
            {/* Optional gradient bar at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
