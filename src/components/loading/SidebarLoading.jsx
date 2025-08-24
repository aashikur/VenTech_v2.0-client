import React from "react";

export default function SidebarLoading({ open = true }) {
  return (
    <aside
      className={`bg-white dark:bg-[#18122B] min-h-screen flex flex-col transition-all duration-300
        ${open ? "w-64" : "w-16"} 
        border-r border-[#c30027]/10`}
    >
      {/* Top: Profile + Toggle */}
      <div className="flex flex-col items-center py-6 border-b border-[#c30027]/10">
        {/* Visit Website link */}
        {open && (
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
        )}

        {/* Profile Image */}
        <div className="w-14 h-14 rounded-full border-2 border-[#c30027] mb-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

        {/* User Name */}
        {open && (
          <>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </>
        )}

        {/* Toggle Button */}
        <div className="mt-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse w-8 h-8"></div>
      </div>

      {/* Power Links Skeleton */}
      {open && (
        <div className="mt-6 px-4">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
        </div>
      )}
      <nav className="flex flex-col gap-2 px-2">
        {[...Array(open ? 4 : 4)].map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-700 animate-pulse ${
              open ? "justify-start" : "justify-center"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            {open && <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>}
          </div>
        ))}
      </nav>

      {/* General Links Skeleton */}
      {open && (
        <div className="mt-6 px-4">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
        </div>
      )}
      <nav className="flex flex-col gap-2 px-2">
        {[...Array(open ? 5 : 5)].map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-700 animate-pulse ${
              open ? "justify-start" : "justify-center"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            {open && <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>}
          </div>
        ))}
      </nav>

      {/* Dark / Light Toggle */}
      <div className="flex justify-center items-center py-4 mt-auto">
        <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        {open && (
          <div className="ml-2 h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        )}
      </div>
    </aside>
  );
}
