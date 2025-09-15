import { useNavigate } from "react-router";
import { FaSearch, FaStore, FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import useRole from "@/hooks/useRole";

const Banner = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  return (
    <section className="relative w-full z-10 flex flex-col justify-center items-center text-center h-[90vh] overflow-hidden">


      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 sm:py-28 flex flex-col items-center">
        {/* Headline with Gradient */}
        <h1 className="block bg-clip-text text-transparent font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Ven<span className="">Tech</span> – Your Ultimate Multi-Vendor Marketplace
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Discover, Sell, and Manage Products Seamlessly.{" "}
          <span className="text-orange-500 font-semibold">
            Trusted by thousands of customers
          </span>{" "}
          and merchants across all categories.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 mb-14 w-full sm:w-auto justify-center">
          {/* Primary CTA (Gradient) */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center text-sm justify-center gap-2 w-full sm:w-48 h-12 cursor-pointer rounded-full 
              bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  sm:text-base
              text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            <FaShoppingCart /> Shop Now
          </button>
          

          {/* Secondary CTA (Orange) */}
          <button
            onClick={() => navigate(`${user ? "/dashboard" : "/login"}`)}
            className="flex items-center justify-center gap-2 w-full sm:w-48 h-12 cursor-pointer rounded-full 
              border border-orange-500 text-orange-500 text-sm sm:text-base
              dark:text-white dark:border-white/60 
              hover:bg-orange-50 dark:hover:bg-gray-800 
              font-semibold transition"
          >
            <FaStore /> Join as Merchant
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mb-5 sm:mb-8 sm:mt-12">
          <div
          className="flex items-center bg-white dark:bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <FaSearch className="ml-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search products, categories, or brands..."
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 text-sm sm:text-base"
            />
            <button 
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-r-full font-semibold text-white cursor-pointer
              bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 transition">
              Products
            </button>
          </div>
        </div>

        {/* Featured Products */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Trending Categories of the Week –{" "}
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Handpicked for You
          </span>
        </h2>
      </div>
    </section>
  );
};

export default Banner;
