import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../common/Container";
import Icon from "../common/Icon";
import menuData from "../../data/MenuData.json";

// Icons
const ChevronIcon = () => (
    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
        <polyline points="8 9 12 5 16 9"></polyline>
        <polyline points="16 15 12 19 8 15"></polyline>
    </svg>
);

const SidebarLink = ({ to, label, iconName, shortcut, isCollapsed }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <NavLink
            to={to}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={({ isActive }) =>
                `flex items-center rounded-5 headmini-text font-500 list-none ${isCollapsed ? "justify-center p-8" : "justify-between p-10"
                } mb-2 ${isActive ? "bg-forth text-dark" : (hovered ? "bg-forth text-dark" : "text-gray")
                }`
            }
        >
            <div className="flex items-center gap-2">
                {iconName && (
                    <div className="icon relative flex items-center justify-center">
                        <Icon name={iconName} />
                    </div>
                )}
                {!isCollapsed && <span>{label}</span>}
            </div>
            {!isCollapsed && shortcut && (
                <span className="py-2 px-5 rounded-5 bg-white border-tertiary text-gray mini-text">
                    {shortcut}
                </span>
            )}
        </NavLink>
    );
};

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const [profileHovered, setProfileHovered] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    // Clear search query if sidebar gets collapsed
    React.useEffect(() => {
        if (isCollapsed) {
            setSearchQuery("");
        }
    }, [isCollapsed]);

    // Filter menu items based on the search query
    const filteredMenu = React.useMemo(() => {
        if (!searchQuery.trim()) return menuData;
        const query = searchQuery.toLowerCase();

        return menuData
            .map((item) => {
                const hasSubcategories = item.category && item.category.length > 0;
                if (!hasSubcategories) {
                    const matches = item.name.toLowerCase().includes(query);
                    return matches ? item : null;
                }

                // Filter nested subcategories
                const filteredSubcategories = item.category.filter((subItem) =>
                    subItem.name.toLowerCase().includes(query)
                );

                const categoryMatches = item.name.toLowerCase().includes(query);

                if (categoryMatches || filteredSubcategories.length > 0) {
                    return {
                        ...item,
                        // If parent matches but no subcategories matched, show all.
                        // Otherwise, show only the matching subcategories.
                        category: filteredSubcategories.length > 0 ? filteredSubcategories : item.category
                    };
                }

                return null;
            })
            .filter(Boolean);
    }, [searchQuery]);

    return (
        <Container version="v0" className="h-100 bg-white overflow-auto">
            {/* Header */}
            <div className={`pt-16 pb-10 flex items-center ${isCollapsed ? "justify-center px-8" : "justify-between px-16"}`}>
                <div className="flex items-center gap-8">
                    <div
                        className="bg-secondary icon-lg rounded-5 cursor-pointer"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        <p className="text-white font-500 headpara-text">B</p>
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h3 className="headmini-text text-secondary font-600 uppercase">BaraSingha</h3>
                            <p className="mini-text text-gray">Admin</p>
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <div className="text-gray cursor-pointer" onClick={() => setIsCollapsed(true)}>
                        <ChevronIcon />
                    </div>
                )}
            </div>

            {/* Search Bar / Icon */}
            <div className={isCollapsed ? "px-8 pb-12 flex justify-center" : "px-16 pb-12"}>
                {isCollapsed ? (
                    <div className="icon flex items-center justify-center bg-forth rounded-5 cursor-pointer p-6" onClick={() => setIsCollapsed(false)}>
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                ) : (
                    <div className="relative overflow-hidden rounded-5">
                        <div className="p-12 absolute top-0 right-0 bg-forth z-10">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-0 bg-forth w-full h-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Navigation Links */}
            <div className={`overflow-auto ${isCollapsed ? "px-8" : "px-16"}`}>
                {filteredMenu.map((item, idx) => {
                    if (!item.status) return null;

                    if (!item.route && item.category && item.category.length > 0) {
                        return (
                            <React.Fragment key={idx}>
                                {!isCollapsed ? (
                                    <div className="flex items-center justify-between mt-10 mb-8">
                                        <p className="mini-text text-gray font-600">{item.name}</p>
                                    </div>
                                ) : (
                                    <hr className="border-0 bg-tertiary mt-12 mb-10" style={{ height: '1px' }} />
                                )}
                                {item.category.map((subItem, subIdx) => {
                                    if (!subItem.status) return null;
                                    return (
                                        <SidebarLink
                                            key={subIdx}
                                            to={subItem.route}
                                            label={subItem.name}
                                            iconName={subItem.icon}
                                            isCollapsed={isCollapsed}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        );
                    }
                    const shortcut = item.name === "Dashboard" ? "⌘" : null;

                    return (
                        <SidebarLink
                            key={idx}
                            to={item.route}
                            label={item.name}
                            iconName={item.icon}
                            shortcut={shortcut}
                            isCollapsed={isCollapsed}
                        />
                    );
                })}
            </div>

            {/* Profile Footer */}
            <div className={`bg-white mt-5 ${isCollapsed ? "px-8" : "px-16"}`}>
                <hr className="border-0 bg-tertiary" style={{ height: '1px' }} />
                <NavLink
                    to="/profile"
                    onMouseEnter={() => setProfileHovered(true)}
                    onMouseLeave={() => setProfileHovered(false)}
                    className={`flex items-center rounded-5 ${profileHovered ? "bg-forth" : ""} ${isCollapsed ? "justify-center p-6" : "justify-between p-10"
                        }`}
                >
                    <div className="flex items-center gap-8">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                            alt="Sandra Marx"
                            className="rounded-full common-img object-cover"
                        />
                        {!isCollapsed && (
                            <div>
                                <h4 className="headmini-text text-dark font-600">Sandra Marx</h4>
                                <p className="mini-text text-gray">sandra@gmail.com</p>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="text-gray">
                            <ChevronIcon />
                        </div>
                    )}
                </NavLink>
            </div>
        </Container>
    );
};

export default Sidebar;