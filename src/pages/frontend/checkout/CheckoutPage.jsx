import PageBanner from "@/components/shared/PageBanner";
import React from "react";

const CheckoutPage = () => {
  return (
    <div className="relative">
      <PageBanner
        title="Checkout"
        subtitle="Complete your order securely"
        breadcrumb="Home → Checkout"
      />

      <div className="max-w-[1400px] mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        {/* Left Column - Billing & Shipping Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Billing Information
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                Shipping Address
              </label>
              <textarea
                rows="3"
                placeholder="123 Street, City, Country"
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition"
            >
              Continue to Payment
            </button>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Order Summary
          </h2>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Item 1 */}
            <div className="flex justify-between items-center py-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Wireless Headphones
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: 1
                </p>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                $99.00
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex justify-between items-center py-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">
                  Smart Watch
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: 2
                </p>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                $198.00
              </span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>$297.00</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-800 dark:text-gray-100 pt-2">
              <span>Total</span>
              <span>$307.00</span>
            </div>
          </div>

          <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
