import React, { useState } from "react";
import Container from "../common/Container";
import Button from "../common/Button";
import Tab from "../common/Tab";

// Sub-component for rendering Category list items with hover and active states
const CategoryItem = ({ cat, selectedItem, onClick, isCollapsed }) => {
  const [hovered, setHovered] = useState(false);
  const isActive = selectedItem === cat.name;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`flex items-center rounded-5 cursor-pointer ${isCollapsed ? "justify-center py-10" : "justify-between p-12"
        } ${isActive
          ? "bg-forth text-dark font-600"
          : (hovered ? "bg-forth text-dark font-500" : "text-gray font-500")
        }`}
      title={isCollapsed ? cat.name : ""}
    >
      <div className="flex items-center gap-8">
        <div
          className="flex items-center justify-center rounded-5"
          style={{
            backgroundColor: cat.color || "#1e74db",
            width: "24px",
            height: "24px",
          }}
        >
          <p className="small-text text-white font-500">{cat.name.charAt(0).toUpperCase()}</p>
        </div>
        {!isCollapsed && <p className="small-text">{cat.name}</p>}
      </div>
      {!isCollapsed && typeof cat.count === "number" && (
        <p className={`mini-text ${isActive ? "text-secondary font-500" : "text-gray"}`}>
          {cat.count.toLocaleString()}
        </p>
      )}
    </div>
  );
};

const Structure = ({
  sidebarTitle = "Categories",
  sidebarItems = [],
  selectedSidebarItem = "",
  onSidebarItemClick = () => {},
  
  headerIcon,
  headerTitle,
  headerSub,
  quickAction,
  
  showTabControls = true,
  tabs = [],
  activeTab = "",
  onTabChange = () => {},
  
  filterDescription = "",
  hasActiveFilters = false,
  onClearAllFilters = () => {},
  filterInputs = null,
  
  children
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Container version="v0">
      <div className="flex w-full items-start">
        {/* Left Sidebar */}
        <div
          className={`${isSidebarCollapsed ? "w-5" : "w-20"} bg-white p-10 bordr sticky top-0 h-page overflow-hidden`}
          style={{
            transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            flexShrink: 0,
            minWidth: isSidebarCollapsed ? "60px" : "240px"
          }}
        >
          {isSidebarCollapsed ? (
            <div className="flex justify-center items-center mt-6 mb-12">
              <Button
                onClick={() => setIsSidebarCollapsed(false)}
                bg="forth"
                color="gray"
                colorHover="dark"
                className="rounded-5"
                style={{
                  width: "28px",
                  height: "28px",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title={`Expand ${sidebarTitle}`}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-6 mb-12">
              <p className="small-text text-dark font-500 uppercase">{sidebarTitle}</p>
              <Button
                onClick={() => setIsSidebarCollapsed(true)}
                bg="forth"
                color="gray"
                colorHover="dark"
                className="rounded-5"
                style={{
                  width: "28px",
                  height: "28px",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title={`Collapse ${sidebarTitle}`}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </Button>
            </div>
          )}

          {/* Sidebar Items */}
          <div className="grid gap-4">
            {sidebarItems.map((item, idx) => (
              <CategoryItem
                key={idx}
                cat={item}
                selectedItem={selectedSidebarItem}
                onClick={() => onSidebarItemClick(item.name)}
                isCollapsed={isSidebarCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={isSidebarCollapsed ? "w-95" : "w-80"}
          style={{
            transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            minWidth: 0
          }}
        >
          {/* Sticky Header Section */}
          <div className="sticky top-0 left-0 w-full z-10">
            <div className="flex items-center justify-between bg-white p-16 bordb">
              <div className="flex items-center gap-12">
                {headerIcon && (
                  <div className="bg-light-primary text-primary rounded-5 p-12 flex items-center justify-center">
                    {headerIcon}
                  </div>
                )}
                <div>
                  <h2 className="mid-text text-dark font-500">{headerTitle}</h2>
                  {headerSub && (
                    <p className="mini-text text-gray mt-2">{headerSub}</p>
                  )}
                </div>
              </div>

              {quickAction && (
                <div className="text-right">
                  {quickAction}
                </div>
              )}
            </div>

            {/* Tabs and Filters Row */}
            {showTabControls && (
              <div className="bg-white bordb">
                <Tab
                  tabs={tabs}
                  activeTab={activeTab}
                  onChange={onTabChange}
                />

                {activeTab !== "Analytic" && (filterDescription || filterInputs || hasActiveFilters) && (
                  <div>
                    <div className="flex items-center justify-between py-12 px-12 bg-white">
                      <p className="small-text text-gray">
                        {filterDescription}
                      </p>
                      <div className="flex items-center gap-8">
                        {filterInputs && (
                          <Button
                            text={showFilters ? "Hide Filters" : "Show Filters"}
                            version="v2"
                            bg={showFilters ? "secondary" : "white"}
                            color={showFilters ? "white" : "secondary"}
                            border="secondary"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-4"
                          >
                            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex mr-4">
                              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                            {showFilters ? "Hide Filters" : "Filters"}
                          </Button>
                        )}
                        {hasActiveFilters && (
                          <Button
                            text="Clear All"
                            version="v2"
                            bg="white"
                            color="danger"
                            border="danger"
                            onClick={onClearAllFilters}
                          />
                        )}
                      </div>
                    </div>

                    {/* Collapsible Filters UI */}
                    {showFilters && filterInputs && (
                      <div className="bg-forth border-t border-b p-16 gap-16" style={{ transition: "all 0.3s ease" }}>
                        {filterInputs}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Children Content Area */}
          <div className="p-12">
            {children}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Structure;
