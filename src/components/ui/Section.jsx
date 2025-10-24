import React from 'react';
import SectionTitle from './SectionTitle';
import { Button3 } from './Button';
import { Link } from 'react-router';

const Section = ({ id, title, topText, subtitle, children, viewAllLink ='/', className, viewAll = "View All", noTitle = true }) => {
    return (
        <section id={id} className={`w-full pb-18 text-gray-700 relative dark:text-gray-300  ${className}`}>
            <div className="mx-auto max-w-[1440px] px-4 md:px-6 py-12 relative">
                {/* Hero Header */}
                {noTitle && <SectionTitle
                    topText={topText}
                    title={title}
                    subtitle={subtitle}
                    viewAll={viewAll}
                    viewAllLink={viewAllLink}
                />}
                <div>
                    {children}
                </div>
            </div>

            {viewAll != false &&
                <div className="relative flex justify-center mt-10">
                  <Link to={viewAllLink}>
                    <Button3 className="px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90 transition-all">
                        {viewAll}
                    </Button3>
                  </Link>
                </div>
            }
        </section>
    );
};

export default Section;