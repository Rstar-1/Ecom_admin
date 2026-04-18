import React from "react";

const GenericContainer = ({
  children,
  version = "v1",
  className = "",
  style = {},
}) => {
  const getContainerClass = () => {
    switch (version) {
      case "v0":
        return "w-full";
      case "v1":
        return "container mx-auto";
      case "v2":
        return "container2";
      case "v3":
        return "px-10 py-10";
      default:
        return "w-full";
    }
  };

  return (
    <div className={`${getContainerClass()} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GenericContainer;
