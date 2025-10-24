import PageBanner from '@/components/shared/PageBanner';
import React from 'react';

const TermsPages = () => {
    return (
        <div className='relative'>
            <PageBanner
                title="Terms & Conditions"
                subtitle="Read our terms and conditions"
                breadcrumb="Home → Terms & Conditions"
            />

            <div className='max-w-[1400px] mx-auto px-4 py-8'>
                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="space-y-4 max-w-3xl">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Welcome to VenTech</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            These terms and conditions outline the rules and regulations for the use of VenTech's website and services.
                            By accessing this website, we assume you accept these terms and conditions in full.
                        </p>
                    </section>

                    {/* Account Terms */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1. Account Terms</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>You must be 18 years or older to use this website.</li>
                            <li>You must provide valid and accurate information during registration.</li>
                            <li>You are responsible for maintaining the security of your account.</li>
                            <li>You must notify us immediately of any unauthorized account access.</li>
                            <li>We reserve the right to suspend or terminate accounts that violate our terms.</li>
                        </ul>
                    </section>

                    {/* Shopping & Orders */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">2. Shopping & Orders</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Prices are subject to change without notice.</li>
                            <li>We reserve the right to refuse service to anyone.</li>
                            <li>Order confirmation does not guarantee product availability.</li>
                            <li>We may limit or cancel quantities purchased per person or order.</li>
                            <li>Payment must be received in full before order processing.</li>
                        </ul>
                    </section>

                    {/* Privacy & Data */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">3. Privacy & Data Protection</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>We collect and process personal data as described in our Privacy Policy.</li>
                            <li>Your data is protected according to applicable data protection laws.</li>
                            <li>We use cookies to enhance your browsing experience.</li>
                            <li>We never sell your personal information to third parties.</li>
                            <li>You can request access to or deletion of your personal data.</li>
                        </ul>
                    </section>

                    {/* Product Information */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">4. Product Information</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>We strive to display accurate product information and pricing.</li>
                            <li>Colors may vary due to monitor settings and photography.</li>
                            <li>Product descriptions are provided by manufacturers or sellers.</li>
                            <li>We reserve the right to modify product specifications.</li>
                            <li>Stock availability is subject to change without notice.</li>
                        </ul>
                    </section>

                    {/* Shipping & Returns */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">5. Shipping & Returns</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Delivery times are estimates and not guaranteed.</li>
                            <li>Returns must be initiated within 14 days of delivery.</li>
                            <li>Products must be unused and in original packaging.</li>
                            <li>Return shipping costs are the customer's responsibility.</li>
                            <li>Refunds are processed within 5-7 business days.</li>
                        </ul>
                    </section>

                    {/* Contact Information */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Contact Us</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            If you have any questions about these Terms & Conditions, please contact us:
                        </p>
                        <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Email: support@ventech.com</li>
                            <li>Phone: +880 1234-567890</li>
                            <li>Address: Dhaka, Bangladesh</li>
                        </ul>
                    </section>

                    {/* Last Updated */}
                    <section className="pt-8 text-sm text-gray-500 dark:text-gray-400">
                        <p>Last updated: October 24, 2025</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPages;