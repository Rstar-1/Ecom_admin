import React from "react";

const GenericBadge = ({
  text = "",
  bg = "primary",
  color = "white",
  size = "md",
  rounded = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-10 py-2 mini-text",
    md: "px-16 py-4 small-text",
    lg: "px-20 py-6 mid-text",
  };

  return (
    <span
      className={`
        inline-block
        ${sizeClasses[size]}
        ${rounded ? "rounded-20" : "rounded-5"}
        bg-${bg} text-${color}
        ${className}
      `}
    >
      {text}
    </span>
  );
};

export default GenericBadge;