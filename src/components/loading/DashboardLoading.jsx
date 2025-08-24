import React from "react";

export default function DashboardLoading() {
  return (
    <div className="p-4 md:p-8 bg-[#FDEDF3] dark:bg-[#18122B] min-h-screen animate-pulse">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full border-2 border-[#c30027] bg-gray-300 dark:bg-gray-700"></div>
          {/* Name + Subtitle */}
          <div>
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 flex flex-col gap-3 shadow-lg bg-gray-200 dark:bg-gray-700 relative overflow-hidden"
          >
            <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Table Section Skeleton */}
      <div className="p-4 bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10">
        {/* Table Header */}
        <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="p-3">
                    <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, rowIdx) => (
                <tr key={rowIdx} className="border-t">
                  {[...Array(7)].map((_, colIdx) => (
                    <td key={colIdx} className="p-3">
                      <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button Skeleton */}
        <div className="mt-4 h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}
