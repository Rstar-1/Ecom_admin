import React from "react";

const GenericPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNeighbours = 2;

    const getPageNumbers = () => {
        const totalNumbers = pageNeighbours * 2 + 1; // current + neighbours
        const totalBlocks = totalNumbers + 2; // adding first and last page

        if (totalPages > totalBlocks) {
            let startPage = Math.max(2, currentPage - pageNeighbours);
            let endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            const pages = [];

            // Add left ellipsis
            if (startPage > 2) pages.push("LEFT_ELLIPSIS");
            // Add page numbers
            for (let i = startPage; i <= endPage; i++) pages.push(i);
            // Add right ellipsis
            if (endPage < totalPages - 1) pages.push("RIGHT_ELLIPSIS");

            // Always include first and last page
            return [1, ...pages, totalPages];
        }

        // Less pages than total blocks, show all
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    };

    const pageNumbers = getPageNumbers();

    const buttonStyle = {
        border: "1px solid #ddd",
        width: "32px",
        padding: '0px',
        height: "32px",
        margin: "0 3px",
        borderRadius: "10%",
        cursor: "pointer",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'10px',
        background:'#fff'
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#007bff",
        color: "#fff",
        borderColor: "#007bff",
    };

    return (
        <div style={{ display: "flex", justifyContent: "end", marginTop: "15px", flexWrap: "wrap" }}>
            <button
                style={buttonStyle}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="gray" strokeWidth="2" fill="none" style={{display:'flex'}}><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            {pageNumbers.map((page, index) => {
                if (page === "LEFT_ELLIPSIS" || page === "RIGHT_ELLIPSIS") {
                    return (
                        <span key={index} style={{ padding: "2px 10px", margin: "0 3px" }}>
                            ...
                        </span>
                    );
                }
                return (
                    <button
                        key={index}
                        style={currentPage === page ? activeButtonStyle : buttonStyle}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                style={buttonStyle}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
               <svg viewBox="0 0 24 24" width="18" height="18" stroke="gray" strokeWidth="2" fill="none" style={{display:'flex'}}><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>
    );
};

export default GenericPagination;