const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#393053] text-black dark:text-white shadow rounded-full font-semibold ${className}`}>
    {children}
  </span>
);

export { Badge };