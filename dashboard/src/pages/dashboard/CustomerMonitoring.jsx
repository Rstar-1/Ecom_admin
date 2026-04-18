import React from "react";
import GenericChart from "../utility/GenericChart";
import GenericTabs from "../utility/GenericTabs";
import GenericTable from "../utility/GenericTable";
import Chart from "react-apexcharts";

const CustomerMonitoring = () => {
  const dashcount = [
    {
      title: "Total Vendors",
      value: "34,000",
      change: "+55%",
    },
    {
      title: "Total Customers",
      value: "34K",
      change: "+55%",
    },
    {
      title: "Total Orders",
      value: "34K",
      change: "+55%",
    },
    {
      title: "Total Orders",
      value: "34K",
      change: "+55%",
    },
  ];

  const barOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      labels: {
        style: {
          colors: "#9aa0ac",
          fontSize: "12px",
        },
      },
    },
    colors: [
      "#E7E7F3",
      "#E7E7F3",
      "#E7E7F3",
      "#E7E7F3",
      "#6C63FF", // Highlight (Friday)
      "#E7E7F3",
      "#E7E7F3",
    ],
    tooltip: { enabled: false },
  };

  const barSeries = [
    {
      data: [120, 180, 150, 140, 260, 170, 210],
    },
  ];

  const earningOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
      parentHeightOffset: 0,
      fontFamily: "Poppins, sans-serif",
    },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "50%",
        dataLabels: {
          position: "top", // 👈 required for bars
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}k`,
      position: "top", // 👈 THIS is key
      offsetY: -29,
      style: {
        fontSize: "13px",
        fontWeight: 600,
        colors: ["#4B4B5A"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#9AA0AC",
          fontSize: "12px",
        },
      },
    },

    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}k`,
        style: {
          colors: "#C2C6D1", // very light like UI
          fontSize: "12px",
        },
      },
    },

    grid: {
      borderColor: "#F1F1F4",
      strokeDashArray: 5,
      padding: {
        top: 20, // 👈 gives room for labels
      },
    },

    colors: [
      "#6C63FF",
      "#6C63FF",
      "#6C63FF", // active (March)
      "#6C63FF",
      "#6C63FF",
      "#6C63FF",
      "#6C63FF",
      "#6C63FF",
      "#6C63FF",
    ],

    states: {
      normal: {
        filter: { type: "none" },
      },
      hover: {
        filter: { type: "darken", value: 0.15 },
      },
      active: {
        filter: { type: "none" },
      },
    },

    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `${val}k`,
      },
    },
  };

  const earningSeries = [
    {
      name: "Earnings",
      data: [28, 10, 45, 38, 15, 30, 35, 30, 8],
    },
  ];

  const iconBox = (bg, color) => ({
    background: bg,
    color: color,
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  });

  return (
    <div className="py-9 px-12">
      <div className="grid-cols-5 gap-12">
        <div className="w-full bg-white rounded-5">
          <div className="p-12">
            <p className="text-dark para-text font-600">Total Orders</p>
            <p className="text-gray mini-text font-500 mt-1">Last Week</p>

            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={150}
            />

            <div className="flex items-center justify-between mt-17">
              <h2 className="text-dark title-text font-600">124k</h2>
              <span className="text-success small-text font-500">+12.6%</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-5">
          <div className="p-12">
            <div>
              <div style={iconBox("#FFE5E5", "#FF4C51")}>💲</div>
              <p className="text-dark para-text font-600 mt-12">Total Profit</p>
              <p className="text-gray mini-text font-500 mt-1">Last Week</p>
            </div>

            <div className="mt-35">
              <h2 className="text-dark title-text font-600">$1,673</h2>
              <p className="text-warning bg-light-warning px-10 py-3 rounded-5 mini-text font-500 w-max mt-8">
                +12.6%
              </p>
            </div>

            <div className="flex items-center justify-between mt-17">
              <h2 className="text-dark title-text font-600">124k</h2>
              <span className="text-warning small-text font-500">+12.6%</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-5">
          <div className="p-12">
            <div>
              <div style={iconBox("#ececec", "#111")}>💲</div>
              <p className="text-dark para-text font-600 mt-12">Total Profit</p>
              <p className="text-gray mini-text font-500 mt-1">Last Week</p>
            </div>

            <div className="mt-35">
              <h2 className="text-dark title-text font-600">$1,673</h2>
              <p className="text-primary bg-light-primary px-10 py-3 rounded-5 mini-text font-500 w-max mt-8">
                +12.6%
              </p>
            </div>

            <div className="flex items-center justify-between mt-17">
              <h2 className="text-dark title-text font-600">124k</h2>
              <span className="text-primary small-text font-500">+12.6%</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-5">
          <div className="p-12">
            <div>
              <div style={iconBox("#DFF5E8", "#28C76F")}>💲</div>
              <p className="text-dark para-text font-600 mt-12">Total Profit</p>
              <p className="text-gray mini-text font-500 mt-1">Last Week</p>
            </div>

            <div className="mt-35">
              <h2 className="text-dark title-text font-600">$1,673</h2>
              <p className="text-success bg-light-success px-10 py-3 rounded-5 mini-text font-500 w-max mt-8">
                +12.6%
              </p>
            </div>

            <div className="flex items-center justify-between mt-17">
              <h2 className="text-dark title-text font-600">124k</h2>
              <span className="text-success small-text font-500">+12.6%</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-5">
          <div className="p-12">
            <p className="text-dark para-text font-600">Revenue Growth</p>
            <p className="text-gray mini-text font-500 mt-1">Weekly Report</p>

            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={150}
            />

            <div className="flex items-center justify-between mt-17">
              <h2 className="text-dark title-text font-600">124k</h2>
              <span className="text-success small-text font-500">+12.6%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-12 mt-12">
        {/* LEFT CARD */}
        <div className="w-50 bg-white rounded-5">
          <div className="px-24 py-15">
            <h3 className="title-text text-dark font-600">Earning Reports</h3>
            <p className="small-text mt-5 text-gray">
              Weekly Earnings Overview
            </p>

            <div className="flex gap-12 items-end">
              <div className="w-50">
                <div className="flex items-center gap-12">
                  <h2 className="large-text text-dark font-600">$468</h2>
                  <span className="bg-light-success text-success small-text font-600 px-16 py-4 rounded-5">
                    +4.2%
                  </span>
                </div>
                <p className="text-gray font-500 small-text mt-4">
                  You informed of this week compared to last week
                </p>
              </div>
              <div className="w-50">
                <Chart
                  options={barOptions}
                  series={barSeries}
                  type="bar"
                  height={150}
                />
              </div>
            </div>

            <div className="grid-cols-3 gap-10 items-center mt-20 p-16 border-ec rounded-5">
              {[
                { label: "Earnings", value: "$545.69", color: "#6C63FF" },
                { label: "Profit", value: "$256.34", color: "#00CFE8" },
                { label: "Expense", value: "$74.19", color: "#FF4C51" },
              ].map((item, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <p className="text-gray small-text font-500">{item.label}</p>
                  <h3 className="title-text text-dark font-600">
                    {item.value}
                  </h3>
                  <div
                    style={{
                      height: "6px",
                      background: "#eee",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "100%",
                        background: item.color,
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="w-50 bg-white rounded-5">
          <div className="px-24 py-15">
            <h3 className="title-text text-dark font-600">Support Tracker</h3>
            <p className="small-text mt-5 text-gray">Last 7 Days</p>

            <div className="flex gap-12 items-end">
              <div className="w-50">
                <h2 className="large-text text-dark font-600">$468</h2>
                <p className="text-gray font-500 small-text mt-6">
                  You informed of this week compared to last week
                </p>
              </div>

              <div className="w-50">
                <Chart
                  options={barOptions}
                  series={barSeries}
                  type="bar"
                  height={150}
                />
              </div>
            </div>

            <div className="mt-20 p-16 border-ec rounded-5">
              <p className="text-dark font-600 small-text">Last Week</p>
              <div className="grid-cols-3 gap-10 items-center mt-8">
                {[
                  {
                    label: "New Tickets",
                    value: "142",
                    bg: "#E9E7FD",
                    color: "#6C63FF",
                    icon: "🎟️",
                  },
                  {
                    label: "Open Tickets",
                    value: "28",
                    bg: "#DFF5F8",
                    color: "#00CFE8",
                    icon: "✓",
                  },
                  {
                    label: "Response Time",
                    value: "1 Day",
                    bg: "#FFEFE2",
                    color: "#FF9F43",
                    icon: "⏱️",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-10">
                    <div
                      style={{
                        background: item.bg,
                        color: item.color,
                      }}
                      className="common-img rounded-5 flex items-center justify-center small-text"
                    >
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-dark small-text font-500">
                        {item.label}
                      </p>
                      <p className="text-gray small-text font-500 mt-2">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-cols-2 gap-12 mt-12">
        <div className="w-full bg-white rounded-5">
          <div className="px-24 py-15">
            <h3 className="title-text text-dark font-600">Vehicles Overview</h3>

            {/* Labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              <span>On the way</span>
              <span>Unloading</span>
              <span>Loading</span>
              <span>Waiting</span>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                display: "flex",
                height: "40px",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "10px",
                background: "#eee",
              }}
            >
              <p
                style={{
                  width: "39.7%",
                  background: "#CFCFD6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                28.3%
              </p>
              <p
                style={{
                  width: "28.3%",
                  background: "#6C63FF",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                28.3%
              </p>
              <p
                style={{
                  width: "17.4%",
                  background: "#00CFE8",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                17.4%
              </p>
              <p
                style={{
                  width: "14.6%",
                  background: "#2F2F3A",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                14.6%
              </p>
            </div>

            {/* List Items */}
            {[
              { label: "On the way", time: "2hr 10min", percent: "39.7%" },
              { label: "Unloading", time: "3hr 15min", percent: "28.3%" },
              { label: "Loading", time: "1hr 24min", percent: "17.4%" },
              { label: "Waiting", time: "5hr 19min", percent: "14.6%" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: i !== 3 ? "1px solid #eee" : "none",
                }}
                className="flex items-center justify-between py-12 px-7"
              >
                <span className="text-gray small-text font-500">
                  {item.label}
                </span>

                <div style={{ textAlign: "right" }}>
                  <p className="text-dark small-text font-500">{item.time}</p>
                  <p className="text-gray mini-text font-500">{item.percent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-white rounded-5">
          <div className="px-24 py-15">
            <h3 className="title-text text-dark font-600">Earning Reports</h3>
            <p className="text-gray small-text font-500 mt-5">
              Yearly Earnings Overview
            </p>

            {/* TABS */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["Orders", "Sales", "Profit"].map((tab, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: i === 0 ? "1px solid #6C63FF" : "1px dashed #ddd",
                    background: i === 0 ? "#F4F3FF" : "#FAFAFA",
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      margin: "0 auto 6px",
                      borderRadius: "8px",
                      background: "#E7E7F3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {tab === "+" ? "+" : "📊"}
                  </div>
                  <p style={{ fontSize: "13px" }}>{tab}</p>
                </div>
              ))}
            </div>

            {/* APEX CHART */}
            <div className="mt-12">
              <Chart
                options={earningOptions}
                series={earningSeries}
                type="bar"
                height={260}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMonitoring;
