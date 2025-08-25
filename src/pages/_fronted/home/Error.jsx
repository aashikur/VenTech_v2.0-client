import { useRouteError, Link } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex flex-col items-center justify-center px-6 py-20 sm:py-28 text-center">
        {/* Gradient Error Number */}
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Error Message */}
        <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>

        {/* Error Description */}
        <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-md">
          Oops! The page you're looking for seems to have ventured too far into
          the tech wilderness.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-10 inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>

        {/* Secondary Action Button */}
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center px-8 py-3 border border-orange-500 dark:border-white/60 text-orange-500 dark:text-white font-semibold rounded-full hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors"
        >
          Contact Support
        </Link>
      </main>
      <Footer/>
    </div>
  );
};

export default Error;
