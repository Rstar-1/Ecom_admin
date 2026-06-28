import React from "react";
import Pagination from "./Pagination";
import Icon from "./Icon";

const Table = ({
    title,
    subtitle,
    headerSub,
    data = [],
    columns = [],
    totalItems = 0,
    itemsPerPage = 10,
    page = 1,
    onPageChange,
    searchQuery = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    showControls = true,
    itemName = "items",
    loading = false
}) => {
    const subText = subtitle || headerSub;
    return (
        <>
            {(title || (showControls && onSearchChange)) && (
                <div className="flex items-center">
                    {title && (
                        <div className="w-70">
                            <h2 className="mid-text text-dark font-500">
                                {title}
                            </h2>
                            {subText && <p className="text-gray font-400 mini-text mt-1">{subText}</p>}
                        </div>
                    )}
                    {showControls && onSearchChange && (
                        <div className="w-30">
                            <div className="relative w-full overflow-hidden rounded-5 border-ec">
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    className="text-dark bg-white h-input mini-text border-0 w-full"
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                />
                                <span className="absolute top-0 right-0 bg-white py-10 px-14 text-gray">
                                    <Icon name="Search" width="16" height="16" strokeWidth="2.5" />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="table-w rounded-5 mt-12 bordl bordr" style={{ overflowX: "auto" }}>
                <table className="w-full" style={{ borderCollapse: "collapse", minWidth: "1100px" }}>
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    style={{
                                        ...col.style
                                    }}
                                    className={`bg-primary p-14 capitalize ${col.className || ""}`}
                                >
                                    <p className={`mini-text text-white font-500 ${col.className?.includes("text-center") ? "text-center" : col.className?.includes("text-right") ? "text-right" : "text-left"}`} >{col.header}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="p-14 text-center text-gray">
                                    <div className="flex items-center justify-center gap-8 py-12">
                                        <Icon name="Spinner" width="18" height="18" strokeWidth="2.5" />
                                        Loading...
                                    </div>
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div className="py-40 text-center bordb">
                                        <p className="head-text text-gray">🔍</p>
                                        <p className="text-gray small-text mt-7">No data found .</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIdx) => (
                                <tr key={row._id || row.id || rowIdx}>
                                    {columns.map((col, colIdx) => {
                                        const cellValue = col.accessor ? row[col.accessor] : undefined;
                                        let cellContent = cellValue;
                                        if (col.render) {
                                            cellContent = col.render(row, rowIdx);
                                        } else if (col.ui && !React.isValidElement(cellValue)) {
                                            if (col.ui === "profile") {
                                                const name = row[col.accessor] || row["username"] || row["name"] || "";
                                                const subText = row[col.subKey || "sub"] || row[col.emailKey || "email"] || row["email"] || row["sub"] || "";
                                                const imgUrl = row[col.imageKey || "image"] || row["image"] || row["avatar"] || "";
                                                const favColor = row[col.colorKey || "favoriteColor"] || "#6366f1";
                                                const initial = name ? name.charAt(0).toUpperCase() : "?";
                                                const imgStyle = { width: "40px", height: "40px", flexShrink: 0, ...col.imgStyle, ...col.imageStyle };
                                                cellContent = (
                                                    <div className="flex items-center gap-12">
                                                        {imgUrl ? (
                                                            <img src={imgUrl} alt={name} className="common-img rounded-5 object-cover border-tertiary" style={imgStyle} />
                                                        ) : (
                                                            <div style={{ background: favColor, width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0 }} className="center-div">
                                                                <p className="small-text text-white" style={{ margin: 0, fontWeight: 600 }}>{initial}</p>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="text-dark small-text font-500" style={{ margin: 0 }}>{name}</p>
                                                            {subText && <p className="text-gray mini-text font-500" style={{ margin: 0 }}>{subText}</p>}
                                                        </div>
                                                    </div>
                                                );
                                            } else if (col.ui === "arr-badge") {
                                                const arr = Array.isArray(cellValue) ? cellValue : [];
                                                cellContent = (
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        {arr.map((val, idx) => (
                                                            <p key={idx} className="bg-light-primary text-primary mini-text capitalize px-10 py-4 rounded-5 font-500" style={{ margin: 0 }}>
                                                                {val}
                                                            </p>
                                                        ))}
                                                    </div>
                                                );
                                            } else if (col.ui === "status") {
                                                const isActive = !!cellValue;
                                                const statusColor = isActive ? "#10b981" : "#ef4444";
                                                const textColorClass = isActive ? "text-success" : "text-danger";
                                                const label = typeof cellValue === "string" ? cellValue : (isActive ? "Active" : "Inactive");
                                                cellContent = (
                                                    <div className="flex items-center gap-6">
                                                        <div style={{
                                                            width: "6px", height: "6px", borderRadius: "50%",
                                                            background: statusColor,
                                                            boxShadow: `0 0 6px ${statusColor}`
                                                        }}></div>
                                                        <p className={`${textColorClass} small-text font-500`} style={{ margin: 0 }}>
                                                            {label}
                                                        </p>
                                                    </div>
                                                );
                                            } else if (col.ui === "badge") {
                                                let badgeBg = "#f1f5f9";
                                                let badgeColor = "#475569";
                                                const valStr = String(cellValue || "").toLowerCase();
                                                if (valStr === "admin") {
                                                    badgeBg = "#fee2e2";
                                                    badgeColor = "#991b1b";
                                                } else if (valStr === "user" || valStr === "member" || valStr === "public") {
                                                    badgeBg = "#dcfce3";
                                                    badgeColor = "#166534";
                                                } else {
                                                    badgeBg = "#eff6ff";
                                                    badgeColor = "#3b82f6";
                                                }
                                                cellContent = (
                                                    <span style={{
                                                        background: badgeBg,
                                                        color: badgeColor,
                                                        display: "inline-flex"
                                                    }} className="mini-text capitalize px-10 py-4 rounded-20 font-500">
                                                        {cellValue}
                                                    </span>
                                                );
                                            } else if (col.ui === "icon-badge") {
                                                const rawVal = col.accessor ? row[col.accessor] : "";
                                                const valStr = String(rawVal || cellValue || "").toLowerCase();
                                                const isPrivate = valStr === "private" || valStr === "protected" || valStr === "closed";
                                                const isRating = col.accessor === "rating" || col.icon === "Star" || col.iconName === "Star";
                                                const iconName = col.icon || col.iconName || (isRating ? "Star" : (isPrivate ? "Lock" : "Unlock"));
                                                const badgeBg = col.badgeBg || (isRating ? "#fef3c7" : (isPrivate ? "#fee2e2" : "#eff6ff"));
                                                const badgeColor = col.badgeColor || (isRating ? "#b45309" : (isPrivate ? "#991b1b" : "#3b82f6"));
                                                cellContent = (
                                                    <span
                                                        className="flex items-center gap-6 mini-text capitalize px-10 py-4 rounded-20 font-500"
                                                        style={{
                                                            display: "inline-flex",
                                                            backgroundColor: badgeBg,
                                                            color: badgeColor
                                                        }}
                                                    >
                                                        <Icon name={iconName} width="12" height="12" strokeWidth="2.5" />
                                                        {cellValue}
                                                    </span>
                                                );
                                            } else if (col.ui === "text") {
                                                cellContent = (
                                                    <p className="text-gray mini-text" style={{ margin: 0 }}>
                                                        {cellValue || "-"}
                                                    </p>
                                                );
                                            } else if (col.ui === "desc") {
                                                cellContent = (
                                                    <p className="text-gray line-clamp1 mini-text" title={cellValue || ""} style={{ margin: 0 }}>
                                                        {cellValue || "-"}
                                                    </p>
                                                );
                                            }
                                        }
                                        return (
                                            <td
                                                key={colIdx}
                                                style={{
                                                    verticalAlign: "middle",
                                                    ...col.style
                                                }}
                                                className={`p-14 text-dark bordb ${col.className || ""}`}
                                            >
                                                {cellContent}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {onPageChange && totalItems > itemsPerPage && (
                <Pagination
                    page={page}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={onPageChange}
                    itemName={itemName}
                />
            )}
        </>
    );
};

export default Table;