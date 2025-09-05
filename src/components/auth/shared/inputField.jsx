const InputField = ({ icon, label, name, value, handleChange, placeholder, type = "text", required = true }) => (
  <div>
    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">{label}</label>
    <div className="flex items-center rounded-full px-4 bg-gray-50 dark:bg-gray-800 shadow-inner border border-gray-200 dark:border-gray-700 focus-within:border-orange-500 transition">
      {icon}
      <input
        type={type}
        name={name}
  value={value}       // ✅ controlled input
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="bg-transparent flex-1 py-3 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  </div>
);

export default InputField;