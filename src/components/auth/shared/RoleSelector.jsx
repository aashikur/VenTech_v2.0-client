import React from 'react';

const RoleSelector = ({ form, setForm, setStep }) => {
    return (
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role: "customer" });
                    setStep(1);
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition ${form.role === "customer"
                      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                >
                  🛍️ Customer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role: "merchant" });
                    setStep(1);
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition ${form.role === "merchant"
                      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                >
                  🏪 Merchant
                </button>
              </div>
            </div>

    );
};

export default RoleSelector;