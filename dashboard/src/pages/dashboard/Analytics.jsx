import React, { useState } from "react";
import Structure from "../../components/layout/Structure";
import Chart from "../../components/common/Chart";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("May 12 - May 18, 2024");
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("All Views");
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Mock sidebar items
  const sidebarItems = [
    { name: "All Views", count: 6, color: "#1e74db" },
    { name: "Traffic Acquisition", count: 2, color: "#ef4444" },
    { name: "User Demographics", count: 1, color: "#22c55e" },
    { name: "Device Breakdown", count: 1, color: "#f97316" }
  ];

  // Mock tabs
  const tabs = [
    { name: "Dashboard" },
    { name: "Realtime" },
    { name: "Events" }
  ];

  // Sparkline Chart Base Options
  const sparklineOptions = (color = "#1a73e8") => ({
    chart: {
      type: "area",
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: { curve: "smooth", width: 1.5 },
    fill: {
      type: "solid",
      opacity: 0.05,
    },
    colors: [color],
    tooltip: { enabled: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
      labels: { show: false },
    },
    grid: {
      show: false,
    },
  });

  // Users Over Time Line/Area Chart Options
  const usersOverTimeOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Poppins, sans-serif",
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#1a73e8"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.02,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#f1f3f4",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
      labels: {
        style: {
          colors: "#5f6368",
          fontSize: "11px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#5f6368",
          fontSize: "11px",
        },
        formatter: (val) => val.toLocaleString(),
      },
      min: 0,
      max: 6000,
      tickAmount: 3,
    },
    dataLabels: { enabled: false },
    tooltip: {
      shared: true,
      y: {
        formatter: (val) => val.toLocaleString(),
      },
    },
  };

  const usersOverTimeSeries = [
    {
      name: "Users",
      data: [3800, 4400, 5000, 4300, 3900, 3500, 3900],
    },
  ];

  // Donut Chart Config: Users by Platform
  const platformDonutOptions = {
    chart: {
      type: "donut",
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#1a73e8", "#4285f4", "#adcbfa"], // Dark blue, Medium blue, Light blue
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "11px",
              color: "#5f6368",
              offsetY: -3,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#202124",
              offsetY: 4,
              formatter: (val) => `${(val / 1000).toFixed(1)}K`,
            },
            total: {
              show: true,
              label: "Users",
              fontSize: "9px",
              color: "#5f6368",
              formatter: () => "12.6K",
            },
          },
        },
      },
    },
  };

  const platformSeries = [8500, 3500, 593]; // Web, Mobile App, Tablet

  // Donut Chart Config: Users by Device Category
  const deviceDonutOptions = {
    chart: {
      type: "donut",
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#1a73e8", "#4285f4", "#adcbfa"],
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "11px",
              color: "#5f6368",
              offsetY: -3,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#202124",
              offsetY: 4,
              formatter: (val) => `${(val / 1000).toFixed(1)}K`,
            },
            total: {
              show: true,
              label: "Users",
              fontSize: "9px",
              color: "#5f6368",
              formatter: () => "12.6K",
            },
          },
        },
      },
    },
  };

  const deviceSeries = [7700, 4300, 616]; // Desktop, Mobile, Tablet

  // Horizontal Bar Chart Config: Default Channel Group
  const channelBarOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        borderRadius: 4,
      },
    },
    colors: ["#1a73e8"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#f1f3f4",
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["Paid Search", "Organic Social", "Referral", "Direct", "Organic Search"],
      labels: {
        style: {
          colors: "#5f6368",
          fontSize: "11px",
        },
        formatter: (val) => val.toLocaleString(),
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#5f6368",
          fontSize: "11px",
        },
        formatter: (val) => val,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => val.toLocaleString(),
      },
    },
  };

  const channelSeries = [
    {
      name: "Users",
      data: [723, 1200, 1800, 3600, 5200],
    },
  ];

  // Table configurations and datasets
  const pagesColumns = [
    { label: "PAGE", field: "path" },
    { label: "VIEWS", field: "views", align: "right" },
  ];
  const pagesData = [
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/</span>, views: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>8.6K</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/shop</span>, views: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>5.4K</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/product/123</span>, views: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>2.9K</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/blog</span>, views: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>2.1K</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/about</span>, views: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>1.8K</span> },
  ];

  const activeUsersRealtime = 142;
  const realtimeColumns = [
    { label: "PAGE PATH", field: "path" },
    { label: "ACTIVE USERS", field: "active", align: "right" },
  ];
  const realtimeData = [
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/shop</span>, active: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>48</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/</span>, active: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>36</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/product/123</span>, active: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>22</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/checkout</span>, active: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>18</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/blog/trends-2024</span>, active: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>12</span> },
    { path: <span className="font-500 small-text" style={{ color: "#1a73e8", cursor: "pointer" }}>/cart</span>, active: <span className="font-600 small-text" style={{ color: "var(--dark)" }}>6</span> },
  ];

  const eventsColumns = [
    { label: "EVENT NAME", field: "name" },
    { label: "EVENT COUNT", field: "count", align: "right" },
    { label: "TOTAL USERS", field: "users", align: "right" },
    { label: "PERCENT CHANGE", field: "change", align: "right" },
  ];
  const eventsData = [
    { name: <span className="font-600 text-dark">page_view</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>48,312</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>12,105</span>, change: <span className="small-text text-success font-600">+10.6%</span> },
    { name: <span className="font-600 text-dark">user_engagement</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>35,102</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>11,842</span>, change: <span className="small-text text-success font-600">+12.1%</span> },
    { name: <span className="font-600 text-dark">session_start</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>18,740</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>12,608</span>, change: <span className="small-text text-success font-600">+8.3%</span> },
    { name: <span className="font-600 text-dark">first_visit</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>8,412</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>8,412</span>, change: <span className="small-text text-success font-600">+6.8%</span> },
    { name: <span className="font-600 text-dark">click</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>6,211</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>3,105</span>, change: <span className="small-text text-success font-600">+15.4%</span> },
    { name: <span className="font-600 text-dark">scroll</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>4,890</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>2,980</span>, change: <span className="text-success font-600">+9.2%</span> },
    { name: <span className="font-600 text-dark">purchase</span>, count: <span className="small-text" style={{ color: "var(--dark)" }}>1,320</span>, users: <span className="small-text" style={{ color: "var(--dark)" }}>1,102</span>, change: <span className="small-text text-success font-600">+13.8%</span> },
  ];

  // Helper to filter stats cards based on sidebar selection
  const showCard = (cardType) => {
    if (selectedSidebarItem === "All Views") return true;
    if (selectedSidebarItem === "Traffic Acquisition") {
      return ["sessions", "pageviews", "engaged", "rate"].includes(cardType);
    }
    if (selectedSidebarItem === "User Demographics") {
      return ["users", "conversions"].includes(cardType);
    }
    if (selectedSidebarItem === "Device Breakdown") {
      return ["users", "rate"].includes(cardType);
    }
    return true;
  };

  // Filter input elements
  const filterInputs = (
    <div className="flex items-center gap-12 w-full flex-wrap">
      <div className="flex items-center rounded-5 border-tertiary bg-white px-12 py-8" style={{ minWidth: "220px" }}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-gray mr-8">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="text-dark small-text cursor-pointer font-500  border-0 outline-none w-full"
        >
          <option value="May 12 - May 18, 2024">May 12 - May 18, 2024</option>
          <option value="May 05 - May 11, 2024">May 05 - May 11, 2024</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>
    </div>
  );

  const hasActiveFilters = dateRange !== "May 12 - May 18, 2024";
  const handleClearAllFilters = () => {
    setDateRange("May 12 - May 18, 2024");
  };

  return (
    <Structure
      sidebarTitle="Analytics View"
      sidebarItems={sidebarItems}
      selectedSidebarItem={selectedSidebarItem}
      onSidebarItemClick={setSelectedSidebarItem}
      headerIcon={
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      }
      headerTitle="Google Analytics 4 Overview"
      headerSub="Overview of website traffic, acquisition channels, device categories, platform distribution, and conversions."
      showTabControls={true}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      filterDescription={
        selectedSidebarItem === "All Views"
          ? "Showing aggregated GA4 metrics"
          : `Showing metrics for ${selectedSidebarItem}`
      }
      filterInputs={filterInputs}
      hasActiveFilters={hasActiveFilters}
      onClearAllFilters={handleClearAllFilters}
    >
      {activeTab === "Dashboard" && (
        <>
          {/* STATS CARDS GRID */}
          <div className="grid grid-cols-3 gap-12 lp-grid-cols-3 md-grid-cols-2 sm-grid-cols-1 mb-16">
            {[
              {
                id: "users",
                label: "Users",
                value: "12.6K",
                change: "↑ 12.5%",
                comparison: "vs May 5 - May 11",
                color: "#1a73e8",
                data: [32, 45, 30, 42, 50, 41, 48],
                hasIcon: true,
              },
              {
                id: "sessions",
                label: "Sessions",
                value: "18.7K",
                change: "↑ 8.3%",
                comparison: "vs May 5 - May 11",
                color: "#3b82f6",
                data: [25, 30, 28, 38, 33, 39, 36],
              },
              {
                id: "pageviews",
                label: "Page views",
                value: "48.3K",
                change: "↑ 10.6%",
                comparison: "vs May 5 - May 11",
                color: "#7367f0",
                data: [40, 45, 38, 48, 55, 47, 52],
              },
              {
                id: "engaged",
                label: "Engaged sessions",
                value: "10.2K",
                change: "↑ 11.7%",
                comparison: "vs May 5 - May 11",
                color: "#10b981",
                data: [22, 28, 20, 31, 35, 29, 33],
              },
              {
                id: "rate",
                label: "Engagement rate",
                value: "54.6%",
                change: "↑ 6.4%",
                comparison: "vs May 5 - May 11",
                color: "#f59e0b",
                data: [50, 52, 51, 55, 54, 53, 54.6],
              },
              {
                id: "conversions",
                label: "Conversions",
                value: "1.32K",
                change: "↑ 13.8%",
                comparison: "vs May 5 - May 11",
                color: "#ef4444",
                data: [12, 15, 10, 18, 22, 16, 20],
              },
            ].map((card) => showCard(card.id) && (
              <div key={card.id} className="bg-white border-tertiary rounded-5 p-10">
                <div>
                  <p className="small-text text-gray font-500 flex items-center gap-4 m-0">
                    {card.label}
                    {card.hasIcon && (
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    )}
                  </p>
                  <h3 className="title-text text-dark font-600 mt-4 mb-0">{card.value}</h3>
                  <div className="mini-text text-gray flex items-center gap-6 mt-2 mb-6">
                    <span className="text-success font-600">{card.change}</span>
                    <span>{card.comparison}</span>
                  </div>
                </div>
                <div className="h-100px overflow-hidden flex">
                  <Chart options={sparklineOptions(card.color)} series={[{ data: card.data }]} type="area" height="100%" />
                </div>
              </div>
            ))}
          </div>

          {(selectedSidebarItem === "All Views" || selectedSidebarItem === "Traffic Acquisition") && (
            <div className="bg-white rounded-5 w-full">
              <div className='p-12'>
                <div className="flex justify-between items-center mb-14">
                  <div>
                    <h3 className="mid-text font-500 text-dark">Users over time</h3>
                    <p className="mini-text text-gray mt-2">Active user tracking</p>
                  </div>
                  <select className="border-tertiary bg-white px-10 py-5 rounded-5 mini-text font-500 text-gray cursor-pointer outline-none">
                    <option>Day</option>
                    <option>Week</option>
                    <option>Month</option>
                  </select>
                </div>
                <div>
                  <div style={{ width: "100%" }}>
                    <Chart options={usersOverTimeOptions} series={usersOverTimeSeries} type="area" height={220} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "Realtime" && (
        <>

          {/* BOTTOM ROW (Acquisition channels + Country map + Pages table) */}
          <div className="grid-cols-2 gap-12">

            {/* Horizontal Bar Chart: Channel Group */}
            {(selectedSidebarItem === "All Views" || selectedSidebarItem === "Traffic Acquisition") && (
              <div className="bg-white rounded-5 p-12">
                <div className="flex justify-between items-center mb-14">
                  <div>
                    <h3 className="mid-text font-500 text-dark m-0 flex items-center gap-6">
                      Users by primary channel
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </h3>
                    <p className="mini-text text-gray mt-2">Channel acquisition details</p>
                  </div>
                </div>

                <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%" }}>
                    <Chart options={channelBarOptions} series={channelSeries} type="bar" height={200} />
                  </div>
                </div>
              </div>
            )}

            {/* Map Card: Users by Country */}
            {(selectedSidebarItem === "All Views" || selectedSidebarItem === "User Demographics") && (
              <div className="bg-white rounded-5 p-12">
                <div className="flex justify-between items-center mb-14">
                  <div>
                    <h3 className="mid-text font-500 text-dark flex items-center gap-6">
                      Users by country
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </h3>
                    <p className="mini-text text-gray mt-2">Demographics overview</p>
                  </div>
                </div>

                <div className="flex items-center gap-12 w-full flex-grow flex-wrap">
                  <div className="flex items-center justify-center" style={{ flex: "1.2" }}>
                    {/* Vector Map with Native SVG Animations */}
                    <svg viewBox="0 0 340 180" style={{ width: "100%", height: "auto" }}>
                      {/* North America */}
                      <path d="M20 30 L40 25 L85 20 L100 45 L95 70 L80 90 L55 85 L40 75 L30 50 Z" fill="#E8EAED" stroke="#FFFFFF" strokeWidth="1" />
                      {/* South America */}
                      <path d="M75 92 L95 90 L105 110 L90 145 L80 165 L70 145 L65 115 Z" fill="#E8EAED" stroke="#FFFFFF" strokeWidth="1" />
                      {/* Africa */}
                      <path d="M145 90 L175 80 L195 95 L200 115 L180 145 L165 140 L155 120 L140 100 Z" fill="#E8EAED" stroke="#FFFFFF" strokeWidth="1" />
                      {/* Eurasia */}
                      <path d="M140 30 L180 20 L230 15 L280 25 L290 50 L280 80 L250 85 L220 75 L190 70 L160 75 L145 60 Z" fill="#E8EAED" stroke="#FFFFFF" strokeWidth="1" />
                      {/* Australia */}
                      <path d="M260 120 L285 115 L295 130 L275 140 L255 130 Z" fill="#E8EAED" stroke="#FFFFFF" strokeWidth="1" />

                      {/* Hotspots with SVG Animations */}
                      {/* USA */}
                      <circle cx="55" cy="50" r="4" fill="#1a73e8" />
                      <circle cx="55" cy="50" r="4" fill="none" stroke="#1a73e8" strokeWidth="2">
                        <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* Canada */}
                      <circle cx="65" cy="35" r="4" fill="#4285f4" />
                      <circle cx="65" cy="35" r="4" fill="none" stroke="#4285f4" strokeWidth="2">
                        <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* UK */}
                      <circle cx="155" cy="35" r="4" fill="#1a73e8" />
                      <circle cx="155" cy="35" r="4" fill="none" stroke="#1a73e8" strokeWidth="2">
                        <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* India */}
                      <circle cx="215" cy="65" r="4" fill="#1a73e8" />
                      <circle cx="215" cy="65" r="4" fill="none" stroke="#1a73e8" strokeWidth="2">
                        <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* Australia */}
                      <circle cx="275" cy="128" r="4" fill="#1a73e8" />
                      <circle cx="275" cy="128" r="4" fill="none" stroke="#1a73e8" strokeWidth="2">
                        <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </div>

                  <div className=" gap-8" style={{ flex: "0.8" }}>
                    <div className="flex justify-between items-center small-text text-gray pb-6 bordb">
                      <span className="font-500">India</span>
                      <span className="font-600 text-dark">2.6K</span>
                    </div>
                    <div className="flex justify-between items-center small-text text-gray pb-6 bordb">
                      <span className="font-500">United States</span>
                      <span className="font-600 text-dark">2.1K</span>
                    </div>
                    <div className="flex justify-between items-center small-text text-gray pb-6 bordb">
                      <span className="font-500">Canada</span>
                      <span className="font-600 text-dark">1.1K</span>
                    </div>
                    <div className="flex justify-between items-center small-text text-gray pb-6 bordb">
                      <span className="font-500">United Kingdom</span>
                      <span className="font-600 text-dark">842</span>
                    </div>
                    <div className="flex justify-between items-center small-text text-gray pb-6 bordb">
                      <span className="font-500">Australia</span>
                      <span className="font-600 text-dark">673</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Table Card: Top Pages by Views */}
            {(selectedSidebarItem === "All Views" || selectedSidebarItem === "Traffic Acquisition") && (
              <div className="bg-white rounded-5 p-12">
                <div className="flex justify-between items-center mb-14">
                  <div>
                    <h3 className="mid-text font-500 text-dark flex items-center gap-6">
                      Top pages by Views
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </h3>
                    <p className="mini-text text-gray mt-2">Active screen stats</p>
                  </div>
                </div>

                <div style={{ flexGrow: 1 }} className="mt-8">
                  <Table columns={pagesColumns} data={pagesData} variant="clean" />
                </div>

              </div>
            )}


            {/* Donut Chart: Users by Platform */}
            {(selectedSidebarItem === "All Views" || selectedSidebarItem === "Device Breakdown") && (
              <div className="bg-white p-12 rounded-5">
                <div className="mb-10">
                  <h3 className="mid-text font-500 text-dark flex items-center gap-6">
                    Users by platform
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </h3>
                  <p className="mini-text text-gray mt-2">Source breakdown</p>
                </div>
                <div>
                  <div className="flex items-center justify-center" style={{ width: "130px", height: "130px", flexShrink: 0, position: "relative" }}>
                    <Chart options={platformDonutOptions} series={platformSeries} type="donut" width={130} height={130} />
                  </div>

                  <div className=" gap-8" style={{ flex: "1" }}>
                    <div className="flex justify-between items-center small-text pb-6 bordb">
                      <div className="flex items-center gap-8">
                        <span className="rounded-50" style={{ width: "8px", height: "8px", background: "#1a73e8", display: "inline-block" }}></span>
                        <span className="small-text text-gray font-500">web</span>
                      </div>
                      <span className="small-text text-dark font-600">8.5K (67.2%)</span>
                    </div>
                    <div className="flex justify-between items-center small-text pb-6 bordb">
                      <div className="flex items-center gap-8">
                        <span className="rounded-50" style={{ width: "8px", height: "8px", background: "#4285f4", display: "inline-block" }}></span>
                        <span className="small-text text-gray font-500">mobile app</span>
                      </div>
                      <span className="small-text text-dark font-600">3.5K (28.1%)</span>
                    </div>
                    <div className="flex justify-between items-center small-text pb-6 bordb">
                      <div className="flex items-center gap-8">
                        <span className="rounded-50" style={{ width: "8px", height: "8px", background: "#adcbfa", display: "inline-block" }}></span>
                        <span className="small-text text-gray font-500">tablet</span>
                      </div>
                      <span className="small-text text-dark font-600">593 (4.7%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "Events" && (
        <div>
          <Table columns={eventsColumns} data={eventsData} />
        </div>
      )}
    </Structure>
  );
};

export default Analytics;
