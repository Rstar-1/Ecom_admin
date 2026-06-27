import React, { useState } from "react";

const GenericAccordion = ({
  items = [],
  allowMultiple = false,
  defaultOpenIndexes = [],
}) => {
  const [openIndexes, setOpenIndexes] = useState(defaultOpenIndexes);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="grid-cols-1 gap-12">
      {items.map((item, i) => {
        const isOpen = openIndexes.includes(i);

        return (
          <div key={i} className="border rounded-5 overflow-hidden">
            {/* Header */}
            <div
              onClick={() => toggleItem(i)}
              className={`flex justify-between items-center px-12 py-9 cursor-pointer ${
                isOpen ? "bg-primary text-white" : "bg-white text-gray"
              }`}
            >
              <p className="small-text uppercase font-500">
                {item.label}
              </p>
              <span>{isOpen ? "-" : "+"}</span>
            </div>

            {/* Content */}
            {isOpen && (
              <div className="px-12 py-10 bg-white text-gray">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GenericAccordion;