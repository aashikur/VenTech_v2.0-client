const Button = ({ children, className = "", ...props }) => (
  <button
    className={`rounded-full bg-[#2d2544] text-white font-bold px-8 py-3 text-lg shadow hover:bg-pink-500 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export { Button };