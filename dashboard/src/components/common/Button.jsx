import React, { useState } from "react";

const Button = ({
    text = "",
    children,
    version = "v1",
    bg = "primary",
    color = "white",
    className = "",
    style = {},
    onClick = () => { },
    type = "button",
    disabled = false,
    border = "",
    borderHover = "",
    bgHover = "",
    colorHover = "",
    ...rest
}) => {
    const [hovered, setHovered] = useState(false);

    const getButtonClass = () => {
        switch (version) {
            case "v0":
                return "px-16 py-5 mini-text rounded-5";
            case "v1":
                return "px-20 py-6 small-text rounded-5";
            case "v2":
                return "px-8 py-3 mini-text rounded-5";
            case "v3":
                return "w-full small-text py-8 justify-center rounded-5";
            case "icon":
            case "none":
            case "custom":
                return "rounded-5";
            default:
                return "w-full py-7 small-text rounded-5";
        }
    };

    const parseBorderValue = (val, activeColor) => {
        if (!val) return "";
        if (val === "border" || val === true) {
            return `border-${activeColor}`;
        }
        if (typeof val === "string" && val.startsWith("border-")) {
            return val;
        }
        return `border-${val}`;
    };

    // Determine state based on hover status
    const currentBg = hovered && bgHover ? bgHover : bg;
    const currentColor = hovered && colorHover ? colorHover : color;

    const activeBorderValue = hovered && borderHover ? borderHover : border;
    const borderClass = parseBorderValue(activeBorderValue, currentColor) || "border-0";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`${getButtonClass()} bg-${currentBg} text-${currentColor} cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${borderClass} ${className} flex`}
            style={style}
            {...rest}
        >
            {children || text}
        </button>
    );
};

export default Button;