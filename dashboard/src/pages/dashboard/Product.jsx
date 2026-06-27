import React, { useState } from "react";
import Chart from "react-apexcharts";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import Tab from "../../components/common/Tab";
import Table from "../../components/common/Table";
import Structure from "../../components/layout/Structure";
import {
  productColumns,
  inventoryColumns,
  reviewColumns,
  orderColumns,
  initialProducts,
  initialInventory,
  initialReviews,
  initialOrders
} from "../../data/cmsMockData";

// Color class lookup for categories
const getCatColorClasses = (colorHex) => {
  switch (colorHex) {
    case "#1e74db": return { dot: "text-primary", badge: "bg-light-primary text-primary" };
    case "#ef4444": return { dot: "text-danger", badge: "bg-light-danger text-danger" };
    case "#f97316": return { dot: "text-warning", badge: "bg-light-warning text-warning" };
    case "#22c55e": return { dot: "text-success", badge: "bg-light-success text-success" };
    case "#0284c7": return { dot: "text-info", badge: "bg-light-primary text-info" };
    case "#2563eb": return { dot: "text-secondary", badge: "bg-light-secondary text-secondary" };
    case "#a855f7": return { dot: "text-primary", badge: "bg-light-secondary text-primary" };
    case "#92400e": return { dot: "text-warning", badge: "bg-light-warning text-warning" };
    case "#475569": return { dot: "text-gray", badge: "bg-light-primary text-gray" };
    default: return { dot: "text-primary", badge: "bg-light-primary text-primary" };
  }
};

const getProductCategoryClasses = (categoryName, categoriesList) => {
  const cat = categoriesList.find(c => c.name === categoryName);
  return getCatColorClasses(cat ? cat.color : "#475569");
};

const formatProductData = (products, categoriesList) => {
  return products.map((p) => {
    let stockClass = "text-success font-600";
    if (p.stock <= 15) stockClass = "text-warning font-600";
    if (p.stock === 0) stockClass = "text-danger font-600";

    const displayStatus = (p.status === "Inactive" || p.status === "Out of Stock" || p.status === "Low Stock") ? "Inactive" : "Active";
    const statusClass = displayStatus === "Active" ? "text-success font-600" : "text-danger font-600";
    const statusBadge = displayStatus === "Active" ? "bg-light-success px-8 py-4 rounded-5" : "bg-light-danger px-8 py-4 rounded-5";

    const categoryClasses = getProductCategoryClasses(p.category, categoriesList);

    return {
      id: p.id,
      checkbox: <input type="checkbox" className="cursor-pointer" />,
      image: <img src={p.image} alt={p.name} className="common-img rounded-5 object-cover border-tertiary" />,
      name: (
        <div className="grid-cols-1" style={{ minWidth: "220px" }}>
          <span className="headmini-text font-600 text-dark">{p.name}</span>
          <span className="mini-text text-gray">{p.sub}</span>
        </div>
      ),
      sku: p.sku,
      category: (
        <span className={`px-8 py-4 rounded-5 mini-text font-600 ${categoryClasses.badge}`} style={{ whiteSpace: "nowrap" }}>
          {p.category}
        </span>
      ),
      price: p.price,
      stock: <span className={stockClass}>{p.stock}</span>,
      status: <span className={`${statusBadge} ${statusClass}`} style={{ whiteSpace: "nowrap" }}>{displayStatus}</span>,
      rating: (
        <div className="flex items-center gap-4 font-500">
          <span className="text-warning">★</span>
          <span>{p.rating}</span>
          <span className="mini-text text-gray">({p.ratingCount})</span>
        </div>
      ),
      sales: p.sales,
      updated: p.updated,
      actions: (
        <Button
          version="v2"
          bg="white"
          color="gray"
          colorHover="dark"
          className="p-4"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </Button>
      )
    };
  });
};

const formatInventoryData = (inv, categoriesList) => {
  return inv.map((item) => {
    let statusClass = "text-success font-600";
    let statusBadge = "";
    if (item.status === "Low Stock") {
      statusClass = "text-warning font-600";
      statusBadge = "bg-light-warning px-8 py-4 rounded-5";
    }
    if (item.status === "Out of Stock") {
      statusClass = "text-danger font-600";
      statusBadge = "bg-light-danger px-8 py-4 rounded-5";
    }

    const categoryClasses = getProductCategoryClasses(item.category, categoriesList);

    return {
      id: item.id,
      checkbox: <input type="checkbox" className="cursor-pointer" />,
      name: <span className="small-text font-600 text-dark" style={{ whiteSpace: "normal", minWidth: "200px" }}>{item.name}</span>,
      sku: item.sku,
      category: (
        <span className={`px-8 py-4 rounded-5 small-text font-600 ${categoryClasses.badge}`} style={{ whiteSpace: "nowrap" }}>
          {item.category}
        </span>
      ),
      qty: item.qty,
      reorder: item.reorder,
      location: item.location,
      val: item.val,
      status: <span className={`${statusBadge} ${statusClass}`} style={{ whiteSpace: "nowrap" }}>{item.status}</span>,
      actions: (
        <Button
          version="v2"
          bg="transparent"
          color="gray"
          colorHover="dark"
          className="p-4"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </Button>
      )
    };
  });
};

const formatReviewData = (revs) => {
  return revs.map((item) => {
    let statusClass = "text-success font-600";
    let statusBadge = "";
    if (item.status === "Pending") {
      statusClass = "text-warning font-600";
      statusBadge = "bg-light-warning px-8 py-4 rounded-5";
    }
    if (item.status === "Flagged") {
      statusClass = "text-danger font-600";
      statusBadge = "bg-light-danger px-8 py-4 rounded-5";
    }

    return {
      id: item.id,
      checkbox: <input type="checkbox" className="cursor-pointer" />,
      product: <span className="small-text font-600 text-dark" style={{ whiteSpace: "normal", minWidth: "150px" }}>{item.product}</span>,
      user: item.user,
      rating: (
        <div className="flex items-center gap-4 font-500">
          <span className="text-warning">★</span>
          <span>{item.rating}</span>
        </div>
      ),
      comment: <span className="text-gray" style={{ whiteSpace: "normal", wordBreak: "break-all", minWidth: "220px" }}>{item.comment}</span>,
      date: item.date,
      status: <span className={`${statusBadge} ${statusClass}`}>{item.status}</span>,
      actions: (
        <div className="flex gap-4">
          <Button version="v2" bg="success" color="white" className="px-6 py-2">Approve</Button>
          <Button version="v2" bg="danger" color="white" className="px-6 py-2">Delete</Button>
        </div>
      )
    };
  });
};

const formatOrderData = (orders) => {
  return orders.map((item) => {
    let statusClass = "text-success font-600";
    let statusBadge = "";
    if (item.status === "Shipped") {
      statusClass = "text-info font-600";
      statusBadge = "bg-light-primary px-8 py-4 rounded-5";
    }
    if (item.status === "Processing") {
      statusClass = "text-warning font-600";
      statusBadge = "bg-light-warning px-8 py-4 rounded-5";
    }
    if (item.status === "Cancelled") {
      statusClass = "text-danger font-600";
      statusBadge = "bg-light-danger px-8 py-4 rounded-5";
    }

    return {
      id: item.id,
      checkbox: <input type="checkbox" className="cursor-pointer" />,
      orderId: <span className="small-text font-600 text-primary">{item.orderId}</span>,
      customer: item.customer,
      date: item.date,
      products: item.products,
      amount: <span className="font-600 text-dark">{item.amount}</span>,
      payment: item.payment,
      status: <span className={`${statusBadge} ${statusClass}`}>{item.status}</span>,
      actions: (
        <Button
          version="v2"
          bg="transparent"
          color="gray"
          colorHover="dark"
          className="p-4"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </Button>
      )
    };
  });
};

// Sparkline configuration helper
const sparklineOptions = (color) => ({
  chart: {
    type: "area",
    sparkline: { enabled: true },
    animations: { enabled: false },
  },
  stroke: { curve: "smooth", width: 1.8 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.15,
      opacityTo: 0.01,
      stops: [0, 100]
    }
  },
  colors: [color],
  tooltip: { enabled: false },
});

// Modular SparklineCard component with premium hover transitions and colors
const SparklineCard = ({ title, value, changeText, isPositive, chartColor, chartData }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-5 p-12"
      style={{
        transition: "all 0.2s ease-in-out",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 15px rgba(0,0,0,0.08)" : "",
        borderTop: `3px solid ${chartColor}`,
      }}
    >
      <div>
        <span className="mini-text text-gray font-600 uppercase tracking-wider">{title}</span>
        <h3 className="headpara-text text-dark font-700 mt-6 mb-2">{value}</h3>
        <div className={`small-text font-600 flex items-center gap-4 ${isPositive ? "text-success" : "text-danger"}`}>
          <span>{isPositive ? `↑ ${changeText}` : `↓ ${changeText}`}</span>
          <span className="text-gray mini-text font-500 mt-4">vs last 7 days</span>
        </div>
      </div>
      <div className="mt-8 w-full">
        <Chart
          options={sparklineOptions(chartColor)}
          series={[{ data: chartData }]}
          type="area"
          height={35}
          width="100%"
        />
      </div>
    </div>
  );
};

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeTab, setActiveTab] = useState("Product List");

  const [tableData, setTableData] = useState([]);
  const [tableTotal, setTableTotal] = useState(0);

  const [filterTrigger, setFilterTrigger] = useState(0);

  // Unified filter states
  const [filterName, setFilterName] = useState("");
  const [filterSku, setFilterSku] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterRating, setFilterRating] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");

  const handleResetFilters = () => {
    setFilterName("");
    setFilterSku("");
    setFilterCat("All");
    setFilterStatus("All");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    setFilterLocation("");
    setFilterUser("");
    setFilterRating("All");
    setFilterPayment("All");
    setFilterTrigger(prev => prev + 1);
  };

  // Mock category options
  const categoriesList = [
    { name: "All Products", count: initialProducts.length, color: "#1e74db", hasFilterBadge: true },
    { name: "Electronics", count: initialProducts.filter(p => p.category === "Electronics").length, color: "#ef4444" },
    { name: "Fashion", count: initialProducts.filter(p => p.category === "Fashion").length, color: "#f97316" },
    { name: "Home & Kitchen", count: initialProducts.filter(p => p.category === "Home & Kitchen").length, color: "#22c55e" },
    { name: "Beauty & Personal Care", count: initialProducts.filter(p => p.category === "Beauty & Personal Care").length, color: "#0284c7" },
    { name: "Sports & Outdoors", count: initialProducts.filter(p => p.category === "Sports & Outdoors").length, color: "#2563eb" },
    { name: "Toys & Games", count: initialProducts.filter(p => p.category === "Toys & Games").length, color: "#a855f7" },
    { name: "Books & Stationery", count: initialProducts.filter(p => p.category === "Books & Stationery").length, color: "#92400e" },
    { name: "Automotive", count: initialProducts.filter(p => p.category === "Automotive").length, color: "#475569" },
  ];

  // Get columns list based on the active tab
  const getTableColumns = () => {
    switch (activeTab) {
      case "Product List": return productColumns;
      case "Inventory": return inventoryColumns;
      case "Reviews": return reviewColumns;
      case "Orders": return orderColumns;
      default: return productColumns;
    }
  };

  // Dynamic data fetching logic used by Table component
  const handleFetchData = async ({ search, page }) => {
    if (activeTab === "Analytic") {
      setTableData([]);
      setTableTotal(0);
      return;
    }
    let rawData = [];
    let formatter = (x) => x;

    if (activeTab === "Product List") {
      rawData = selectedCategory === "All Products"
        ? initialProducts
        : initialProducts.filter(p => p.category === selectedCategory);

      // Apply filter inputs
      if (filterName) {
        rawData = rawData.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()));
      }
      if (filterSku) {
        rawData = rawData.filter(p => p.sku.toLowerCase().includes(filterSku.toLowerCase()));
      }
      if (filterCat !== "All") {
        rawData = rawData.filter(p => p.category === filterCat);
      }
      if (filterStatus !== "All") {
        rawData = rawData.filter(p => p.status === filterStatus);
      }
      if (filterMinPrice) {
        rawData = rawData.filter(p => {
          const val = parseFloat(p.price.replace(/[^0-9.]/g, ""));
          return !isNaN(val) && val >= parseFloat(filterMinPrice);
        });
      }
      if (filterMaxPrice) {
        rawData = rawData.filter(p => {
          const val = parseFloat(p.price.replace(/[^0-9.]/g, ""));
          return !isNaN(val) && val <= parseFloat(filterMaxPrice);
        });
      }

      formatter = (items) => formatProductData(items, categoriesList);
    } else if (activeTab === "Inventory") {
      rawData = selectedCategory === "All Products"
        ? initialInventory
        : initialInventory.filter(p => p.category === selectedCategory);

      // Apply filter inputs
      if (filterName) {
        rawData = rawData.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()));
      }
      if (filterSku) {
        rawData = rawData.filter(p => p.sku.toLowerCase().includes(filterSku.toLowerCase()));
      }
      if (filterCat !== "All") {
        rawData = rawData.filter(p => p.category === filterCat);
      }
      if (filterLocation) {
        rawData = rawData.filter(p => p.location.toLowerCase().includes(filterLocation.toLowerCase()));
      }
      if (filterStatus !== "All") {
        rawData = rawData.filter(p => p.status === filterStatus);
      }

      formatter = (items) => formatInventoryData(items, categoriesList);
    } else if (activeTab === "Reviews") {
      rawData = initialReviews;

      // Apply filter inputs
      if (filterName) {
        rawData = rawData.filter(p => p.product.toLowerCase().includes(filterName.toLowerCase()));
      }
      if (filterUser) {
        rawData = rawData.filter(p => p.user.toLowerCase().includes(filterUser.toLowerCase()));
      }
      if (filterRating !== "All") {
        rawData = rawData.filter(p => p.rating === parseInt(filterRating, 10));
      }
      if (filterStatus !== "All") {
        rawData = rawData.filter(p => p.status === filterStatus);
      }

      formatter = formatReviewData;
    } else if (activeTab === "Orders") {
      rawData = initialOrders;

      // Apply filter inputs
      if (filterName) {
        rawData = rawData.filter(p => p.orderId.toLowerCase().includes(filterName.toLowerCase()));
      }
      if (filterUser) {
        rawData = rawData.filter(p => p.customer.toLowerCase().includes(filterUser.toLowerCase()));
      }
      if (filterPayment !== "All") {
        rawData = rawData.filter(p => p.payment === filterPayment);
      }
      if (filterStatus !== "All") {
        rawData = rawData.filter(p => p.status === filterStatus);
      }

      formatter = formatOrderData;
    }

    if (search) {
      const q = search.toLowerCase();
      rawData = rawData.filter(item => {
        const nameMatch = item.name?.toLowerCase().includes(q) || false;
        const customerMatch = item.customer?.toLowerCase().includes(q) || false;
        const commentMatch = item.comment?.toLowerCase().includes(q) || false;
        const prodMatch = item.product?.toLowerCase().includes(q) || false;
        const idMatch = item.orderId?.toLowerCase().includes(q) || false;
        return nameMatch || customerMatch || commentMatch || prodMatch || idMatch;
      });
    }

    const limit = 20;
    const startIndex = (page - 1) * limit;
    const paginatedData = rawData.slice(startIndex, startIndex + limit);

    setTableData(formatter(paginatedData));
    setTableTotal(rawData.length);
  };



  const getFilterDescription = () => {
    const activeFilters = [];
    if (selectedCategory !== "All Products") {
      activeFilters.push(`Category Side-filter: ${selectedCategory}`);
    }
    if (activeTab === "Product List") {
      if (filterName) activeFilters.push(`Name: "${filterName}"`);
      if (filterSku) activeFilters.push(`SKU: "${filterSku}"`);
      if (filterCat !== "All") activeFilters.push(`Category: ${filterCat}`);
      if (filterStatus !== "All") activeFilters.push(`Status: ${filterStatus}`);
      if (filterMinPrice) activeFilters.push(`Min Price: $${filterMinPrice}`);
      if (filterMaxPrice) activeFilters.push(`Max Price: $${filterMaxPrice}`);
    } else if (activeTab === "Inventory") {
      if (filterName) activeFilters.push(`Name: "${filterName}"`);
      if (filterSku) activeFilters.push(`SKU: "${filterSku}"`);
      if (filterCat !== "All") activeFilters.push(`Category: ${filterCat}`);
      if (filterLocation) activeFilters.push(`Location: "${filterLocation}"`);
      if (filterStatus !== "All") activeFilters.push(`Status: ${filterStatus}`);
    } else if (activeTab === "Reviews") {
      if (filterName) activeFilters.push(`Product: "${filterName}"`);
      if (filterUser) activeFilters.push(`User: "${filterUser}"`);
      if (filterRating !== "All") activeFilters.push(`Rating: ${filterRating} ★`);
      if (filterStatus !== "All") activeFilters.push(`Status: ${filterStatus}`);
    } else if (activeTab === "Orders") {
      if (filterName) activeFilters.push(`Order ID: "${filterName}"`);
      if (filterUser) activeFilters.push(`Customer: "${filterUser}"`);
      if (filterPayment !== "All") activeFilters.push(`Payment: ${filterPayment}`);
      if (filterStatus !== "All") activeFilters.push(`Status: ${filterStatus}`);
    }

    if (activeFilters.length === 0) {
      return `No filters applied — showing all ${activeTab.toLowerCase()} items.`;
    }
    return `Showing filtered items: ${activeFilters.join(" • ")}`;
  };

  const renderFilterInputs = () => {
    switch (activeTab) {
      case "Product List":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Product Name</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">SKU</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search SKU..."
                value={filterSku}
                onChange={(e) => setFilterSku(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Category</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categoriesList.filter(c => c.name !== "All Products").map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Status</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Min Price ($)</p>
              <input
                type="number"
                className="h-input border-ec"
                placeholder="e.g. 50"
                value={filterMinPrice}
                onChange={(e) => setFilterMinPrice(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Max Price ($)</p>
              <input
                type="number"
                className="h-input border-ec"
                placeholder="e.g. 1000"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
              />
            </div>
          </div>
        );
      case "Inventory":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Product Name</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">SKU</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search SKU..."
                value={filterSku}
                onChange={(e) => setFilterSku(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Category</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categoriesList.filter(c => c.name !== "All Products").map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Location</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="e.g. Aisle A-3"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Status</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        );
      case "Reviews":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Product</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search product..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">User</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search user..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Rating</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Status</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Flagged">Flagged</option>
              </select>
            </div>
          </div>
        );
      case "Orders":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Order ID</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search Order ID..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Customer</p>
              <input
                type="text"
                className="h-input border-ec"
                placeholder="Search customer..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              />
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Payment Method</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
              >
                <option value="All">All Payments</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Apple Pay">Apple Pay</option>
                <option value="Google Pay">Google Pay</option>
              </select>
            </div>
            <div>
              <p className="mini-text text-gray font-600 mb-4 uppercase">Status</p>
              <select
                className="h-input border-ec cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <Structure
      sidebarTitle="Product Categories"
      sidebarItems={categoriesList}
      selectedSidebarItem={selectedCategory}
      onSidebarItemClick={(name) => setSelectedCategory(name)}
      headerIcon={
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      }
      headerTitle="Products Overview"
      headerSub={`${initialProducts.length} products • ${new Set(initialProducts.map(p => p.category)).size} categories • ${initialProducts.filter(p => p.status === "Active").length} active • ${initialProducts.filter(p => p.stock === 0).length} out of stock`}
      quickAction={
        <div className="text-right">
          <p className="mini-text text-gray font-600 uppercase mb-2">QUICK ACTION</p>
          <p className="small-text font-600 text-primary flex items-center gap-2 decoration-none cursor-pointer" onClick={(e) => e.preventDefault()}>
            Add New Product
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </p>
        </div>
      }
      tabs={[
        {
          name: "Product List",
          count: initialProducts.length,
          icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          )
        },
        {
          name: "Inventory",
          count: initialInventory.length,
          icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="13" x2="15" y2="13"></line>
              <line x1="9" y1="17" x2="15" y2="17"></line>
            </svg>
          )
        },
        {
          name: "Reviews",
          count: initialReviews.length,
          icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )
        },
        {
          name: "Orders",
          count: initialOrders.length,
          icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          )
        },
        {
          name: "Analytic",
          count: null,
          icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="flex">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          )
        }
      ]}
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        handleResetFilters();
      }}
      filterDescription={getFilterDescription()}
      hasActiveFilters={
        selectedCategory !== "All Products" ||
        !!filterName ||
        !!filterSku ||
        filterCat !== "All" ||
        filterStatus !== "All" ||
        !!filterMinPrice ||
        !!filterMaxPrice ||
        !!filterLocation ||
        !!filterUser ||
        filterRating !== "All" ||
        filterPayment !== "All"
      }
      onClearAllFilters={() => {
        setSelectedCategory("All Products");
        handleResetFilters();
      }}
      filterInputs={renderFilterInputs()}
    >
      {/* Sparkline cards */}
      {activeTab === "Analytic" && (
        <>
          <div className="grid-cols-5 gap-12">
            <SparklineCard
              title="Total Products"
              value="1,248"
              changeText="12.5%"
              isPositive={true}
              chartColor="#1e74db"
              chartData={[1180, 1200, 1195, 1220, 1210, 1235, 1248]}
            />
            <SparklineCard
              title="Active Products"
              value="892"
              changeText="8.3%"
              isPositive={true}
              chartColor="#8b5cf6"
              chartData={[840, 860, 850, 880, 872, 885, 892]}
            />
            <SparklineCard
              title="Out of Stock"
              value="256"
              changeText="5.6%"
              isPositive={true}
              chartColor="#ef4444"
              chartData={[240, 248, 252, 245, 250, 253, 256]}
            />
            <SparklineCard
              title="Low Stock"
              value="100"
              changeText="2.1%"
              isPositive={false}
              chartColor="#f97316"
              chartData={[110, 105, 108, 104, 102, 101, 100]}
            />
            <SparklineCard
              title="Total Revenue"
              value="$78,642"
              changeText="15.2%"
              isPositive={true}
              chartColor="#22c55e"
              chartData={[68000, 71000, 70000, 74000, 75500, 77000, 78642]}
            />
          </div>
          <div className="bg-white border rounded-5 p-16 mt-12">
            <h4 className="small-text text-dark font-600 mb-12">Revenue & Sales Trends</h4>
            <Chart
              options={{
                chart: {
                  id: "revenue-trend",
                  toolbar: { show: false },
                  fontFamily: "inherit"
                },
                xaxis: {
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                colors: ["#1e74db", "#22c55e"],
                stroke: { curve: "smooth", width: 3 },
                grid: { borderColor: "#f1f1f1" }
              }}
              series={[
                { name: "Revenue ($)", data: [12000, 19000, 15000, 28000, 32000, 45000, 41000, 56000, 62000, 58000, 71000, 78642] },
                { name: "Sales", data: [450, 720, 610, 890, 1100, 1450, 1320, 1780, 1950, 1820, 2100, 2450] }
              ]}
              type="line"
              height={320}
            />
          </div>
        </>
      )}

      {/* Table Area */}
      {activeTab !== "Analytic" && (
        <div className="">
          <Table
            key={`${activeTab}-${selectedCategory}-${filterTrigger}`}
            title={activeTab}
            columns={getTableColumns()}
            data={tableData}
            total={tableTotal}
            limit={20}
            fetchData={handleFetchData}
          />
        </div>
      )}
    </Structure>
  );
};

export default Product;
