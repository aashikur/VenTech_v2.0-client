const Button = ({ children, className = "", ...props }) => (
  <button
    className={`rounded-full bg-[#2d2544] text-white font-bold px-8 py-3 text-lg shadow hover:bg-pink-500 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Button1 = ({ children = "Shop Now", onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-6 h-12 rounded-full 
      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
      text-white font-semibold shadow-lg hover:opacity-90 transition"
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

const Button2 = ({ children = "Join as Merchant", onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-6 h-12 rounded-full
      border border-orange-500 text-orange-500 font-semibold
      dark:text-white dark:border-white/60 
      hover:bg-orange-50 dark:hover:bg-gray-800 transition"
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
};

import { FaArrowRight } from "react-icons/fa";

const Button3 = ({ children = "View All", onClick ,className ="", arrow = true , border=false}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex items-center gap-2 text-sm sm:text-base font-medium 
      text-orange-500 dark:text-orange-400 hover:underline`}
    >
      {children}
     { arrow && <FaArrowRight className="text-xs sm:text-sm" />}
    </button>
  );
};

export {Button, Button1, Button2, Button3 };
