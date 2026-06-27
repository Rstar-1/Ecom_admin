import React, { useEffect, useState, useRef } from "react";
import Pagination from "./Pagination";
import GenericButton from "./Button";

const TableRow = ({ row, columns, variant }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <tr
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? "var(--forth)" : "transparent",
                transition: "background-color 0.15s ease",
            }}
        >
            {columns.map((col) => (
                <td
                    key={col.field}
                    className={
                        variant === "clean"
                            ? `py-10 px-4 bordb mini-text text-dark ${col.align === "right" ? "text-right" : "text-left"}`
                            : `p-12 bordb mini-text text-dark ${col.align === "right" ? "text-right" : "text-left"}`
                    }
                    style={{
                        maxWidth: "220px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {row[col.field]}
                </td>
            ))}
        </tr>
    );
};

const Table = ({
    columns = [],
    fetchData,
    data = [],
    total = 0,
    limit = 20,
    title,
    showExport = false,
    onExport,
    variant = "primary",
}) => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(t);
    }, [search]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }

        const load = async () => {
            setLoading(true);
            await fetchData?.({ search: debouncedSearch, page });
            setLoading(false);
        };

        load();
    }, [debouncedSearch, page]);

    const formattedData = (data || []).map((item) =>
        Object.fromEntries(
            columns.map((col) => [
                col.field,
                item[col.field] ?? item[col.field?.toLowerCase()] ?? "-",
            ]),
        ),
    );

    return (
        <>
            <div className="table-w bg-white rounded-5 overflow-hidden">
                <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr className={variant === "clean" ? "bordb" : "bg-primary text-white"}>
                            {columns.map((col) => (
                                <th
                                    key={col.field}
                                    className={
                                        variant === "clean"
                                            ? `mini-text font-600 text-gray py-8 px-4 border-0 ${col.align === "right" ? "text-right" : "text-left"}`
                                            : `bg-primary text-white mini-text font-600 p-12 border-0 ${col.align === "right" ? "text-right" : "text-left"}`
                                    }
                                    style={{
                                        maxWidth: "220px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="p-40 text-center mini-text text-gray bg-light-primary"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : formattedData.length ? (
                            formattedData.map((row, i) => (
                                <TableRow key={row.id || i} row={row} columns={columns} variant={variant} />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="p-40 text-center mini-text text-gray bg-light-danger"
                                >
                                    No Records Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {total > limit && (
                <div className="mt-16">
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil(total / limit)}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </>
    );
};

export default Table;
