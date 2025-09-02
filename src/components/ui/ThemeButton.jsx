import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ThemeButton = ({
    children = "Shop Now",
    onClick,
    className = "",
    variant = "primary"
}) => {
    // Base classes shared by all button variants
    const baseClasses = `
        flex items-center justify-center gap-2 
        h-12 cursor-pointer rounded-full
        text-sm sm:text-base font-semibold
        transition
    `;

    const variants = {
        primary: `
            ${baseClasses}
            bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
            text-white shadow-lg 
            hover:opacity-90
        `,
        outline: `
            ${baseClasses}
            border border-orange-500 
            text-orange-500 dark:text-white 
            dark:border-white/60
            hover:bg-orange-50 dark:hover:bg-gray-800
        `,
        text: `
            ${baseClasses}
            flex items-center justify-center gap-2 p-1 transition duration-300 text-sm sm:text-base font-medium 
            text-orange-500 dark:text-orange-400 hover:underline border-none
        `
    };

    return (
        <button 
            className={`${variants[variant]} ${className}`.trim()}
            onClick={onClick}
        >
            {children} {variant === "text" && <FaArrowRight className=" text-xs sm:text-sm" />}
        </button>
    );
};

export default ThemeButton;

