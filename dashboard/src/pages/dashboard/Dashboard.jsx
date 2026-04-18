import React from "react";
import GenericContainer from "../utility/GenericContainer";
import GenericChart from "../utility/GenericChart";
import GenericTabs from "../utility/GenericTabs";
import GenericTable from "../utility/GenericTable";

const Dasboard = () => {
  const dashcount = [
    {
      title: "Total Vendors",
      value: "34K",
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
    <GenericContainer version="v3">
      <div className="flex items-start w-full gap-12">
        <div className="w-40 grid-cols-1 gap-12">
          <div className="bg-white rounded-5">
            <div className="p-20 flex items-center">
              <div className="w-70">
                <h2 className="title-text font-600 text-dark">
                  Welcome John! 🎉
                </h2>
                <p className="small-text font-400 text-gray">
                  Best seller of the month
                </p>
                <h3 className="title-text font-600 text-primary pt-10">
                  $48.9k
                </h3>
                <button className="bg-primary px-20 py-7 rounded-5 text-white border-0 mt-4">
                  View Sales
                </button>
              </div>
              <div className="w-30">
                <img
                  src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-1/assets/congo-illustration-i9qbJLbF.png"
                  alt="Dash-Profile"
                  className="object-contain w-full h-150"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GenericContainer>
  );
};

export default Dasboard;
