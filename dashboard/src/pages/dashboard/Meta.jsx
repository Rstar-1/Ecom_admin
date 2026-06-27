import React from "react";
import GenericContainer from "../utility/GenericContainer";
import Chart from "react-apexcharts";
import "./Meta.css";

const Meta = () => {
  // Line Chart options using theme colors
  const lineOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Poppins, sans-serif",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#F1F1F4",
      strokeDashArray: 5,
    },
    colors: ["#7367F0", "#6C63FF", "#1CB012"], // Spend (primary), Clicks (secondary), Leads (success)
    xaxis: {
      categories: ["May 20", "May 21", "May 22", "May 23", "May 24", "May 25", "May 26"],
      labels: {
        style: {
          colors: "#9AA0AC",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          if (val === 0) return "$0";
          if (val >= 1000) return `$${val / 1000}K`;
          return `$${val}`;
        },
        style: {
          colors: "#9AA0AC",
          fontSize: "12px",
        },
      },
      min: 0,
      max: 6000,
      tickAmount: 3,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      show: false,
    }
  };

  const lineSeries = [
    {
      name: "Spend",
      data: [3500, 4300, 4000, 4500, 5500, 4800, 5200],
    },
    {
      name: "Clicks",
      data: [2200, 2800, 2400, 2900, 3400, 2900, 3100],
    },
    {
      name: "Leads",
      data: [600, 1100, 800, 1000, 1200, 900, 1050],
    },
  ];

  // Donut Chart options using theme colors (Facebook: primary, Instagram: warning, WhatsApp: success)
  const donutOptions = {
    chart: {
      type: "donut",
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#7367F0", "#FB5711", "#1CB012"], // Primary (purple), Warning (orange), Success (green)
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
              color: "#9AA0AC",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              color: "#2F2F3B",
              offsetY: 8,
              formatter: (val) => val,
            },
            total: {
              show: true,
              label: "Total Leads",
              fontSize: "11px",
              color: "#9AA0AC",
              formatter: () => "2,543",
            },
          },
        },
      },
    },
  };

  const donutSeries = [1256, 842, 445];

  return (
    <GenericContainer version="v3" className="py-10 px-15">
      
      {/* 1. TOP STAT CARDS */}
      <div className="meta-stats-grid">
        
        {/* Card 1: Total Spend */}
        <div className="meta-stat-card">
          <div>
            <p className="text-gray small-text font-500">Total Spend</p>
            <h2 className="title-text text-dark font-600 mt-5">$12,543.65</h2>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-8">
              <span className="text-success small-text font-600">↑ 18.6%</span>
              <span className="text-gray mini-text font-500">vs May 13 - 19</span>
            </div>
          </div>
          <div className="meta-stat-icon bg-light-primary text-secondary">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <path d="M16 10a2 2 0 0 0-2-2h-3a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-3a2 2 0 0 1-2-2"></path>
            </svg>
          </div>
        </div>

        {/* Card 2: Total Impressions */}
        <div className="meta-stat-card">
          <div>
            <p className="text-gray small-text font-500">Total Impressions</p>
            <h2 className="title-text text-dark font-600 mt-5">1,234,567</h2>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-8">
              <span className="text-success small-text font-600">↑ 15.3%</span>
              <span className="text-gray mini-text font-500">vs May 13 - 19</span>
            </div>
          </div>
          <div className="meta-stat-icon bg-light-secondary text-secondary">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
        </div>

        {/* Card 3: Total Clicks */}
        <div className="meta-stat-card">
          <div>
            <p className="text-gray small-text font-500">Total Clicks</p>
            <h2 className="title-text text-dark font-600 mt-5">34,567</h2>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-8">
              <span className="text-success small-text font-600">↑ 21.4%</span>
              <span className="text-gray mini-text font-500">vs May 13 - 19</span>
            </div>
          </div>
          <div className="meta-stat-icon bg-light-warning text-warning">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
              <path d="M13 13l6 6"></path>
            </svg>
          </div>
        </div>

        {/* Card 4: Total Leads */}
        <div className="meta-stat-card">
          <div>
            <p className="text-gray small-text font-500">Total Leads</p>
            <h2 className="title-text text-dark font-600 mt-5">2,543</h2>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-8">
              <span className="text-success small-text font-600">↑ 19.8%</span>
              <span className="text-gray mini-text font-500">vs May 13 - 19</span>
            </div>
          </div>
          <div className="meta-stat-icon bg-light-success text-success">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Card 5: CTR */}
        <div className="meta-stat-card">
          <div>
            <p className="text-gray small-text font-500">CTR</p>
            <h2 className="title-text text-dark font-600 mt-5">2.80%</h2>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-8">
              <span className="text-success small-text font-600">↑ 5.2%</span>
              <span className="text-gray mini-text font-500">vs May 13 - 19</span>
            </div>
          </div>
          <div className="meta-stat-icon bg-light-danger text-danger">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
        </div>

      </div>

      {/* 2. SECOND ROW (Performance Line Chart & Leads Donut Chart) */}
      <div className="meta-chart-row-grid">
        
        {/* Left Side: Performance Trend Line Chart */}
        <div className="meta-chart-card">
          <div className="meta-flex-row meta-justify-between meta-align-center mb-10">
            <h3 className="title-text text-dark font-600">Performance Trend</h3>
            
            <div className="meta-flex-row meta-align-center meta-gap-12">
              {/* Custom Legend */}
              <div className="meta-flex-row meta-gap-12">
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  <span className="meta-legend-dot" style={{ background: "#7367F0" }}></span>
                  <span className="mini-text text-gray font-500">Spend</span>
                </div>
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  <span className="meta-legend-dot bg-secondary"></span>
                  <span className="mini-text text-gray font-500">Clicks</span>
                </div>
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  <span className="meta-legend-dot bg-success"></span>
                  <span className="mini-text text-gray font-500">Leads</span>
                </div>
              </div>
              
              <select className="border-ec bg-white px-10 py-5 rounded-5 mini-text font-500 text-gray cursor-pointer outline-none">
                <option>7 Days</option>
                <option>30 Days</option>
              </select>
            </div>
          </div>
          
          <Chart options={lineOptions} series={lineSeries} type="line" height={220} />
        </div>

        {/* Right Side: Leads by Platform Donut Chart */}
        <div className="meta-chart-card meta-flex-col meta-justify-between">
          <div className="meta-flex-row meta-justify-between meta-align-center mb-10">
            <h3 className="title-text text-dark font-600">Leads by Platform</h3>
            <select className="border-ec bg-white px-10 py-5 rounded-5 mini-text font-500 text-gray cursor-pointer outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>

          <div className="meta-donut-chart-container">
            {/* Donut graphic */}
            <div className="meta-donut-wrapper">
              <Chart options={donutOptions} series={donutSeries} type="donut" width="100%" />
            </div>
            
            {/* Custom List Legend */}
            <div className="meta-legend-list">
              <div className="meta-legend-item">
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  <span className="meta-legend-dot" style={{ background: "#7367F0" }}></span>
                  <span className="small-text text-gray font-500">Facebook</span>
                </div>
                <span className="small-text text-dark font-600">1,256 (49.4%)</span>
              </div>
              <div className="meta-legend-item">
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  <span className="meta-legend-dot bg-warning"></span>
                  <span className="small-text text-gray font-500">Instagram</span>
                </div>
                <span className="small-text text-dark font-600">842 (33.1%)</span>
              </div>
              <div className="meta-legend-item">
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  <span className="meta-legend-dot bg-success"></span>
                  <span className="small-text text-gray font-500">WhatsApp</span>
                </div>
                <span className="small-text text-dark font-600">445 (17.5%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. THIRD ROW (Social Overview, Top Campaigns Table, Latest Leads List) */}
      <div className="meta-details-row-grid">
        
        {/* Left Side: Social Overview Cards */}
        <div className="meta-details-card">
          <div className="meta-flex-row meta-justify-between meta-align-center mb-12">
            <h3 className="title-text text-dark font-600">Social Overview</h3>
            <span className="cursor-pointer text-gray">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
          </div>

          <div className="meta-social-flex">
            {/* Facebook Card */}
            <div className="meta-social-card">
              <div className="meta-flex-row meta-align-center meta-gap-8 mb-8">
                <div className="meta-flex-row meta-align-center meta-justify-center rounded-full bg-light-secondary text-secondary" style={{ width: "26px", height: "26px", display: "flex" }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
                <span className="mini-text text-dark font-600">Facebook</span>
              </div>
              <div className="meta-flex-col meta-gap-8">
                <div>
                  <p className="mini-text text-gray font-500">Likes</p>
                  <h4 className="small-text text-dark font-600">11,890</h4>
                </div>
                <div>
                  <p className="mini-text text-gray font-500">Followers</p>
                  <h4 className="small-text text-dark font-600">12,540</h4>
                </div>
              </div>
              <span className="text-success mini-text font-600 mt-10">↑ 8.6% vs 7d</span>
            </div>

            {/* Instagram Card */}
            <div className="meta-social-card">
              <div className="meta-flex-row meta-align-center meta-gap-8 mb-8">
                <div className="meta-flex-row meta-align-center meta-justify-center rounded-full bg-light-warning text-warning" style={{ width: "26px", height: "26px", display: "flex" }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <span className="mini-text text-dark font-600">Instagram</span>
              </div>
              <div className="meta-flex-col meta-gap-8">
                <div>
                  <p className="mini-text text-gray font-500">Followers</p>
                  <h4 className="small-text text-dark font-600">8,540</h4>
                </div>
                <div>
                  <p className="mini-text text-gray font-500">Following</p>
                  <h4 className="small-text text-dark font-600">245</h4>
                </div>
              </div>
              <span className="text-success mini-text font-600 mt-10">↑ 6.3% vs 7d</span>
            </div>
          </div>
        </div>

        {/* Middle Side: Top Campaigns Table */}
        <div className="meta-details-card meta-flex-col meta-justify-between">
          <div className="meta-flex-row meta-justify-between meta-align-center mb-10">
            <h3 className="title-text text-dark font-600">Top Campaigns</h3>
            <span className="small-text text-primary font-600 cursor-pointer hover:underline">View All</span>
          </div>

          <div className="meta-table-wrapper">
            <table className="meta-campaign-table">
              <thead>
                <tr className="border-b" style={{ borderColor: "#F1F1F4" }}>
                  <th className="py-6 mini-text text-gray font-600 uppercase">Campaign Name</th>
                  <th className="py-6 mini-text text-gray font-600 uppercase text-right">Spend</th>
                  <th className="py-6 mini-text text-gray font-600 uppercase text-right">Leads</th>
                  <th className="py-6 mini-text text-gray font-600 uppercase text-right">CTR</th>
                  <th className="py-6 mini-text text-gray font-600 uppercase text-right">CPL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Summer Sale 2024", spend: "$3,245.67", leads: "865", ctr: "2.73%", cpl: "$3.75" },
                  { name: "Lead Gen - May", spend: "$2,932.50", leads: "642", ctr: "2.86%", cpl: "$4.56" },
                  { name: "Awareness - Brand", spend: "$2,412.40", leads: "-", ctr: "1.35%", cpl: "-" },
                  { name: "Retargeting - Visitors", spend: "$2,105.34", leads: "312", ctr: "1.67%", cpl: "$6.75" },
                  { name: "Product Launch", spend: "$1,847.74", leads: "289", ctr: "2.16%", cpl: "$6.39" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b" style={{ borderColor: "#F1F1F4" }}>
                    <td className="py-8 small-text text-secondary font-500" style={{ whiteSpace: "nowrap" }}>{row.name}</td>
                    <td className="py-8 small-text text-dark font-600 text-right">{row.spend}</td>
                    <td className="py-8 small-text text-secondary font-500 text-right">{row.leads}</td>
                    <td className="py-8 small-text text-secondary font-500 text-right">{row.ctr}</td>
                    <td className="py-8 small-text text-secondary font-500 text-right">{row.cpl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Latest Leads List */}
        <div className="meta-details-card">
          <div className="meta-flex-row meta-justify-between meta-align-center mb-12">
            <h3 className="title-text text-dark font-600">Latest Leads</h3>
            <span className="small-text text-primary font-600 cursor-pointer hover:underline">View All</span>
          </div>

          <div className="meta-lead-list">
            {[
              { init: "JS", bg: "var(--secondary)", name: "John Smith", date: "May 26, 10:30 AM", type: "fb" },
              { init: "AM", bg: "var(--warning)", name: "Ava Martin", date: "May 26, 09:45 AM", type: "ig" },
              { init: "RP", bg: "var(--success)", name: "Ravi Patel", date: "May 25, 04:15 PM", type: "wa" },
              { init: "LS", bg: "var(--secondary)", name: "Liam Scott", date: "May 25, 11:20 AM", type: "fb" },
              { init: "SN", bg: "var(--warning)", name: "Sophia Nguyen", date: "May 24, 03:50 PM", type: "ig" }
            ].map((lead, idx) => (
              <div key={idx} className="meta-lead-item">
                <div className="meta-lead-info">
                  {/* Initials Circle */}
                  <div className="meta-lead-initials small-text font-600" style={{ background: lead.bg }}>
                    {lead.init}
                  </div>
                  <div>
                    <h4 className="small-text text-dark font-600">{lead.name}</h4>
                    <p className="mini-text text-gray font-500">{lead.date}</p>
                  </div>
                </div>

                {/* Platform Icon and Navigation Arrow */}
                <div className="meta-flex-row meta-align-center meta-gap-8">
                  {lead.type === "fb" && (
                    <span className="text-secondary flex">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </span>
                  )}
                  {lead.type === "ig" && (
                    <span className="text-warning flex">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      </svg>
                    </span>
                  )}
                  {lead.type === "wa" && (
                    <span className="text-success flex">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </span>
                  )}
                  <span className="text-gray cursor-pointer flex">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. FOURTH ROW (WhatsApp Performance Banner) */}
      <div className="meta-whatsapp-banner">
        <div className="meta-flex-row meta-align-center" style={{ gap: "20px" }}>
          {/* Logo container */}
          <div className="meta-flex-row meta-align-center meta-justify-center bg-light-success text-success rounded-5" style={{ width: "42px", height: "42px", display: "flex" }}>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <div>
            <h3 className="title-text text-dark font-600">WhatsApp Performance</h3>
            <p className="mini-text text-gray font-500 mt-2">Aggregated campaign interaction logs</p>
          </div>
        </div>

        {/* 4 stats columns */}
        <div className="meta-whatsapp-stats">
          <div>
            <p className="mini-text text-gray font-500">Conversations Started</p>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-4">
              <h4 className="title-text text-dark font-600">1,256</h4>
              <span className="text-success mini-text font-600">↑ 18.6%</span>
            </div>
          </div>
          <div>
            <p className="mini-text text-gray font-500">Cost Per Conversation</p>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-4">
              <h4 className="title-text text-dark font-600">$0.41</h4>
              <span className="text-success mini-text font-600">↑ 7.3%</span>
            </div>
          </div>
          <div>
            <p className="mini-text text-gray font-500">Messages Sent</p>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-4">
              <h4 className="title-text text-dark font-600">2,345</h4>
              <span className="text-success mini-text font-600">↑ 21.3%</span>
            </div>
          </div>
          <div>
            <p className="mini-text text-gray font-500">Click to WhatsApp</p>
            <div className="meta-flex-row meta-align-center meta-gap-8 mt-4">
              <h4 className="title-text text-dark font-600">3,456</h4>
              <span className="text-success mini-text font-600">↑ 19.8%</span>
            </div>
          </div>
        </div>

        {/* 3D Chat Graphic Decoration */}
        <div className="meta-whatsapp-decoration">
          <div className="meta-whatsapp-chat-bubble">
            💬
          </div>
        </div>
      </div>

    </GenericContainer>
  );
};

export default Meta;
