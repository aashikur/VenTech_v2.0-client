
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";


const PageBanner = ({ title, subtitle, breadcrumb }) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[40vh] flex items-center justify-center text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <motion.div
        className="z-10 px-6 sm:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Breadcrumb */}
        <p
          onClick={() => navigate("/")}
          className="text-sm sm:text-base text-white/90 cursor-pointer hover:underline"
        >
          {breadcrumb}
        </p>

        {/* Title */}
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
};

export default PageBanner;