import { useRouteError, Link } from "react-router";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ThemeButton from "@/components/ui/ThemeButton";

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
        <div className="flex gap-2 sm:gap-4 py-8">
          <Link to='/'>
              <ThemeButton ton className="px-8 text-sm" >Back to Home</ThemeButton>
          </Link>
          <Link to='/contact'>
              <ThemeButton variant="outline" className="px-8 text-sm ">
                Contact Support
              </ThemeButton>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Error;
