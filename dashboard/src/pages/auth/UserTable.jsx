import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/common/Table";
import { getUsers } from "../../redux/auth/authSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, pagination, loading } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(
      getUsers({
        search: searchQuery,
        page,
        limit: 10,
      })
    );
  }, [dispatch, page, searchQuery]);

  const columns = [
    { header: "Name", accessor: "fullname", ui: "text", style: { minWidth: "160px" } },
    { header: "Email", accessor: "email", ui: "text", style: { minWidth: "180px" } },
    { header: "Role", accessor: "role", ui: "badge", style: { minWidth: "100px" } },
    { header: "Mobile No", accessor: "mobileno", ui: "text", style: { minWidth: "130px" } },
    { header: "Created At", accessor: "createdAt", ui: "text", style: { minWidth: "140px" } },
    { header: "Updated At", accessor: "updatedAt", ui: "text", style: { minWidth: "140px" } },
  ];

  return (
    <div className="p-16">
      <Table
        title="Users"
        headerSub="System User Management"
        columns={columns}
        data={users || []}
        totalItems={pagination?.total || 0}
        itemsPerPage={pagination?.limit || 10}
        page={page}
        onPageChange={(p) => setPage(p)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setPage(1);
        }}
        searchPlaceholder="Search users..."
        showControls={true}
        loading={loading}
      />
    </div>
  );
};

export default UserTable;