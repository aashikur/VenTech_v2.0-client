import Lottie from "lottie-react";


const Loading = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
      {/* Animated Logo Container */}
      <div className="relative">
        {/* Pulse Ring */}
        <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-75"></div>
        
        {/* Center Circle with V */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          <span className="text-2xl font-bold text-white">V</span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
          VenTech
          <span className="inline-flex ml-2 opacity-75">
            <span className="animate-bounce mx-0.5 delay-100">.</span>
            <span className="animate-bounce mx-0.5 delay-200">.</span>
            <span className="animate-bounce mx-0.5 delay-300">.</span>
          </span>
        </p>
      </div>

      {/* Loading Bar */}
      <div className="mt-4 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-loading-bar"></div>
      </div>
    </div>
  );
};

export default Loading;
