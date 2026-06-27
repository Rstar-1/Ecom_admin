import React, { useState } from "react";
import Structure from "../../components/layout/Structure";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import Chart from "react-apexcharts";

const AI = () => {
  const [activeTab, setActiveTab] = useState("Overview"); // 'Overview' | 'Usage' | 'Rate Limits' | 'Applications'
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("All Projects");

  // Filters state
  const [showFilters, setShowFilters] = useState(false);
  const [selectedModelFilter, setSelectedModelFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("last-7-days");

  // Sparkline configuration helper
  const makeSparklineOptions = (color) => ({
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
  });

  // Stacked Bar Chart Options (Tokens usage)
  const tokensUsageOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Poppins, sans-serif",
    },
    plotOptions: {
      bar: {
        columnWidth: "35%",
        borderRadius: 4,
      },
    },
    stroke: { width: 0 },
    colors: ["#3b82f6", "#7367f0"], // Input (Blue), Output (Purple)
    grid: {
      borderColor: "#f3f4f6",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "11px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 40,
      tickAmount: 4,
      labels: {
        formatter: (val) => (val === 0 ? "0" : `${val}M`),
        style: {
          colors: "#6b7280",
          fontSize: "11px",
        },
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { shared: true, intersect: false },
  };

  const tokensUsageSeries = [
    {
      name: "Input tokens",
      data: [15, 14, 18, 13.5, 16, 13, 15.5],
    },
    {
      name: "Output tokens",
      data: [16, 12, 13, 16.5, 15, 15.8, 15.7],
    },
  ];

  // Usage by Model Donut Chart Options
  const usageModelOptions = {
    chart: {
      type: "donut",
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#3b82f6", "#10b981", "#7367f0", "#f59e0b", "#9ca3af"], // Blue, Green, Purple, Yellow, Grey
    stroke: { width: 0 },
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}M tokens`,
      },
    },
  };

  const usageModelSeries = [66.7, 45.3, 28.7, 8.6, 3.3];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Model,Input Tokens,Output Tokens,Total Tokens,Cost (USD),Application\n"
      + "May 18 2:41 PM,gpt-4o,8123456,4832201,12955657,154.67,Chat App\n"
      + "May 18 1:15 PM,gpt-4-turbo,6245301,2965731,9211032,98.21,Internal Tool\n"
      + "May 18 12:02 PM,gpt-3.5-turbo,3421654,1102357,4524011,12.45,Customer Support\n"
      + "May 18 11:10 AM,gpt-4o-mini,1102357,721654,1824011,2.84,Mobile App\n"
      + "May 18 10:05 AM,gpt-4o,4352721,2003721,6358442,75.34,Chat App";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "token_usage_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Sidebar count data
  const sidebarItems = [
    { name: "All Projects", count: 4, color: "#1e74db" },
    { name: "Ecom Chatbot", count: 2, color: "#ef4444" },
    { name: "Analytics Agent", count: 1, color: "#22c55e" },
    { name: "Recommender Engine", count: 1, color: "#f59e0b" }
  ];

  // Navigation Tabs configuration
  const tabs = [
    { name: "Overview" },
    { name: "Usage" },
    { name: "Rate Limits" },
    { name: "Applications" }
  ];

  // Filter input elements
  const filterInputs = (
    <div className="grid-cols-4 gap-12 w-full">
      <div className="grid-cols-1">
        <span className="small-text text-gray font-500">Date Range:</span>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-12 py-8 rounded-5 border-tertiary text-dark small-text bg-white cursor-pointer font-500"
        >
          <option value="last-7-days">Last 7 Days (May 12 - May 18)</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="this-month">This Month</option>
        </select>
      </div>

      <div className="grid-cols-1">
        <span className="small-text text-gray font-500">Filter Model:</span>
        <select
          value={selectedModelFilter}
          onChange={(e) => setSelectedModelFilter(e.target.value)}
          className="px-12 py-8 rounded-5 border-tertiary text-dark small-text bg-white cursor-pointer font-500"
        >
          <option value="All">All Models</option>
          <option value="gpt-4o">gpt-4o</option>
          <option value="gpt-4-turbo">gpt-4-turbo</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4o-mini">gpt-4o-mini</option>
        </select>
      </div>
    </div>
  );

  const hasActiveFilters = selectedModelFilter !== "All" || dateFilter !== "last-7-days";
  const handleClearAllFilters = () => {
    setSelectedModelFilter("All");
    setDateFilter("last-7-days");
  };

  // Table configurations
  const recentUsageColumns = [
    { field: "date", label: "Date" },
    { field: "model", label: "Model" },
    { field: "input", label: "Input Tokens" },
    { field: "output", label: "Output Tokens" },
    { field: "total", label: "Total Tokens" },
    { field: "cost", label: "Cost (USD)" },
    { field: "app", label: "Application" }
  ];

  const initialRecentUsageData = [
    { date: "May 18, 2024 2:41 PM", model: "gpt-4o", input: "8,123,456", output: "4,832,201", total: "12,955,657", cost: "$154.67", app: "Chat App" },
    { date: "May 18, 2024 1:15 PM", model: "gpt-4-turbo", input: "6,245,301", output: "2,965,731", total: "9,211,032", cost: "$98.21", app: "Internal Tool" },
    { date: "May 18, 2024 12:02 PM", model: "gpt-3.5-turbo", input: "3,421,654", output: "1,102,357", total: "4,524,011", cost: "$12.45", app: "Customer Support" },
    { date: "May 18, 2024 11:10 AM", model: "gpt-4o-mini", input: "1,102,357", output: "721,654", total: "1,824,011", cost: "$2.84", app: "Mobile App" },
    { date: "May 18, 2024 10:05 AM", model: "gpt-4o", input: "4,352,721", output: "2,003,721", total: "6,358,442", cost: "$75.34", app: "Chat App" }
  ];

  const fetchRecentUsageData = async () => {
    let raw = initialRecentUsageData;

    // Filter by project (sidebar)
    if (selectedSidebarItem !== "All Projects") {
      if (selectedSidebarItem === "Ecom Chatbot") {
        raw = raw.filter(r => r.app === "Chat App" || r.app === "Customer Support");
      } else if (selectedSidebarItem === "Analytics Agent") {
        raw = raw.filter(r => r.app === "Internal Tool");
      } else if (selectedSidebarItem === "Recommender Engine") {
        raw = raw.filter(r => r.app === "Mobile App");
      }
    }

    // Filter by model select dropdown
    if (selectedModelFilter !== "All") {
      raw = raw.filter(r => r.model === selectedModelFilter);
    }

    const formatted = raw.map(row => ({
      ...row,
      model: (
        <span className="px-6 py-2 rounded-5 bg-tertiary text-dark font-mono mini-text">
          {row.model}
        </span>
      ),
      cost: <span className="text-success font-600">{row.cost}</span>
    }));

    return {
      data: formatted,
      total: raw.length
    };
  };

  const appSurchargeColumns = [
    { field: "name", label: "Application Name" },
    { field: "requests", label: "Total Requests" },
    { field: "tokens", label: "Tokens Consumed" },
    { field: "cost", label: "Cost Share (USD)" }
  ];

  const initialAppSurchargeData = [
    { name: "Chat App", requests: "14,502", tokens: "74.5M", cost: "$880.12" },
    { name: "Internal Tool", requests: "8,241", tokens: "42.1M", cost: "$490.54" },
    { name: "Customer Support", requests: "5,812", tokens: "28.7M", cost: "$340.23" },
    { name: "Mobile App", requests: "2,140", tokens: "7.3M", cost: "$113.67" }
  ];

  const fetchAppSurcharges = async () => {
    const formatted = initialAppSurchargeData.map(row => ({
      ...row,
      cost: <span className="font-600 text-dark">{row.cost}</span>
    }));
    return {
      data: formatted,
      total: formatted.length
    };
  };

  return (
    <Structure
      sidebarTitle="AI Projects"
      sidebarItems={sidebarItems}
      selectedSidebarItem={selectedSidebarItem}
      onSidebarItemClick={setSelectedSidebarItem}
      headerIcon={
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      }
      headerTitle="AI Studio"
      headerSub="Monitor API token consumption, rate limits, model distribution, and cost metrics."
      quickAction={
        <div className="text-right">
          <p className="mini-text text-gray font-600 uppercase mb-2">QUICK ACTION</p>
          <p
            className="small-text font-600 text-primary flex items-center gap-2 decoration-none cursor-pointer"
            onClick={handleExport}
          >
            Export CSV
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </p>
        </div>
      }
      showTabControls={true}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      filterDescription={
        selectedSidebarItem === "All Projects"
          ? "Showing aggregated AI metrics"
          : `Showing metrics for ${selectedSidebarItem}`
      }
      showFilters={showFilters}
      onToggleFilters={() => setShowFilters(!showFilters)}
      filterInputs={filterInputs}
      hasActiveFilters={hasActiveFilters}
      onClearAllFilters={handleClearAllFilters}
    >
      {activeTab === "Overview" && (
        <>
          {/* KPI metrics row */}
          <div className="grid-cols-4 gap-12 md-grid-cols-2 sm-grid-cols-1 mb-20">
            {/* Total Tokens */}
            <div className="bg-white border rounded-5 p-16 flex flex-column justify-between" style={{ minHeight: "145px", minWidth: 0 }}>
              <div>
                <div className="flex items-center gap-8 justify-between">
                  <span className="mini-text font-600 text-gray uppercase">Total Tokens</span>
                  <span className="text-gray cursor-pointer" title="Aggregated sum of all input & output tokens">ℹ️</span>
                </div>
                <h3 className="mid-large-text text-dark font-600 my-8">152.6M</h3>
                <div className="mini-text text-gray">
                  <span className="text-success font-600 mr-4">↑ 18.4%</span>
                  vs last week
                </div>
              </div>
              <div style={{ height: "40px", width: "100%" }}>
                <Chart options={makeSparklineOptions("#10b981")} series={[{ data: [110, 130, 125, 142, 135, 148, 152.6] }]} type="area" height="100%" width="100%" />
              </div>
            </div>

            {/* Input Tokens */}
            <div className="bg-white border rounded-5 p-16 flex flex-column justify-between" style={{ minHeight: "145px", minWidth: 0 }}>
              <div>
                <div className="flex items-center gap-8 justify-between">
                  <span className="mini-text font-600 text-gray uppercase">Input Tokens</span>
                  <span className="text-gray cursor-pointer" title="Tokens sent in API prompts">ℹ️</span>
                </div>
                <h3 className="mid-large-text text-dark font-600 my-8">97.4M</h3>
                <div className="mini-text text-gray">
                  <span className="text-success font-600 mr-4">↑ 20.1%</span>
                  vs last week
                </div>
              </div>
              <div style={{ height: "40px", width: "100%" }}>
                <Chart options={makeSparklineOptions("#3b82f6")} series={[{ data: [70, 82, 78, 91, 85, 94, 97.4] }]} type="area" height="100%" width="100%" />
              </div>
            </div>

            {/* Output Tokens */}
            <div className="bg-white border rounded-5 p-16 flex flex-column justify-between" style={{ minHeight: "145px", minWidth: 0 }}>
              <div>
                <div className="flex items-center gap-8 justify-between">
                  <span className="mini-text font-600 text-gray uppercase">Output Tokens</span>
                  <span className="text-gray cursor-pointer" title="Tokens returned in responses">ℹ️</span>
                </div>
                <h3 className="mid-large-text text-dark font-600 my-8">55.2M</h3>
                <div className="mini-text text-gray">
                  <span className="text-success font-600 mr-4">↑ 15.2%</span>
                  vs last week
                </div>
              </div>
              <div style={{ height: "40px", width: "100%" }}>
                <Chart options={makeSparklineOptions("#7367f0")} series={[{ data: [40, 48, 47, 51, 50, 54, 55.2] }]} type="area" height="100%" width="100%" />
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-white border rounded-5 p-16 flex flex-column justify-between" style={{ minHeight: "145px", minWidth: 0 }}>
              <div>
                <div className="flex items-center gap-8 justify-between">
                  <span className="mini-text font-600 text-gray uppercase">Total Cost</span>
                  <span className="text-gray cursor-pointer" title="Aggregated dollar consumption">ℹ️</span>
                </div>
                <h3 className="mid-large-text text-dark font-600 my-8">$1,824.56</h3>
                <div className="mini-text text-gray">
                  <span className="text-success font-600 mr-4">↑ 16.7%</span>
                  vs last week
                </div>
              </div>
              <div style={{ height: "40px", width: "100%" }}>
                <Chart options={makeSparklineOptions("#10b981")} series={[{ data: [1300, 1500, 1450, 1680, 1600, 1750, 1824.56] }]} type="area" height="100%" width="100%" />
              </div>
            </div>
          </div>

          {/* Graphical splits row */}
          <div className="flex gap-12 flex-wrap mb-20">
            {/* Chart Card 1 */}
            <div className="bg-white border rounded-5 p-20 flex flex-column justify-between" style={{ flex: "1.8 1 350px", minHeight: "340px" }}>
              <div className="flex justify-between items-center mb-16">
                <h4 className="mid-text font-600 text-dark pb-5">Tokens Usage</h4>
                <div className="flex items-center gap-12 mini-text text-gray">
                  <div className="flex items-center gap-4">
                    <span style={{ width: 8, height: 8, background: "#3b82f6", borderRadius: "50%" }}></span>
                    <span>Input</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ width: 8, height: 8, background: "#7367f0", borderRadius: "50%" }}></span>
                    <span>Output</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex items-center">
                <div className="w-full">
                  <Chart options={tokensUsageOptions} series={tokensUsageSeries} type="bar" height={270} />
                </div>
              </div>
            </div>

            {/* Donut Card 2 */}
            <div className="bg-white border rounded-5 p-20 flex flex-column justify-between" style={{ flex: "1.1 1 250px", minHeight: "340px" }}>
              <div className="flex justify-between items-center mb-16">
                <h4 className="mid-text font-600 text-dark pb-5">Usage By Model</h4>
              </div>
              <div className="flex flex-column items-center justify-center flex-grow gap-12">
                <div style={{ maxWidth: "170px", width: "100%" }}>
                  <Chart options={usageModelOptions} series={usageModelSeries} type="donut" width="100%" />
                </div>
                <div className="w-full flex flex-column gap-6 mini-text">
                  <div className="flex justify-between items-center">
                    <span className="text-gray font-500 flex items-center gap-4">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }}></span>
                      gpt-4o
                    </span>
                    <span>66.7M (43.7%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray font-500 flex items-center gap-4">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span>
                      gpt-4-turbo
                    </span>
                    <span>45.3M (29.7%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray font-500 flex items-center gap-4">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7367f0" }}></span>
                      gpt-3.5-turbo
                    </span>
                    <span>28.7M (18.8%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray font-500 flex items-center gap-4">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }}></span>
                      gpt-4o-mini
                    </span>
                    <span>8.6M (5.6%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown List 3 */}
            <div className="bg-white border rounded-5 p-20 w-full">
              <div className="flex justify-between items-center mb-16">
                <h4 className="mid-text font-600 text-dark pb-5">Token Breakdown</h4>
              </div>

              {/* Progress split bar */}
              <div className="w-full bg-tertiary rounded-5 overflow-hidden flex mb-20" style={{ height: "10px" }}>
                <div className="bg-primary h-full" style={{ width: "63.9%" }} title="Input: 63.9%" />
                <div style={{ width: "36.1%", background: "#7367f0" }} className="h-full" title="Output: 36.1%" />
              </div>

              {/* Metric boxes grid */}
              <div className="grid-cols-3 gap-12 md-grid-cols-1 mb-16">
                <div className="bg-tertiary rounded-5 p-12 flex justify-between items-center">
                  <div>
                    <span className="mini-text text-gray uppercase font-600 flex items-center gap-4">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }}></span>
                      Input Tokens
                    </span>
                    <h4 className="mid-text font-600 text-dark mt-4 mb-0">97.4M</h4>
                  </div>
                  <span className="small-text font-600 text-gray">63.9%</span>
                </div>

                <div className="bg-tertiary rounded-5 p-12 flex justify-between items-center">
                  <div>
                    <span className="mini-text text-gray uppercase font-600 flex items-center gap-4">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7367f0" }}></span>
                      Output Tokens
                    </span>
                    <h4 className="mid-text font-600 text-dark mt-4 mb-0">55.2M</h4>
                  </div>
                  <span className="small-text font-600 text-gray">36.1%</span>
                </div>

                <div className="bg-tertiary rounded-5 p-12 flex justify-between items-center">
                  <div>
                    <span className="mini-text text-gray uppercase font-600">Total Tokens</span>
                    <h4 className="mid-text font-600 text-dark mt-4 mb-0">152.6M</h4>
                  </div>
                  <span className="small-text font-600 text-gray">100%</span>
                </div>
              </div>

              <div className="flex justify-start">
                <Button
                  version="v2"
                  bg="white"
                  color="primary"
                  border="primary"
                  className="cursor-pointer mini-text px-16 py-6"
                  onClick={() => setActiveTab("Usage")}
                >
                  View usage details
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Token Logs */}
          <div className="bg-white border rounded-5 p-16">
            <h4 className="small-text font-600 text-dark mb-16 mt-0">Recent Token Usage Logs</h4>
            <Table
              key={`${selectedSidebarItem}-${selectedModelFilter}-${dateFilter}`}
              columns={recentUsageColumns}
              data={initialRecentUsageData.map(row => ({
                ...row,
                model: (
                  <span className="px-6 py-2 rounded-5 bg-tertiary text-dark font-mono mini-text">
                    {row.model}
                  </span>
                ),
                cost: <span className="text-success font-600">{row.cost}</span>
              }))}
              total={5}
              limit={5}
              fetchData={fetchRecentUsageData}
            />
          </div>
        </>
      )}

      {activeTab === "Usage" && (
        <div className="bg-white border rounded-5 p-32 text-center">
          <h3 className="mid-text font-600 text-dark mb-8">Detailed Usage Metrics</h3>
          <p className="small-text text-gray max-w-sm mx-auto mb-0">
            Model breakdowns by time, average request tokens, and token-cost distribution parameters.
          </p>
        </div>
      )}

      {activeTab === "Rate Limits" && (
        <div className="bg-white border rounded-5 p-20 flex flex-column gap-20">
          <h3 className="mid-text font-600 text-dark pb-5">API Model Rate Limits</h3>

          <div>
            <div className="flex justify-between small-text mb-6">
              <span className="font-500 text-gray">gpt-4o (Requests Per Minute)</span>
              <span className="font-600 text-dark">81,234 / 150,000 RPM (54%)</span>
            </div>
            <div className="w-full bg-tertiary rounded-5 overflow-hidden" style={{ height: "8px" }}>
              <div className="h-full bg-success" style={{ width: "54%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between small-text mb-6">
              <span className="font-500 text-gray">gpt-4-turbo (Requests Per Minute)</span>
              <span className="font-600 text-dark">24,530 / 80,000 RPM (30%)</span>
            </div>
            <div className="w-full bg-tertiary rounded-5 overflow-hidden" style={{ height: "8px" }}>
              <div className="h-full bg-success" style={{ width: "30%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between small-text mb-6">
              <span className="font-500 text-gray">gpt-3.5-turbo (Requests Per Minute)</span>
              <span className="font-600 text-dark">142,654 / 200,000 RPM (71%)</span>
            </div>
            <div className="w-full bg-tertiary rounded-5 overflow-hidden" style={{ height: "8px" }}>
              <div className="h-full bg-warning" style={{ width: "71%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between small-text mb-6">
              <span className="font-500 text-gray">gpt-4o-mini (Requests Per Minute)</span>
              <span className="font-600 text-dark">4,352 / 100,000 RPM (4%)</span>
            </div>
            <div className="w-full bg-tertiary rounded-5 overflow-hidden" style={{ height: "8px" }}>
              <div className="h-full bg-success" style={{ width: "4%" }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "Applications" && (
        <div className="bg-white border rounded-5 p-16">
          <h3 className="mid-text font-600 text-dark pb-5">Active Application Surcharges</h3>
          <Table
            key="app-surcharges"
            columns={appSurchargeColumns}
            data={initialAppSurchargeData.map(row => ({
              ...row,
              cost: <span className="font-600 text-dark">{row.cost}</span>
            }))}
            total={4}
            limit={10}
            fetchData={fetchAppSurcharges}
          />
        </div>
      )}
    </Structure>
  );
};

export default AI;
