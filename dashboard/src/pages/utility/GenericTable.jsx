import React, { useEffect, useState, useRef } from "react";
import Pagination from "./GenericPagination";

const GenericTable = ({
  columns = [],
  fetchData,
  data = [],
  total = 0,
  limit = 20,
  title,
  showExport = false,
  onExport,
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
    <div className="p-16 border bg-white rounded-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h4 className="title-text text-dark font-500">{title}</h4>
          <p className="small-text text-gray">
            Total Counts: <b className="text-primary">{total}</b>
          </p>
        </div>

        <div className="flex justify-end w-60 items-center gap-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-input border-ec"
            style={{ width: "250px", borderRadius: "5px" }}
          />
          {showExport && (
            <button
              onClick={onExport}
              className="bg-primary px-20 py-7 rounded-5 text-white border-0"
            >
              Export Excel
            </button>
          )}
        </div>
      </div>

      <div className="table-w mt-12">
        <table>
          <thead>
            <tr style={{ background: "var(--primary)", color: "#fff" }}>
              {columns.map((col) => (
                <th key={col.field} style={thStyle}>
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
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    background: "#f9fafb",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : formattedData.length ? (
              formattedData.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.field} style={tdStyle}>
                      {row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "100px 20px",
                    background: "#f1f2f462",
                  }}
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {total > limit && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(total / limit)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

const thStyle = {
  border: "1px solid var(--primary)",
  padding: "7px 6px",
  fontSize: "13px",
  color: "#fff",
  fontWeight: 500,
  textAlign: "left",
  textTransform: "capitalize",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "6px",
  fontSize: "11px",
  fontWeight: 400,
  textTransform: "capitalize",
};

export default GenericTable;
