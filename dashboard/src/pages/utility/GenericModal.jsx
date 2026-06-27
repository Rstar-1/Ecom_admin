import React from "react";

const GenericModal = ({
  isOpen = false,
  onClose = () => {},
  title = "Modal",
  children,
  width = "w-45",
  bodyHeight = "h-450",
  showCloseIcon = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 inset-0 z-99 bg-white w-full h-100 bg-transparent">
      <div className={`absolute center-absolute bg-white ${width} rounded-5 overflow-hidden`}>
        
        <div className="flex justify-between items-center p-10 bg-primary">
          <h6 className="mid-text text-white capitalize font-500">
            {title}
          </h6>

          {showCloseIcon && (
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="flex text-white cursor-pointer"
              onClick={onClose}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </div>

        <div className={`${bodyHeight} overflow-auto`}>
          <div className="p-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;