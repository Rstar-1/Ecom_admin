import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const SaleMonitoring = lazy(() => import("../pages/dashboard/SaleMonitoring"));
const CustomerMonitoring = lazy(() => import("../pages/dashboard/CustomerMonitoring"));
const Analytics = lazy(() => import("../pages/dashboard/Analytics"));
const Management = lazy(() => import("../pages/dashboard/Management"));
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const Profile = lazy(() => import("../pages/auth/Profile"));
const UserTable = lazy(() => import("../pages/auth/UserTable"));

// New components
const Product = lazy(() => import("../pages/dashboard/Product"));
const CMS = lazy(() => import("../pages/dashboard/CMS"));
const AI = lazy(() => import("../pages/dashboard/AI"));
const Meta = lazy(() => import("../pages/dashboard/Meta"));
const Json = lazy(() => import("../pages/dashboard/Json"));
const TaskManager = lazy(() => import("../pages/dashboard/TaskManager"));
const Reports = lazy(() => import("../pages/dashboard/Reports"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));

function AppRoutes() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-100">
        <p className="text-center para-text text-gray">Loading…</p>
      </div>
    }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="monitoring/sales" element={<SaleMonitoring />} />
          <Route path="monitoring/customers" element={<CustomerMonitoring />} />
          <Route path="customers" element={<CustomerMonitoring />} />
          <Route path="management/product" element={<Product />} />
          <Route path="management/cms" element={<CMS />} />
          <Route path="management/ai" element={<AI />} />
          <Route path="builder/meta" element={<Meta />} />
          <Route path="builder/json" element={<Json />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="task/manager" element={<TaskManager />} />
          <Route path="users" element={<UserTable />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
