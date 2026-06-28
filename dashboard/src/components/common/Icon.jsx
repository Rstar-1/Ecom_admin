import React from "react";

const Icon = ({ name, className = "", width, height, strokeWidth, ...props }) => {
    const defaultWidth = width || "14";
    const defaultHeight = height || "15";
    const defaultStrokeWidth = strokeWidth || "2";

    switch (name) {
        case "Dashboard":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            );
        case "Management":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
            );
        case "Product":
        case "Product List":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            );
        case "Github":
        case "GitHub":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            );
        case "CMS":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="3" x2="12" y2="21"></line>
                </svg>
            );
        case "AI":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
            );
        case "Meta":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                </svg>
            );
        case "Json":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            );
        case "Builder":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            );
        case "Google Analytic":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            );
        case "Task Manager":
        case "Inventory":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="13" x2="15" y2="13"></line>
                    <line x1="9" y1="17" x2="15" y2="17"></line>
                </svg>
            );
        case "Reviews":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            );
        case "Orders":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
            );
        case "Analytic":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            );
        case "ChevronRight":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            );
        case "ChevronLeft":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            );
        case "Filter":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
            );
        case "MoreVertical":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
            );
        case "Users":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            );
        case "Customers":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            );
        case "Settings":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            );
        case "Reports":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" className={`flex ${className}`} {...props}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            );
        case "Lock":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
            );
        case "Unlock":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
            );
        case "Star":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
            );
        case "Search":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            );
        case "Spinner":
        case "Loading":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} style={{ animation: "spin 1.2s linear infinite", ...props.style }} {...props}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--primary)" />
                </svg>
            );
        case "Edit":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            );
        case "Trash":
        case "Delete":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            );
        case "Layers":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            );
        case "ChevronRight":
            return (
                <svg viewBox="0 0 24 24" width={defaultWidth} height={defaultHeight} stroke="currentColor" strokeWidth={defaultStrokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" className={`flex ${className}`} {...props}>
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            );
        default:
            return null;
    }
};

export default Icon;
