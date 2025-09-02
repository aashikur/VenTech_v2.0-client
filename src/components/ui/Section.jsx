import React from 'react';
import SectionTitle from './SectionTitle';
import { Button3 } from './Button';

const Section = ({ id, title, subtitle, children, className, viewAll = "View All" }) => {
    return (
        <section id={id} className={`w-full pb-18 text-gray-700 relative dark:text-gray-300  ${className}`}>
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 relative">
                {/* Hero Header */}
                <SectionTitle
                    topText={subtitle}
                    title={title}
                    subtitle="Education, community stories, and updates from the VenTech team."
                    viewAll={viewAll}
                />
                <div>
                    {children}
                </div>
            </div>

            {viewAll &&
                <div className="relative flex justify-center mt-10">
                    <Button3 className="px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90 transition-all">
                        {viewAll}
                    </Button3>
                </div>
            }
        </section>
    );
};

export default Section;