import React from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
    href?: string;
    to?: string;
    icon?: React.ReactElement;
    text: string;
    ariaLabel?: string;
    isPrimary?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, to, icon, text, ariaLabel, isPrimary = false }) => {
    const baseClasses = "w-full flex items-center justify-center text-center p-4 rounded-lg font-semibold border-2 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4";
    const primaryClasses = "bg-red-500 border-red-600 text-white hover:bg-red-600 focus:ring-red-300/50";
    const secondaryClasses = "bg-gray-700/60 border-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400/50 backdrop-blur-sm";
    const commonProps = { 'aria-label': ariaLabel || text, className: `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}` };
    if (to) return (
        <Link to={to} {...commonProps}>
            {icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "mr-3 h-6 w-6" })} {text}
        </Link>
    );
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
            {icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "mr-3 h-6 w-6" })} {text}
        </a>
    );
};

export default LinkButton;