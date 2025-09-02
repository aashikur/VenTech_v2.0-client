// SectionTitle.jsx
import React from "react";
import { Button3 } from "./Button";

const SectionTitle = ({
    topText = "Discover More",
    title = "Section Title",
    subtitle = "This is a short description about the section content.",
    viewAll,
}) => {
    return (
        <section className="w-full py-10 text-left relative flex items-center">
            <div className="flex-1">
                {/* Top Text */}
                {topText !== false && (
                    <p className="text-xs uppercase tracking-wider
          text-orange-500 dark:text-orange-400">
                        {topText || "Discover More"}
                    </p>
                )}

                {/* Title */}
                {title !== false && (
                    <h2
                        className="text-2xl md:text-4xl font-semibold
          bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
          bg-clip-text text-transparent"
                    >
                        {title || "Section Title"}
                    </h2>
                )}

                {/* Subtitle */}
                {subtitle !== false && (
                    <p className="max-w-2xl text-left text-sm leading-relaxed 
          text-gray-700 dark:text-gray-300">
                        {subtitle || "This is a short description about the section content."}
                    </p>
                )}
            </div>
            <div>
                {viewAll && <Button3> {viewAll}</Button3>}
            </div>
        </section>
    );
};

export default SectionTitle;
