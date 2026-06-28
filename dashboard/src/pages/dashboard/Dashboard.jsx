import React from "react";
import Chart from "react-apexcharts";
import GenericContainer from "../utility/GenericContainer";
import DashImg from "../../assets/dashimg.png";
import GenericChart from "../utility/GenericChart";
import GenericTabs from "../utility/GenericTabs";
import GenericTable from "../utility/GenericTable";

const Dasboard = () => {
  const dashcount = [
    {
      title: "Total Products",
      value: "100+",
      change: "+55%",
    },
    {
      title: "Total Amount",
      value: "40K",
      change: "+55%",
    },
    {
      title: "Total Orders",
      value: "90",
      change: "+55%",
    },
    {
      title: "Total Customers",
      value: "30+",
      change: "+55%",
    },
  ];
  const categories = [
    { name: "Electronics", count: 12 },
    { name: "Fashion", count: 18 },
    { name: "Home & Kitchen", count: 9 },
    { name: "Beauty & Personal Care", count: 14 },
    { name: "Sports & Fitness", count: 7 },
  ];
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      category: "Electronics",
      price: 12099,
      stock: 25,
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      category: "Fashion",
      price: 15000,
      stock: 40,
    },
    {
      id: 3,
      name: "Wooden Dining Table",
      category: "Home & Kitchen",
      price: 49009,
      stock: 10,
    },
    {
      id: 7,
      name: "Dell XPS 13 Laptop",
      category: "Electronics",
      price: 14909,
      stock: 8,
      status: "Low Stock",
    },
    {
      id: 8,
      name: "Office Chair Ergonomic",
      category: "Home & Kitchen",
      price: 22000,
      stock: 20,
    },
  ];
  const product = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      category: "Electronics",
      price: "₹1,29,000",
      stock: 25,
      sales: 320,
      revenue: "₹4,12,80,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      category: "Fashion",
      price: "₹12,000",
      stock: 40,
      sales: 210,
      revenue: "₹25,20,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Wooden Dining Table",
      category: "Home & Kitchen",
      price: "₹35,000",
      stock: 10,
      sales: 85,
      revenue: "₹29,75,000",
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Samsung 55” 4K TV",
      category: "Electronics",
      price: "₹75,000",
      stock: 15,
      sales: 140,
      revenue: "₹1,05,00,000",
      status: "Active",
    },
  ];
  const columns = [
    { label: "Product Name", field: "name" },
    { label: "Category", field: "category" },
    { label: "Price", field: "price" },
    { label: "Stock", field: "stock" },
    { label: "Sales", field: "sales" },
    { label: "Revenue", field: "revenue" },
    { label: "Status", field: "status" },
  ];

  const barOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: "65%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      offsetY: -9,
      labels: {
        show: true,
        axisBorder: { show: false },
        axisTicks: { show: false },
        style: {
          colors: "#9aa0ac",
          fontSize: "12px",
        },
      },
    },
    grid: {
      padding: {
        bottom: 20, // increase if still cut
      },
    },
    colors: [
      "#E7E7F3",
      "#E7E7F3",
      "#E7E7F3",
      "#E7E7F3",
      "#6C63FF",
      "#E7E7F3",
      "#E7E7F3",
    ],
    tooltip: { enabled: true },
  };

  const barSeries = [
    {
      data: [120, 180, 150, 140, 260, 170, 210],
    },
  ];

  return (
    <GenericContainer version="v3" className="">
      <div className="flex items-start w-full gap-12">
        <div className="w-30 grid-cols-1 gap-12">
          <div className="bg-secondary px-20 py-10 rounded-5">
            <div className="flex items-center">
              <div className="w-65">
                <h2 className="title-text font-600 text-white">Super Admin</h2>
                <p className="small-text font-400 text-white">
                  Best seller of the month
                </p>
                <h3 className="title-text font-600 text-white pt-10">$48.9k</h3>
                <button className="bg-white mini-text px-16 py-4 rounded-5 text-secondary border-0 mt-4 cursor-pointer">
                  View Sales
                </button>
              </div>
              <div className="w-35">
                <img
                  src={DashImg}
                  alt="Dash-Profile"
                  className="object-contain w-full flex h-150"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-5 pb-25">
            <div className="px-14 py-12 bordb">
              <p className="para-text capitalize text-dark font-500">
                Order Management
              </p>
            </div>
            <GenericChart
              type="donut"
              height={260}
              categories={["Pending", "Confirmed", "Shipped", "Delivered"]}
              series={[25, 40, 30, 34]}
              colors={[
                "#f97316",
                "#a855f7",
                "#3b82f6",
                "#10b981",
                "var(--primary)",
              ]}
              options={{
                chart: {
                  offsetY: 10,
                  fontFamily: "Poppins, sans-serif",
                },

                stroke: {
                  show: true,
                  width: 6,
                },

                grid: {
                  padding: {
                    top: 20,
                    bottom: -120,
                  },
                },

                plotOptions: {
                  pie: {
                    startAngle: -95,
                    endAngle: 95,
                    offsetY: -10,

                    donut: {
                      size: "70%",
                      labels: {
                        show: true,

                        name: {
                          offsetY: -45,
                        },

                        value: {
                          fontSize: "22px",
                          fontWeight: 600,
                          offsetY: -25,
                          formatter: () => "20,000",
                        },

                        total: {
                          show: true,
                          label: "Total Sales",
                          offsetY: 10,
                          formatter: () => "$1,000,000",
                        },
                      },
                    },
                  },
                },
                legend: {
                  position: "bottom",
                },
                dataLabels: { enabled: false },
              }}
            />
          </div>
          <div className="bg-white rounded-5">
            <div className="px-14 py-12 bordb">
              <p className="para-text capitalize text-dark font-500">
                Top Category
              </p>
            </div>
            <div className="py-14 px-16 grid-cols-1 gap-10">
              {categories.map((item, index) => (
                <div key={index} className="flex items-center">
                  <p className="small-text capitalize text-gray font-500 w-90">
                    {item.name}
                  </p>

                  <div className="w-10 flex justify-center">
                    <p className="mini-text text-primary bg-forth flex items-center justify-center rounded-full font-500 icon">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-5">
            <div className="px-14 py-12 bordb">
              <p className="para-text capitalize text-dark font-500">
                Top Products
              </p>
            </div>
            <div className="py-14 px-16 grid-cols-1 gap-10">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="w-80">
                    <p className="text-dark small-text font-500">{item.name}</p>
                    <p className="mini-text text-gray">{item.category}</p>
                  </div>

                  <div className="text-right w-20">
                    <p className="text-success small-text font-600">
                      ₹{item.price}
                    </p>
                    <p className="mini-text text-gray">Stock: {item.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-70 grid-cols-1 gap-12">
          <div className="flex items-start w-full gap-12">
            <div className="w-70 grid-cols-1 gap-12">
              <div className="bg-white rounded-5">
                <div className="px-18 py-15">
                  <h3 className="title-text text-dark font-600">
                    Earning Reports
                  </h3>
                  <p className="mini-text text-gray">
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

                  <div className="grid-cols-3 gap-10 items-center mt-10 p-16 border-ec rounded-5">
                    {[
                      { label: "Earnings", value: "$545.69", color: "#6C63FF" },
                      { label: "Profit", value: "$256.34", color: "#00CFE8" },
                      { label: "Expense", value: "$74.19", color: "#FF4C51" },
                    ].map((item, i) => (
                      <div key={i} style={{ flex: 1 }}>
                        <p className="text-gray small-text font-500">
                          {item.label}
                        </p>
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
              <div className="grid-cols-2 gap-12">
                {dashcount?.map((item, index) => (
                  <div key={index} className="px-15 py-10 rounded-5 bg-white">
                    <div className="flex items-center justify-between bordb pb-3">
                      <div>
                        <p className="small-text text-gray font-500">
                          {item.title}
                        </p>
                        <h2 className="title-text test-dark font-600">
                          {item.value}
                        </h2>
                      </div>

                      <div className="">
                        <svg
                          viewBox="0 0 24 24"
                          width="17"
                          height="17"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className="flex text-primary"
                        >
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray small-text font-500 mt-5">
                      <span className="text-success">{item.change}</span> than
                      last week
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-30 grid-cols-1 gap-12">
              <div className="bg-white rounded-5">
                <div className="px-15">
                  <h4 className="text-dark mid-text font-600 pt-12">
                    Total Leads
                  </h4>
                  <p className="text-gray mini-text font-500 mt-1">Last Week</p>
                  <Chart
                    options={barOptions}
                    series={barSeries}
                    type="bar"
                    height={180}
                  />
                  <div className="flex items-end justify-between bordh py-8 mt-6">
                    <div>
                      <p className="text-dark small-text font-500">124k</p>
                      <p className="text-gray mini-text font-500">
                        Leads Overview
                      </p>
                    </div>
                    <p className="text-success mini-text font-500">+12.6%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-5">
                <div className="px-15">
                  <h4 className="text-dark mid-text font-600 pt-12">
                    Active Users
                  </h4>
                  <p className="text-gray mini-text font-500 mt-1">Last Week</p>
                  <Chart
                    options={barOptions}
                    series={barSeries}
                    type="bar"
                    height={180}
                  />
                  <div className="flex items-end justify-between bordh py-8 mt-6">
                    <div>
                      <p className="text-dark small-text font-500">124k</p>
                      <p className="text-gray mini-text font-500">
                        Active User Overview
                      </p>
                    </div>
                    <p className="text-danger mini-text font-500">+12.6%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-5">
            <div className="px-18 py-16 bordb">
              <p className="para-text capitalize text-dark font-500">
                Yearly Revenue Insights
              </p>
            </div>
            <div className="px-15">
              <GenericChart
                type="bar"
                series={[
                  {
                    name: "Revenue",
                    data: [
                      15000, 22000, 18000, 26000, 32000, 30000, 42000, 18000,
                      26000, 20000, 20000, 30000,
                    ],
                  },
                ]}
                colors={["var(--secondary)"]}
                height={380}
                options={{
                  chart: {
                    fontFamily: "Poppins, sans-serif",
                    toolbar: {
                      show: false,
                    },
                  },

                  plotOptions: {
                    bar: {
                      borderRadius: 6,
                      columnWidth: "85%", // ✅ thick bars
                    },
                  },

                  stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
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
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    tickPlacement: "on", // 👈 important
                    labels: {
                      rotate: 0, // 👈 prevent auto-rotation
                      hideOverlappingLabels: false, // 👈 show all months
                      style: {
                        fontSize: "12px",
                      },
                    },
                  },

                  yaxis: {
                    title: { text: "Revenue (₹)" },
                    labels: {
                      formatter: (val) => `₹${val / 1000}K`,
                    },
                  },

                  tooltip: {
                    y: {
                      formatter: (val) => `₹${val.toLocaleString()}`,
                    },
                  },

                  grid: {
                    borderColor: "#e5e7eb",
                    strokeDashArray: 4,
                  },

                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "light",
                      type: "vertical",
                      shadeIntensity: 0.3,
                      opacityFrom: 1,
                      opacityTo: 2,
                      stops: [0, 100],
                    },
                  },

                  states: {
                    hover: {
                      filter: {
                        type: "lighten",
                        value: 0.1,
                      },
                    },
                  },

                  responsive: [
                    {
                      breakpoint: 768,
                      options: {
                        plotOptions: {
                          bar: {
                            columnWidth: "70%",
                          },
                        },
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </GenericContainer>
  );
};

export default Dasboard;
