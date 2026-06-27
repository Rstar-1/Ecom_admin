import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Map current pathname to display title dynamically
    const getTitle = () => {
        switch (location.pathname) {
            case "/dashboard":
                return "Dashboard";
            case "/analytics":
                return "Web Analytics";
            case "/management/product":
                return "Products";
            case "/management/cms":
                return "Content Management";
            case "/builder/meta":
                return "SEO Metadata";
            case "/builder/json":
                return "JSON Config";
            case "/management/ai":
                return "AI Integrations";
            case "/users":
                return "System Users";
            case "/customers":
                return "Clients";
            default:
                return "Products";
        }
    };

    return (
        <div className="w-full bg-white bordb">
            <div className="flex items-center justify-between p-12">
                <div className="flex items-center gap-12">
                    {/* Back Button */}
                    <div
                        onClick={() => navigate(-1)}
                        className="border-tertiary rounded-5 icon-lg cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--gray)" strokeWidth="2" fill="none" className="flex">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </div>

                    {/* Page Title */}
                    <h2 className="mid-text text-secondary font-500">
                        {getTitle()}
                    </h2>
                </div>

                {/* Right Side: Health Score & Action Buttons */}
                <div className="flex items-center gap-6">
                    {/* Store Health Score Pill */}
                    <div className="border-tertiary rounded-5 bg-forth px-12 py-3 flex items-center gap-8">
                        <span className="mini-text text-gray uppercase font-600 tracking-wider">
                            Store Health Score
                        </span>
                        {/* Green Dot */}
                        <svg viewBox="0 0 24 24" width="8" height="8" fill="var(--success)" className="flex">
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <span className="small-text text-success font-700">
                            98.6%
                        </span>
                    </div>

                    {/* Help Button */}
                    <div className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>

                    {/* Dark Mode Button */}
                    <div className="border-tertiary rounded-5 bg-white p-8 flex items-center justify-center cursor-pointer text-gray hover-text-dark">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
