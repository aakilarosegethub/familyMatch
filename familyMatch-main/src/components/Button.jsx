// components/Button.jsx
import React from "react";

// ✅ Utility function for conditional class names
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

// ✅ Variant styles
const variantClasses = {
    primary: "border-2 border-white bg-[#CD185B] text-white px-8 rounded-3xl hover:border-[#AE2456]",
    secondary: "border-2 border-white rounded-3xl text-white hover:opacity-70",
    outline: "border border-gray-400 text-gray-600 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
    cancel: "bg-gray-100 text-gray-600 rounded-3xl hover:bg-gray-200 border border-gray-300 focus:outline-none",
};

// ✅ Reusable Button Component
function Button({
    children,
    variant = "primary",
    isLoading = false,
    icon: Icon,
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            disabled={isLoading || disabled}
            className={cn(
                "inline-flex items-center justify-center px-8 py-2 text-sm font-bold transition-all duration-200",
                variantClasses[variant],
                (isLoading || disabled) && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {isLoading && (
                <span className="loader mr-2" />
            )}
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {children}
        </button>
    );
}

export default Button;