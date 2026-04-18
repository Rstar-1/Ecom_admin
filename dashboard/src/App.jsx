import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const SaleMonitoring = lazy(() => import("./pages/dashboard/SaleMonitoring"));
const CustomerMonitoring = lazy(() => import("./pages/dashboard/CustomerMonitoring"));
const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const Management = lazy(() => import("./pages/dashboard/Management"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const Profile = lazy(() => import("./pages/auth/Profile"));
const UserTable = lazy(() => import("./pages/auth/UserTable"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-100">
          <p className="text-center para-text text-gray">Loading…</p>
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="monitoring/sales" element={<SaleMonitoring />} />
          <Route path="monitoring/customers" element={<CustomerMonitoring />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="management" element={<Management />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<UserTable />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
