import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-primary/10 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}