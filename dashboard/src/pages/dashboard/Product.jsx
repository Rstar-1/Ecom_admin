import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Table from "../../components/common/Table";
import { CrudModal, DeleteModal } from "../../components/common/Modal";
import Fields from "../../components/common/Fields";
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

const sparklineCardsData = [
  {
    id: "total-products",
    title: "Total Products",
    value: "1,248",
    changeText: "12.5%",
    isPositive: true,
    chartColor: "#1e74db",
    chartData: [1180, 1200, 1195, 1220, 1210, 1235, 1248]
  },
  {
    id: "active-products",
    title: "Active Products",
    value: "892",
    changeText: "8.3%",
    isPositive: true,
    chartColor: "#8b5cf6",
    chartData: [840, 860, 850, 880, 872, 885, 892]
  },
  {
    id: "out-of-stock",
    title: "Out of Stock",
    value: "256",
    changeText: "5.6%",
    isPositive: true,
    chartColor: "#ef4444",
    chartData: [240, 248, 252, 245, 250, 253, 256]
  },
  {
    id: "low-stock",
    title: "Low Stock",
    value: "100",
    changeText: "2.1%",
    isPositive: false,
    chartColor: "#f97316",
    chartData: [110, 105, 108, 104, 102, 101, 100]
  },
  {
    id: "total-revenue",
    title: "Total Revenue",
    value: "$78,642",
    changeText: "15.2%",
    isPositive: true,
    chartColor: "#22c55e",
    chartData: [68000, 71000, 70000, 74000, 75500, 77000, 78642]
  }
];

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeTab, setActiveTab] = useState("Product List");

  const [productsList, setProductsList] = useState(initialProducts);
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [ordersList, setOrdersList] = useState(initialOrders);

  const [tableData, setTableData] = useState([]);
  const [tableTotal, setTableTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [filterTrigger, setFilterTrigger] = useState(0);

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
    setCurrentPage(1);
    setFilterTrigger(prev => prev + 1);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    if (activeTab === "Product List") {
      setProductsList(prev => prev.filter(p => p.id !== itemToDelete.id));
    } else if (activeTab === "Inventory") {
      setInventoryList(prev => prev.filter(p => p.id !== itemToDelete.id));
    } else if (activeTab === "Reviews") {
      setReviewsList(prev => prev.filter(p => p.id !== itemToDelete.id));
    } else if (activeTab === "Orders") {
      setOrdersList(prev => prev.filter(p => p.id !== itemToDelete.id));
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleAddSubmit = (formData) => {
    if (activeTab === "Product List") {
      const newProd = {
        id: Date.now(),
        image: formData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=60",
        name: formData.name || "New Product",
        sub: formData.sub || "",
        sku: formData.sku || `PROD-${Math.floor(100 + Math.random() * 900)}`,
        category: formData.category || "Electronics",
        price: formData.price ? (formData.price.startsWith("$") ? formData.price : `$${formData.price}`) : "$99.99",
        stock: formData.stock ? parseInt(formData.stock, 10) : 10,
        status: formData.status || "Active",
        rating: formData.rating ? parseFloat(formData.rating) : 5.0,
        ratingCount: 1,
        sales: formData.sales || "0 sales",
        updated: formData.updated || "Just now"
      };
      setProductsList(prev => [newProd, ...prev]);
    } else if (activeTab === "Inventory") {
      const newItem = {
        id: Date.now(),
        name: formData.name || "New Inventory Item",
        category: formData.category || "Electronics",
        qty: formData.qty ? parseInt(formData.qty, 10) : 50,
        location: formData.location || "Warehouse A",
        val: formData.val ? (formData.val.startsWith("$") ? formData.val : `$${formData.val}`) : "$500.00",
        status: formData.status || "In Stock"
      };
      setInventoryList(prev => [newItem, ...prev]);
    } else if (activeTab === "Reviews") {
      const newRev = {
        id: Date.now(),
        product: formData.product || "Product",
        user: formData.user || "Anonymous",
        rating: formData.rating ? parseFloat(formData.rating) : 5.0,
        comment: formData.comment || "Excellent!",
        date: formData.date || "Just now",
        status: formData.status || "Pending"
      };
      setReviewsList(prev => [newRev, ...prev]);
    } else if (activeTab === "Orders") {
      const newOrd = {
        id: Date.now(),
        orderId: formData.orderId || `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customer: formData.customer || "Customer",
        date: formData.date || "Just now",
        products: formData.products || "1 item",
        amount: formData.amount ? (formData.amount.startsWith("$") ? formData.amount : `$${formData.amount}`) : "$99.00",
        payment: formData.payment || "Paid",
        status: formData.status || "Processing"
      };
      setOrdersList(prev => [newOrd, ...prev]);
    }
    setIsAddModalOpen(false);
  };

  // Mock category options
  const categoriesList = [
    { name: "All Products", count: productsList.length, color: "#1e74db", hasFilterBadge: true },
    { name: "Electronics", count: productsList.filter(p => p.category === "Electronics").length, color: "#ef4444" },
    { name: "Fashion", count: productsList.filter(p => p.category === "Fashion").length, color: "#f97316" },
    { name: "Home & Kitchen", count: productsList.filter(p => p.category === "Home & Kitchen").length, color: "#22c55e" },
    { name: "Beauty & Personal Care", count: productsList.filter(p => p.category === "Beauty & Personal Care").length, color: "#0284c7" },
    { name: "Sports & Outdoors", count: productsList.filter(p => p.category === "Sports & Outdoors").length, color: "#2563eb" },
    { name: "Toys & Games", count: productsList.filter(p => p.category === "Toys & Games").length, color: "#a855f7" },
    { name: "Books & Stationery", count: productsList.filter(p => p.category === "Books & Stationery").length, color: "#92400e" },
    { name: "Automotive", count: productsList.filter(p => p.category === "Automotive").length, color: "#475569" },
  ];

  const getModalTitle = () => {
    switch (activeTab) {
      case "Product List":
        return "Add New Product";
      case "Inventory":
        return "Add Inventory Item";
      case "Reviews":
        return "Add New Review";
      case "Orders":
        return "Add New Order";
      default:
        return "Add Item";
    }
  };

  const getModalFields = () => {
    switch (activeTab) {
      case "Product List":
        return [
          { name: "image", label: "Image URL", type: "dragfile", placeholder: "https://images.unsplash.com/..." },
          { name: "name", label: "Product Name", type: "text", required: true, placeholder: "e.g. Wireless Headphones" },
          { name: "category", label: "Category", type: "select", options: categoriesList.filter(c => c.name !== "All Products").map(c => ({ label: c.name, value: c.name })) },
          { name: "price", label: "Price ($)", type: "text", placeholder: "99.99" },
          { name: "stock", label: "Initial Stock", type: "number", placeholder: "50" },
          { name: "status", label: "Status", type: "select", options: [{ label: "Active", value: "Active" }, { label: "Inactive", value: "Inactive" }] }
        ];
      case "Inventory":
        return [
          { name: "name", label: "Product Name", type: "text", required: true, placeholder: "e.g. Wireless Headphones" },
          { name: "category", label: "Category", type: "select", options: categoriesList.filter(c => c.name !== "All Products").map(c => ({ label: c.name, value: c.name })) },
          { name: "qty", label: "Stock Quantity", type: "number", placeholder: "100" },
          { name: "location", label: "Location", type: "text", placeholder: "Warehouse A" },
          { name: "val", label: "Value ($)", type: "text", placeholder: "1,500.00" },
          { name: "status", label: "Status", type: "select", options: [{ label: "In Stock", value: "In Stock" }, { label: "Low Stock", value: "Low Stock" }, { label: "Out of Stock", value: "Out of Stock" }] }
        ];
      case "Reviews":
        return [
          { name: "product", label: "Product", type: "text", required: true, placeholder: "e.g. iPhone 15 Pro" },
          { name: "user", label: "User", type: "text", required: true, placeholder: "John Doe" },
          { name: "rating", label: "Rating", type: "number", placeholder: "5" },
          { name: "comment", label: "Comment", type: "text", placeholder: "Great product!" },
          { name: "date", label: "Date", type: "text", placeholder: "Today" },
          { name: "status", label: "Status", type: "select", options: [{ label: "Approved", value: "Approved" }, { label: "Pending", value: "Pending" }] }
        ];
      case "Orders":
        return [
          { name: "orderId", label: "Order ID", type: "text", required: true, placeholder: "#ORD-9999" },
          { name: "customer", label: "Customer", type: "text", required: true, placeholder: "Jane Smith" },
          { name: "products", label: "Products", type: "text", placeholder: "2 items" },
          { name: "amount", label: "Amount ($)", type: "text", placeholder: "199.99" },
          { name: "payment", label: "Payment", type: "select", options: [{ label: "Paid", value: "Paid" }, { label: "Pending", value: "Pending" }, { label: "Failed", value: "Failed" }] },
          { name: "status", label: "Status", type: "select", options: [{ label: "Delivered", value: "Delivered" }, { label: "Processing", value: "Processing" }, { label: "Shipped", value: "Shipped" }, { label: "Cancelled", value: "Cancelled" }] }
        ];
      default:
        return [];
    }
  };

  const getTableColumns = () => {
    let cols = productColumns;
    if (activeTab === "Inventory") cols = inventoryColumns;
    if (activeTab === "Reviews") cols = reviewColumns;
    if (activeTab === "Orders") cols = orderColumns;

    return cols.map((col) => {
      if (col.accessor === "checkbox") {
        return {
          ...col,
          render: () => <input type="checkbox" className="cursor-pointer" />
        };
      }


      if (col.accessor === "actions") {
        return {
          ...col,
          render: (item) => activeTab === "Reviews" ? (
            <div className="flex gap-4">
              <Button version="v2" bg="success" color="white" className="px-6 py-2">Approve</Button>
              <Button version="v2" bg="danger" color="white" className="px-6 py-2" onClick={() => handleDeleteClick(item)}>Delete</Button>
            </div>
          ) : (
            <Button
              version="v2"
              bg="white"
              color="gray"
              colorHover="dark"
              className="p-4"
              onClick={() => handleDeleteClick(item)}
            >
              <Icon name="MoreVertical" width="16" height="16" strokeWidth="2.5" />
            </Button>
          )
        };
      }
      return col;
    });
  };

  const getHeaderSub = () => {
    switch (activeTab) {
      case "Product List":
        return `${productsList.length} products • ${new Set(productsList.map(p => p.category)).size} categories • ${productsList.filter(p => p.status === "Active").length} active • ${productsList.filter(p => p.stock === 0).length} out of stock`;
      case "Inventory":
        return `${inventoryList.length} items • ${inventoryList.filter(i => i.status === "In Stock").length} in stock • ${inventoryList.filter(i => i.status === "Low Stock").length} low stock • ${inventoryList.filter(i => i.status === "Out of Stock").length} out of stock`;
      case "Reviews":
        return `${reviewsList.length} reviews • ${reviewsList.filter(r => r.status === "Approved").length} approved • ${reviewsList.filter(r => r.status === "Pending").length} pending`;
      case "Orders":
        return `${ordersList.length} orders • ${ordersList.filter(o => o.status === "Delivered").length} delivered • ${ordersList.filter(o => o.status === "Processing").length} processing`;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (activeTab === "Analytic") {
      setTableData([]);
      setTableTotal(0);
      return;
    }
    let rawData = [];

    if (activeTab === "Product List") {
      rawData = selectedCategory === "All Products"
        ? productsList
        : productsList.filter(p => p.category === selectedCategory);

      if (filterName) rawData = rawData.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()));
      if (filterStatus !== "All") rawData = rawData.filter(p => p.status === filterStatus);
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
    } else if (activeTab === "Inventory") {
      rawData = selectedCategory === "All Products"
        ? inventoryList
        : inventoryList.filter(p => p.category === selectedCategory);

      if (filterName) rawData = rawData.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()));
      if (filterLocation) rawData = rawData.filter(p => p.location.toLowerCase().includes(filterLocation.toLowerCase()));
      if (filterStatus !== "All") rawData = rawData.filter(p => p.status === filterStatus);
    } else if (activeTab === "Reviews") {
      rawData = reviewsList;

      if (filterName) rawData = rawData.filter(p => p.product.toLowerCase().includes(filterName.toLowerCase()));
      if (filterUser) rawData = rawData.filter(p => p.user.toLowerCase().includes(filterUser.toLowerCase()));
      if (filterRating !== "All") rawData = rawData.filter(p => p.rating === parseInt(filterRating, 10));
      if (filterStatus !== "All") rawData = rawData.filter(p => p.status === filterStatus);
    } else if (activeTab === "Orders") {
      rawData = ordersList;

      if (filterName) rawData = rawData.filter(p => p.orderId.toLowerCase().includes(filterName.toLowerCase()));
      if (filterUser) rawData = rawData.filter(p => p.customer.toLowerCase().includes(filterUser.toLowerCase()));
      if (filterPayment !== "All") rawData = rawData.filter(p => p.payment === filterPayment);
      if (filterStatus !== "All") rawData = rawData.filter(p => p.status === filterStatus);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      rawData = rawData.filter(item => {
        const nameMatch = item.name?.toLowerCase().includes(q) || false;
        const customerMatch = item.customer?.toLowerCase().includes(q) || false;
        const commentMatch = item.comment?.toLowerCase().includes(q) || false;
        const prodMatch = item.product?.toLowerCase().includes(q) || false;
        const idMatch = item.orderId?.toLowerCase().includes(q) || false;
        return nameMatch || customerMatch || commentMatch || prodMatch || idMatch;
      });
    }

    const limit = 10;
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = rawData.slice(startIndex, startIndex + limit);

    setTableData(paginatedData);
    setTableTotal(rawData.length);
  }, [activeTab, selectedCategory, currentPage, searchQuery, filterName, filterSku, filterCat, filterStatus, filterMinPrice, filterMaxPrice, filterLocation, filterUser, filterRating, filterPayment, productsList, inventoryList, reviewsList, ordersList, filterTrigger]);

  const getFilterDescription = () => {
    const activeFilters = [];
    if (selectedCategory !== "All Products") {
      activeFilters.push(`Category Side-filter: ${selectedCategory}`);
    }
    if (activeTab === "Product List") {
      if (filterName) activeFilters.push(`Name: "${filterName}"`);
      if (filterStatus !== "All") activeFilters.push(`Status: ${filterStatus}`);
      if (filterMinPrice) activeFilters.push(`Min Price: $${filterMinPrice}`);
      if (filterMaxPrice) activeFilters.push(`Max Price: $${filterMaxPrice}`);
    } else if (activeTab === "Inventory") {
      if (filterName) activeFilters.push(`Name: "${filterName}"`);
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
            <Fields
              label="PRODUCT NAME"
              type="input"
              placeholder="Search name..."
              value={filterName}
              onChange={(val) => { setFilterName(val); setCurrentPage(1); }}
            />
            <Fields
              label="STATUS"
              type="select"
              value={filterStatus}
              onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
              options={[
                { label: "All Statuses", value: "All" },
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" }
              ]}
            />
            <Fields
              label="MIN PRICE ($)"
              type="number"
              placeholder="e.g. 50"
              value={filterMinPrice}
              onChange={(val) => { setFilterMinPrice(val); setCurrentPage(1); }}
            />
            <Fields
              label="MAX PRICE ($)"
              type="number"
              placeholder="e.g. 1000"
              value={filterMaxPrice}
              onChange={(val) => { setFilterMaxPrice(val); setCurrentPage(1); }}
            />
          </div>
        );
      case "Inventory":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <Fields
              label="PRODUCT NAME"
              type="input"
              placeholder="Search name..."
              value={filterName}
              onChange={(val) => { setFilterName(val); setCurrentPage(1); }}
            />
            <Fields
              label="LOCATION"
              type="input"
              placeholder="e.g. Aisle A-3"
              value={filterLocation}
              onChange={(val) => { setFilterLocation(val); setCurrentPage(1); }}
            />
            <Fields
              label="STATUS"
              type="select"
              value={filterStatus}
              onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
              options={[
                { label: "All Statuses", value: "All" },
                { label: "In Stock", value: "In Stock" },
                { label: "Low Stock", value: "Low Stock" },
                { label: "Out of Stock", value: "Out of Stock" }
              ]}
            />
          </div>
        );
      case "Reviews":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <Fields
              label="PRODUCT"
              type="input"
              placeholder="Search product..."
              value={filterName}
              onChange={(val) => { setFilterName(val); setCurrentPage(1); }}
            />
            <Fields
              label="USER"
              type="input"
              placeholder="Search user..."
              value={filterUser}
              onChange={(val) => { setFilterUser(val); setCurrentPage(1); }}
            />
            <Fields
              label="RATING"
              type="select"
              value={filterRating}
              onChange={(val) => { setFilterRating(val); setCurrentPage(1); }}
              options={[
                { label: "All Ratings", value: "All" },
                { label: "5 Stars", value: "5" },
                { label: "4 Stars", value: "4" },
                { label: "3 Stars", value: "3" },
                { label: "2 Stars", value: "2" },
                { label: "1 Star", value: "1" }
              ]}
            />
            <Fields
              label="STATUS"
              type="select"
              value={filterStatus}
              onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
              options={[
                { label: "All Statuses", value: "All" },
                { label: "Approved", value: "Approved" },
                { label: "Pending", value: "Pending" },
                { label: "Flagged", value: "Flagged" }
              ]}
            />
          </div>
        );
      case "Orders":
        return (
          <div className="grid-cols-4 gap-12 w-full">
            <Fields
              label="ORDER ID"
              type="input"
              placeholder="Search Order ID..."
              value={filterName}
              onChange={(val) => { setFilterName(val); setCurrentPage(1); }}
            />
            <Fields
              label="CUSTOMER"
              type="input"
              placeholder="Search customer..."
              value={filterUser}
              onChange={(val) => { setFilterUser(val); setCurrentPage(1); }}
            />
            <Fields
              label="PAYMENT METHOD"
              type="select"
              value={filterPayment}
              onChange={(val) => { setFilterPayment(val); setCurrentPage(1); }}
              options={[
                { label: "All Payments", value: "All" },
                { label: "Credit Card", value: "Credit Card" },
                { label: "PayPal", value: "PayPal" },
                { label: "Apple Pay", value: "Apple Pay" },
                { label: "Google Pay", value: "Google Pay" }
              ]}
            />
            <Fields
              label="STATUS"
              type="select"
              value={filterStatus}
              onChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}
              options={[
                { label: "All Statuses", value: "All" },
                { label: "Delivered", value: "Delivered" },
                { label: "Shipped", value: "Shipped" },
                { label: "Processing", value: "Processing" },
                { label: "Cancelled", value: "Cancelled" }
              ]}
            />
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
      onSidebarItemClick={(name) => { setSelectedCategory(name); setCurrentPage(1); }}
      headerIcon={<Icon name="Orders" width="22" height="22" strokeWidth="2" />}
      headerTitle="Products Overview"
      headerSub={getHeaderSub()}
      quickAction={
        activeTab !== "Analytic" ? (
          <div className="text-right">
            <p className="mini-text text-gray font-600 uppercase mb-2">QUICK ACTION</p>
            <p className="small-text font-600 text-primary flex items-center gap-2 decoration-none cursor-pointer" onClick={() => setIsAddModalOpen(true)}>
              {getModalTitle()}
              <Icon name="ChevronRight" width="14" height="14" strokeWidth="2.5" />
            </p>
          </div>
        ) : null
      }
      tabs={[
        {
          name: "Product List",
          count: productsList.length,
          icon: <Icon name="Product List" width="16" height="16" strokeWidth="2.5" />
        },
        {
          name: "Inventory",
          count: inventoryList.length,
          icon: <Icon name="Inventory" width="16" height="16" strokeWidth="2.5" />
        },
        {
          name: "Reviews",
          count: reviewsList.length,
          icon: <Icon name="Reviews" width="16" height="16" strokeWidth="2.5" />
        },
        {
          name: "Orders",
          count: ordersList.length,
          icon: <Icon name="Orders" width="16" height="16" strokeWidth="2.5" />
        },
        {
          name: "Analytic",
          count: null,
          icon: <Icon name="Analytic" width="16" height="16" strokeWidth="2.5" />
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
      {activeTab === "Analytic" && (
        <>
          <div className="grid-cols-5 gap-12">
            {sparklineCardsData.map((card) => (
              <SparklineCard
                key={card.id}
                title={card.title}
                value={card.value}
                changeText={card.changeText}
                isPositive={card.isPositive}
                chartColor={card.chartColor}
                chartData={card.chartData}
              />
            ))}
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

      {activeTab !== "Analytic" && (
        <div className="">
          <Table
            title={activeTab}
            headerSub={getHeaderSub()}
            columns={getTableColumns()}
            data={tableData}
            totalItems={tableTotal}
            itemsPerPage={10}
            page={currentPage}
            onPageChange={(p) => setCurrentPage(p)}
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            showControls={true}
          />
        </div>
      )}

      <CrudModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={getModalTitle()}
        size="sm"
        type='sidebar'
        placement='right'
        fields={getModalFields()}
        onSubmit={handleAddSubmit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete this item? This action cannot be undone.`}
      />
    </Structure>
  );
};

export default Product;
