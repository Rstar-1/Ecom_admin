import React, { useState } from "react";
import GenericContainer from "../utility/GenericContainer";
import Chart from "react-apexcharts";
import "./Settings.css";

const Settings = () => {
  const [dateRange, setDateRange] = useState("May 12 - May 18, 2024");

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
      },
      min: 0,
      max: 6000,
      tickAmount: 3,
    },
    dataLabels: { enabled: false },
    tooltip: { shared: true },
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
              fontSize: "12px",
              color: "#5f6368",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "18px",
              fontWeight: 600,
              color: "#202124",
              offsetY: 6,
              formatter: (val) => `${(val / 1000).toFixed(1)}K`,
            },
            total: {
              show: true,
              label: "Users",
              fontSize: "11px",
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
              fontSize: "12px",
              color: "#5f6368",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "18px",
              fontWeight: 600,
              color: "#202124",
              offsetY: 6,
              formatter: (val) => `${(val / 1000).toFixed(1)}K`,
            },
            total: {
              show: true,
              label: "Users",
              fontSize: "11px",
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
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#5f6368",
          fontSize: "11px",
        },
      },
    },
  };

  const channelSeries = [
    {
      name: "Users",
      data: [723, 1200, 1800, 3600, 5200],
    },
  ];

  return (
    <GenericContainer version="v3" className="py-10 px-15">
      
      {/* HEADER SECTION */}
      <div className="ga4-header-container">
        <div className="ga4-title-area">
          <h1 className="large-text text-dark font-600">Google Analytics 4 Overview</h1>
          <span className="ga4-badge-verified">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
            </svg>
          </span>
          <span className="text-gray cursor-pointer">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>

        <div className="ga4-controls-area">
          {/* Calendar Selector */}
          <button className="ga4-control-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{dateRange}</span>
          </button>
          
          {/* Filter Button */}
          <button className="ga4-control-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filters</span>
            <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* TOP STATS CARDS */}
      <div className="ga4-stats-grid">
        
        {/* Users */}
        <div className="ga4-stat-card">
          <div>
            <p className="ga4-stat-label">
              Users
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" className="text-gray">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </p>
            <h3 className="ga4-stat-value">12.6K</h3>
            <div className="ga4-stat-comparison">
              <span className="ga4-trend-up">↑ 12.5%</span>
              <span>vs May 5 - May 11</span>
            </div>
          </div>
          <div className="ga4-sparkline-container">
            <Chart options={sparklineOptions("#1a73e8")} series={[{ data: [32, 45, 30, 42, 50, 41, 48] }]} type="area" height="100%" />
          </div>
        </div>

        {/* Sessions */}
        <div className="ga4-stat-card">
          <div>
            <p className="ga4-stat-label">
              Sessions
            </p>
            <h3 className="ga4-stat-value">18.7K</h3>
            <div className="ga4-stat-comparison">
              <span className="ga4-trend-up">↑ 8.3%</span>
              <span>vs May 5 - May 11</span>
            </div>
          </div>
          <div className="ga4-sparkline-container">
            <Chart options={sparklineOptions("#1a73e8")} series={[{ data: [25, 30, 28, 38, 33, 39, 36] }]} type="area" height="100%" />
          </div>
        </div>

        {/* Page views */}
        <div className="ga4-stat-card">
          <div>
            <p className="ga4-stat-label">
              Page views
            </p>
            <h3 className="ga4-stat-value">48.3K</h3>
            <div className="ga4-stat-comparison">
              <span className="ga4-trend-up">↑ 10.6%</span>
              <span>vs May 5 - May 11</span>
            </div>
          </div>
          <div className="ga4-sparkline-container">
            <Chart options={sparklineOptions("#1a73e8")} series={[{ data: [40, 45, 38, 48, 55, 47, 52] }]} type="area" height="100%" />
          </div>
        </div>

        {/* Engaged sessions */}
        <div className="ga4-stat-card">
          <div>
            <p className="ga4-stat-label">
              Engaged sessions
            </p>
            <h3 className="ga4-stat-value">10.2K</h3>
            <div className="ga4-stat-comparison">
              <span className="ga4-trend-up">↑ 11.7%</span>
              <span>vs May 5 - May 11</span>
            </div>
          </div>
          <div className="ga4-sparkline-container">
            <Chart options={sparklineOptions("#1a73e8")} series={[{ data: [22, 28, 20, 31, 35, 29, 33] }]} type="area" height="100%" />
          </div>
        </div>

        {/* Engagement rate */}
        <div className="ga4-stat-card">
          <div>
            <p className="ga4-stat-label">
              Engagement rate
            </p>
            <h3 className="ga4-stat-value">54.6%</h3>
            <div className="ga4-stat-comparison">
              <span className="ga4-trend-up">↑ 6.4%</span>
              <span>vs May 5 - May 11</span>
            </div>
          </div>
          <div className="ga4-sparkline-container">
            <Chart options={sparklineOptions("#1a73e8")} series={[{ data: [50, 52, 51, 55, 54, 53, 54.6] }]} type="area" height="100%" />
          </div>
        </div>

        {/* Conversions */}
        <div className="ga4-stat-card">
          <div>
            <p className="ga4-stat-label">
              Conversions
            </p>
            <h3 className="ga4-stat-value">1.32K</h3>
            <div className="ga4-stat-comparison">
              <span className="ga4-trend-up">↑ 13.8%</span>
              <span>vs May 5 - May 11</span>
            </div>
          </div>
          <div className="ga4-sparkline-container">
            <Chart options={sparklineOptions("#1a73e8")} series={[{ data: [12, 15, 10, 18, 22, 16, 20] }]} type="area" height="100%" />
          </div>
        </div>

      </div>

      {/* MIDDLE ROW (Line chart + 2 Donut charts) */}
      <div className="ga4-mid-grid">
        
        {/* Line Chart: Users over time */}
        <div className="ga4-dashboard-card">
          <div className="ga4-card-header">
            <div>
              <h3 className="ga4-card-title">Users over time</h3>
              <p className="ga4-card-subtitle">Active user tracking</p>
            </div>
            <select className="border-ec bg-white px-10 py-5 rounded-5 mini-text font-500 text-gray cursor-pointer outline-none">
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <Chart options={usersOverTimeOptions} series={usersOverTimeSeries} type="area" height={220} />
            </div>
          </div>
        </div>

        {/* Donut Chart: Users by Platform */}
        <div className="ga4-dashboard-card">
          <div className="ga4-card-header">
            <div>
              <h3 className="ga4-card-title">
                Users by platform
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </h3>
              <p className="ga4-card-subtitle">Source breakdown</p>
            </div>
          </div>
          
          <div className="ga4-donut-layout">
            <div className="ga4-donut-chart-box">
              <Chart options={platformDonutOptions} series={platformSeries} type="donut" width="100%" />
            </div>
            
            <div className="ga4-donut-legend-box">
              <div className="ga4-donut-legend-item">
                <div className="flex items-center gap-8">
                  <span className="ga4-legend-color-dot" style={{ background: "#1a73e8" }}></span>
                  <span className="small-text text-gray font-500">web</span>
                </div>
                <span className="small-text text-dark font-600">8.5K (67.2%)</span>
              </div>
              <div className="ga4-donut-legend-item">
                <div className="flex items-center gap-8">
                  <span className="ga4-legend-color-dot" style={{ background: "#4285f4" }}></span>
                  <span className="small-text text-gray font-500">mobile app</span>
                </div>
                <span className="small-text text-dark font-600">3.5K (28.1%)</span>
              </div>
              <div className="ga4-donut-legend-item">
                <div className="flex items-center gap-8">
                  <span className="ga4-legend-color-dot" style={{ background: "#adcbfa" }}></span>
                  <span className="small-text text-gray font-500">tablet</span>
                </div>
                <span className="small-text text-dark font-600">593 (4.7%)</span>
              </div>
            </div>
          </div>

          <button className="ga4-card-link">
            View platforms →
          </button>
        </div>

        {/* Donut Chart: Users by Device Category */}
        <div className="ga4-dashboard-card">
          <div className="ga4-card-header">
            <div>
              <h3 className="ga4-card-title">
                Users by device category
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </h3>
              <p className="ga4-card-subtitle">Device specifications</p>
            </div>
          </div>
          
          <div className="ga4-donut-layout">
            <div className="ga4-donut-chart-box">
              <Chart options={deviceDonutOptions} series={deviceSeries} type="donut" width="100%" />
            </div>
            
            <div className="ga4-donut-legend-box">
              <div className="ga4-donut-legend-item">
                <div className="flex items-center gap-8">
                  <span className="ga4-legend-color-dot" style={{ background: "#1a73e8" }}></span>
                  <span className="small-text text-gray font-500">desktop</span>
                </div>
                <span className="small-text text-dark font-600">7.7K (61.3%)</span>
              </div>
              <div className="ga4-donut-legend-item">
                <div className="flex items-center gap-8">
                  <span className="ga4-legend-color-dot" style={{ background: "#4285f4" }}></span>
                  <span className="small-text text-gray font-500">mobile</span>
                </div>
                <span className="small-text text-dark font-600">4.3K (33.8%)</span>
              </div>
              <div className="ga4-donut-legend-item">
                <div className="flex items-center gap-8">
                  <span className="ga4-legend-color-dot" style={{ background: "#adcbfa" }}></span>
                  <span className="small-text text-gray font-500">tablet</span>
                </div>
                <span className="small-text text-dark font-600">616 (4.9%)</span>
              </div>
            </div>
          </div>

          <button className="ga4-card-link">
            View devices →
          </button>
        </div>

      </div>

      {/* BOTTOM ROW (Bar chart + World map + Pages table) */}
      <div className="ga4-bottom-grid">
        
        {/* Horizontal Bar Chart: Channel Group */}
        <div className="ga4-dashboard-card">
          <div className="ga4-card-header">
            <div>
              <h3 className="ga4-card-title">
                Users by Session primary channel group
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </h3>
              <p className="ga4-card-subtitle">Channel acquisition details</p>
            </div>
          </div>

          <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <Chart options={channelBarOptions} series={channelSeries} type="bar" height={200} />
            </div>
          </div>

          <button className="ga4-card-link">
            View traffic acquisition →
          </button>
        </div>

        {/* Map Card: Users by Country */}
        <div className="ga4-dashboard-card">
          <div className="ga4-card-header">
            <div>
              <h3 className="ga4-card-title">
                Users by country
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </h3>
              <p className="ga4-card-subtitle">Demographics overview</p>
            </div>
          </div>

          <div className="ga4-country-layout">
            <div className="ga4-map-container">
              {/* Minimal Vector Map */}
              <svg viewBox="0 0 340 180" style={{ width: "100%", height: "auto" }}>
                {/* Landmass Paths */}
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
                
                {/* Pulsing Hotspots (India, USA, Canada, UK, Australia) */}
                {/* USA */}
                <circle cx="55" cy="50" r="4" fill="#1a73e8" />
                <circle cx="55" cy="50" r="4" className="ga4-pulse-circle" />
                
                {/* Canada */}
                <circle cx="65" cy="35" r="4" fill="#4285f4" />
                <circle cx="65" cy="35" r="4" className="ga4-pulse-circle" />

                {/* UK */}
                <circle cx="155" cy="35" r="4" fill="#1a73e8" />
                <circle cx="155" cy="35" r="4" className="ga4-pulse-circle" />

                {/* India */}
                <circle cx="215" cy="65" r="4" fill="#1a73e8" />
                <circle cx="215" cy="65" r="4" className="ga4-pulse-circle" />

                {/* Australia */}
                <circle cx="275" cy="128" r="4" fill="#1a73e8" />
                <circle cx="275" cy="128" r="4" className="ga4-pulse-circle" />
              </svg>
            </div>

            <div className="ga4-country-list">
              <div className="ga4-country-item">
                <span className="font-500">India</span>
                <span className="font-600">2.6K</span>
              </div>
              <div className="ga4-country-item">
                <span className="font-500">United States</span>
                <span className="font-600">2.1K</span>
              </div>
              <div className="ga4-country-item">
                <span className="font-500">Canada</span>
                <span className="font-600">1.1K</span>
              </div>
              <div className="ga4-country-item">
                <span className="font-500">United Kingdom</span>
                <span className="font-600">842</span>
              </div>
              <div className="ga4-country-item">
                <span className="font-500">Australia</span>
                <span className="font-600">673</span>
              </div>
            </div>
          </div>

          <button className="ga4-card-link">
            View countries →
          </button>
        </div>

        {/* Table Card: Top Pages by Views */}
        <div className="ga4-dashboard-card">
          <div className="ga4-card-header">
            <div>
              <h3 className="ga4-card-title">
                Top pages by Views
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </h3>
              <p className="ga4-card-subtitle">Active screen stats</p>
            </div>
          </div>

          <div style={{ flexGrow: 1 }}>
            <table className="ga4-pages-table">
              <thead>
                <tr>
                  <th>PAGE</th>
                  <th style={{ textAlign: "right" }}>VIEWS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { path: "/", views: "8.6K" },
                  { path: "/shop", views: "5.4K" },
                  { path: "/product/123", views: "2.9K" },
                  { path: "/blog", views: "2.1K" },
                  { path: "/about", views: "1.8K" },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="font-500" style={{ color: "#1a73e8", cursor: "pointer" }}>{row.path}</td>
                    <td className="font-600" style={{ textAlign: "right" }}>{row.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="ga4-card-link">
            View pages and screens →
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <div className="ga4-footer">
        © 2024 Google Analytics
      </div>

    </GenericContainer>
  );
};

export default Settings;
