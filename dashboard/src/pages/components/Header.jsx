import React from "react";

const Header = () => {
  return (
    <div className="w-full sticky top-0 left-0 rounded-5 z-99 bg-tertiary">
      <div className="py-6">
        <div className="flex items-center justify-between py-5 px-12">
          <div className="flex items-center gap-10">
            <p className="text-gray font-500 small-text">Pages</p>
            <p className="text-gray small-text">/</p>
            <p className="text-dark small-text">Dashboard</p>
          </div>
          <div className="flex items-center gap-12">
            <div className="common-img bg-primary flex items-center justify-center rounded-full">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="flex text-white"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="common-img bg-forth flex items-center justify-center rounded-full">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="flex text-dark px-6"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div className="common-img bg-forth flex items-center justify-center rounded-full">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="flex text-dark"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
