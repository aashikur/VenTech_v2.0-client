function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse"
        >
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 w-1/2 mx-auto bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-3/4 mx-auto bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-8 w-full mt-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}
export default SkeletonGrid;