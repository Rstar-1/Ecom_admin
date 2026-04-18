import React, { useState } from "react";

const GenericTabs = ({ tabs = [], count= 0, defaultIndex = 0 }) => {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div>
      {/* Tab Header */}
      <div className={`grid-cols-${count} gap-12 items-center gap-3`}>
        {tabs.map((tab, i) => (
          <p
            key={i}
            onClick={() => setActive(i)}
            className={`small-text text-center uppercase font-500 px-12 py-9 rounded-5 cursor-pointer ${
              active === i
                ? "bg-primary text-white"
                : "bg-white text-gray"
            }`}
          >
            {tab.label}
          </p>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-10">{tabs[active]?.content}</div>
    </div>
  );
};

export default GenericTabs;