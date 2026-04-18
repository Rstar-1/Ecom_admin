import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div className="p-10">
      <div className="w-full flex">
        <div className="w-20">
          <Sidebar />
        </div>
        <div className="w-80 h-page overflow-auto px-10">
          <Header />
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
