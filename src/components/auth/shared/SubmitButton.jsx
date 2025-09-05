import React from 'react';

const SubmitButton = ({ handleNext, handleBack, step, form, loading }) => {
    return (
            <div className="flex justify-between items-center gap-4 mt-4">
              {step > 1 && <button type="button" onClick={handleBack} className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Back</button>}
              {step < (form.role === "merchant" ? 2 : 1) ? (
                <button type="button" onClick={handleNext} className="ml-auto w-full py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition">Next</button>
              ) : (
                <button type="submit" disabled={loading} className="ml-auto w-full py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    `Register as ${form.role === "customer" ? "Customer" : "Merchant"}`
                  )}
                </button>
              )}
            </div>
    );
};

export default SubmitButton;