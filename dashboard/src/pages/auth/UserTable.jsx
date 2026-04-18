import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "../utility/GenericTable";
import { getUsers } from "../../redux/auth/authSlice";

const UserTable = () => {
  const dispatch = useDispatch();

  const { users, pagination, loading } = useSelector((state) => state.auth);

  // 🔥 fetchData function (used by GenericTable)
  const fetchData = async ({ search, page }) => {
    await dispatch(
      getUsers({
        search,
        page,
        limit: 10, // match backend
      })
    );
  };

  // Optional: first load
  useEffect(() => {
    fetchData({ search: "", page: 1 });
  }, []);

  const columns = [
    { label: "Name", field: "fullname" },
    { label: "Email", field: "email" },
    { label: "Role", field: "role" },
    { label: "Mobile No", field: "mobileno" },
    { label: "Created At", field: "createdAt" },
    { label: "Updated At", field: "updatedAt" },
  ];

  return (
    <div>
      <GenericTable
        title="Users"
        columns={columns}
        fetchData={fetchData}
        data={users}
        total={pagination?.total || 0}
        limit={pagination?.limit || 10}
        showExport={true}
        onExport={() => console.log("Export clicked")}
      />
    </div>
  );
};

export default UserTable;