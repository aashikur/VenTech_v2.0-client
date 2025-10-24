import PageBanner from '@/components/shared/PageBanner';
import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className='relative'>
            <PageBanner
                title="Privacy Policy"
                subtitle="Learn how we protect your privacy"
                breadcrumb="Home → Privacy Policy"
            />

            <div className='max-w-[1400px] mx-auto px-4 py-8'>
                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="space-y-4 max-w-3xl">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Your Privacy Matters</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            At VenTech, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                            disclose, and safeguard your information when you use our website and services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1. Information We Collect</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Personal information (name, email, phone number)</li>
                            <li>Account credentials and preferences</li>
                            <li>Shopping history and order details</li>
                            <li>Payment information (processed securely)</li>
                            <li>Device information and browsing data</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">2. How We Use Your Information</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Process your orders and payments</li>
                            <li>Improve our products and services</li>
                            <li>Send important updates and notifications</li>
                            <li>Personalize your shopping experience</li>
                            <li>Prevent fraud and enhance security</li>
                        </ul>
                    </section>

                    {/* Information Sharing */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">3. Information Sharing</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>We never sell your personal information</li>
                            <li>We share data with trusted service providers only</li>
                            <li>Partners must adhere to our privacy standards</li>
                            <li>Legal requirements may require information disclosure</li>
                            <li>You control your data sharing preferences</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">4. Data Security</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>SSL encryption for data transmission</li>
                            <li>Regular security audits and updates</li>
                            <li>Restricted access to personal information</li>
                            <li>Secure payment processing systems</li>
                            <li>Data backup and recovery protocols</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">5. Your Rights</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Access your personal information</li>
                            <li>Request data correction or deletion</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Control cookie preferences</li>
                            <li>File privacy concerns or complaints</li>
                        </ul>
                    </section>

                    {/* Contact Information */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Privacy Contact</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            For privacy-related questions or concerns, please contact our Privacy Officer:
                        </p>
                        <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Email: privacy@ventech.com</li>
                            <li>Phone: +880 1234-567890</li>
                            <li>Address: Dhaka, Bangladesh</li>
                        </ul>
                    </section>

                    {/* Last Updated */}
                    <section className="pt-8 text-sm text-gray-500 dark:text-gray-400">
                        <p>Last updated: October 24, 2025</p>
                        <p className="mt-2">We reserve the right to update this Privacy Policy at any time.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;