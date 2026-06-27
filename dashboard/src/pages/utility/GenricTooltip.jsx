import React, { useState } from "react";

const GenericTooltip = ({
  children,
  text = "",
  position = "top",
  className = {},
}) => {
  const [show, setShow] = useState(false);

  const getPositionStyle = () => {
    switch (position) {
      case "top":
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return {};
    }
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      className={`${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <p
          style={{
            ...getPositionStyle(),
            whiteSpace: "nowrap",
            zIndex: 999,
          }}
          className="px-12 py-6 bg-gray text-white mini-text font-500 absolute rounded-5"
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default GenericTooltip;
