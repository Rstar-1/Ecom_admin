import React from "react";
import GenericChart from "../utility/GenericChart";
import GenericTabs from "../utility/GenericTabs";
import GenericTable from "../utility/GenericTable";

const SaleMonitoring = () => {
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

  return (
    <div className="py-9 px-12">
      <div className="grid-cols-4 gap-12">
        {dashcount.map((item, index) => (
          <div key={index} className="px-16 py-10 rounded-5 bg-white">
            <div>
              <div className="flex items-start justify-between">
                <div className="">
                  <h2 className="head-text text-dark font-600">{item.value}</h2>
                  <p className="text-primary small-text mt-2">Total Amount</p>
                </div>
                <div className="up-box flex items-center justify-center bg-primary rounded-5 mt-5">
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="flex text-white"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p className="mini-text text-gray font-500">{item.title}</p>
                <div className="text-right">
                  <p className="text-success mini-text font-500">
                    {item.change}
                  </p>
                  <p className="text-gray mini-text font-500">Last week</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-start w-full gap-12 mt-12">
        <div className="w-70 grid-cols-1 gap-12">
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
                colors={["var(--primary)"]}
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

          <div className="grid-cols-4 gap-12">
            <div className="bg-white rounded-5 px-12 py-29">
              <h4 className="large-text text-primary font-600 text-center">
                23
              </h4>
              <p className="small-text text-center capitalize text-gray mt-5 font-500">
                Top Category
              </p>
            </div>
             <div className="bg-white rounded-5 px-12 py-29">
              <h4 className="large-text text-info font-600 text-center">
                49
              </h4>
              <p className="small-text text-center capitalize text-gray mt-5 font-500">
                Top Category
              </p>
            </div>
             <div className="bg-white rounded-5 px-12 py-29">
              <h4 className="large-text text-warning font-600 text-center">
                50
              </h4>
              <p className="small-text text-center capitalize text-gray mt-5 font-500">
                Top Category
              </p>
            </div>
             <div className="bg-white rounded-5 px-12 py-29">
              <h4 className="large-text text-success font-600 text-center">
                73
              </h4>
              <p className="small-text text-center capitalize text-gray mt-5 font-500">
                Top Category
              </p>
            </div>
          </div>
        </div>

        <div className="w-30 grid-cols-1 gap-12">
          <div className="bg-white rounded-5">
            <div className="px-16 py-14 bordb">
              <p className="para-text capitalize text-dark font-500">
                Top Category
              </p>
            </div>
            <GenericChart
              type="donut"
              height={260}
              categories={["Website", "Apps", "Mobile App", "Store", "Android"]}
              series={[25, 20, 40, 30, 34]}
              colors={[
                "#10b981",
                "#a855f7",
                "#3b82f6",
                "#f97316",
                "var(--primary)",
              ]}
              options={{
                chart: {
                  offsetY: 10,
                  fontFamily: "Poppins, sans-serif",
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
                          offsetY: -40,
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
            <div className="py-24 px-22 grid-cols-1 gap-10">
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
          <div className="bg-white rounded-5 px-12 py-41"></div>
        </div>
      </div>
      <div className="mt-12">
          <GenericTable
            title="Product Sales"
            columns={columns}
            data={product}
            total={product.length}
            limit={10}
            showExport={true}
            onExport={() => console.log("Export clicked")}
          />
      </div>
    </div>
  );
};

export default SaleMonitoring;
