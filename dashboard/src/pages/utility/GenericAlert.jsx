import React from "react";

const GenericAlert = ({
  isOpen = false,
  type = "info",
  message = "",
  position = "top-right",
  onClose = () => {},
}) => {
  if (!isOpen) return null;


  const typeClasses = {
    success: "bg-success text-white",
    error: "bg-danger text-white",
    warning: "bg-warning text-black",
    info: "bg-info text-white",
  };

  const icons = {
    success: "✔",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div
      className="absolute right-0 bottom-0 p-10"
    >
      <div
        className={`
          px-12 py-10 rounded-5 shadow-lg
          flex items-center justify-between gap-10
          ${typeClasses[type]}
        `}
      >
        {/* Left */}
        <div className="flex items-center gap-8">
          <span>{icons[type]}</span>
          <p className="small-text">{message}</p>
        </div>

         <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="flex text-white cursor-pointer"
              onClick={onClose}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
      </div>
    </div>
  );
};

export default GenericAlert;