// Column configurations for the custom Table component
export const productColumns = [
  { field: "checkbox", label: "" },
  { field: "image", label: "Image" },
  { field: "name", label: "Product Name" },
  { field: "sku", label: "SKU" },
  { field: "category", label: "Category" },
  { field: "price", label: "Price" },
  { field: "stock", label: "Stock" },
  { field: "status", label: "Status" },
  { field: "rating", label: "Rating" },
  { field: "sales", label: "Sales" },
  { field: "updated", label: "Updated" },
  { field: "actions", label: "" }
];

export const inventoryColumns = [
  { field: "checkbox", label: "" },
  { field: "name", label: "Product Name" },
  { field: "sku", label: "SKU" },
  { field: "category", label: "Category" },
  { field: "qty", label: "Qty" },
  { field: "reorder", label: "Reorder Lvl" },
  { field: "location", label: "Location" },
  { field: "val", label: "Value" },
  { field: "status", label: "Status" },
  { field: "actions", label: "" }
];

export const reviewColumns = [
  { field: "checkbox", label: "" },
  { field: "product", label: "Product" },
  { field: "user", label: "User" },
  { field: "rating", label: "Rating" },
  { field: "comment", label: "Comment" },
  { field: "date", label: "Date" },
  { field: "status", label: "Status" },
  { field: "actions", label: "" }
];

export const orderColumns = [
  { field: "checkbox", label: "" },
  { field: "orderId", label: "Order ID" },
  { field: "customer", label: "Customer" },
  { field: "date", label: "Date" },
  { field: "products", label: "Products" },
  { field: "amount", label: "Amount" },
  { field: "payment", label: "Payment" },
  { field: "status", label: "Status" },
  { field: "actions", label: "" }
];

// Mock datasets for CMS pages
export const initialProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=100&q=80",
    name: "iPhone 15 Pro 256GB",
    sub: "Smartphones",
    sku: "IP15P-256",
    category: "Electronics",
    price: "$999.00",
    stock: 45,
    status: "Active",
    rating: 4.6,
    ratingCount: 128,
    sales: "1,245",
    updated: "2 hrs ago"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80",
    name: "MacBook Air M2 13-inch",
    sub: "Laptops",
    sku: "MBA-M2-13",
    category: "Electronics",
    price: "$1,199.00",
    stock: 28,
    status: "Active",
    rating: 4.8,
    ratingCount: 96,
    sales: "876",
    updated: "4 hrs ago"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80",
    name: "Nike Air Max 270",
    sub: "Men's Shoes",
    sku: "NIKE-AM270",
    category: "Fashion",
    price: "$149.00",
    stock: 62,
    status: "Active",
    rating: 4.4,
    ratingCount: 64,
    sales: "532",
    updated: "1 day ago"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80",
    name: "Fossil Gen 6 Smartwatch",
    sub: "Smart Watches",
    sku: "FOS-GEN6",
    category: "Electronics",
    price: "$199.00",
    stock: 15,
    status: "Inactive",
    rating: 4.2,
    ratingCount: 38,
    sales: "302",
    updated: "2 days ago"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=100&q=80",
    name: "Philips 5000 Series Blender",
    sub: "Kitchen Appliances",
    sku: "PHI-5000-BL",
    category: "Home & Kitchen",
    price: "$89.99",
    stock: 0,
    status: "Inactive",
    rating: 4.1,
    ratingCount: 27,
    sales: "0",
    updated: "3 days ago"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=100&q=80",
    name: "Sony WH-1000XM5",
    sub: "Headphones",
    sku: "SONY-XM5",
    category: "Electronics",
    price: "$399.99",
    stock: 41,
    status: "Active",
    rating: 4.7,
    ratingCount: 84,
    sales: "412",
    updated: "4 days ago"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=100&q=80",
    name: "Levi's 501 Original Fit Jeans",
    sub: "Men's Apparel",
    sku: "LEVI-501-OF",
    category: "Fashion",
    price: "$79.50",
    stock: 120,
    status: "Active",
    rating: 4.5,
    ratingCount: 156,
    sales: "1,105",
    updated: "5 days ago"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=100&q=80",
    name: "Atomic Habits",
    sub: "Books",
    sku: "BK-ATMHAB",
    category: "Books & Stationery",
    price: "$14.99",
    stock: 57,
    status: "Active",
    rating: 4.9,
    ratingCount: 112,
    sales: "1,024",
    updated: "1 week ago"
  }
];

export const initialInventory = [
  { id: 1, name: "iPhone 15 Pro 256GB", sku: "IP15P-256", category: "Electronics", qty: 45, reorder: 15, location: "Aisle A-3", val: "$44,955.00", status: "In Stock" },
  { id: 2, name: "MacBook Air M2 13-inch", sku: "MBA-M2-13", category: "Electronics", qty: 28, reorder: 10, location: "Aisle A-5", val: "$33,572.00", status: "In Stock" },
  { id: 3, name: "Nike Air Max 270", sku: "NIKE-AM270", category: "Fashion", qty: 62, reorder: 25, location: "Aisle F-1", val: "$9,238.00", status: "In Stock" },
  { id: 4, name: "Fossil Gen 6 Smartwatch", sku: "FOS-GEN6", category: "Electronics", qty: 15, reorder: 20, location: "Aisle E-2", val: "$2,985.00", status: "Low Stock" },
  { id: 5, name: "Philips 5000 Series Blender", sku: "PHI-5000-BL", category: "Home & Kitchen", qty: 0, reorder: 10, location: "Aisle H-4", val: "$0.00", status: "Out of Stock" },
  { id: 6, name: "Sony WH-1000XM5", sku: "SONY-XM5", category: "Electronics", qty: 41, reorder: 12, location: "Aisle A-2", val: "$16,399.59", status: "In Stock" },
  { id: 7, name: "Levi's 501 Original Fit Jeans", sku: "LEVI-501-OF", category: "Fashion", qty: 120, reorder: 30, location: "Aisle F-4", val: "$9,540.00", status: "In Stock" },
  { id: 8, name: "Atomic Habits", sku: "BK-ATMHAB", category: "Books & Stationery", qty: 57, reorder: 15, location: "Aisle B-1", val: "$854.43", status: "In Stock" }
];

export const initialReviews = [
  { id: 1, product: "iPhone 15 Pro 256GB", user: "Alexander W.", rating: 5, comment: "Exceptional build quality and the camera is unmatched.", date: "2026-06-18", status: "Approved" },
  { id: 2, product: "MacBook Air M2 13-inch", user: "Eleanor P.", rating: 4, comment: "Very light and battery lasts forever, but screen is small.", date: "2026-06-17", status: "Approved" },
  { id: 3, product: "Nike Air Max 270", user: "Marcus G.", rating: 5, comment: "Super comfortable for daily running. True to size.", date: "2026-06-15", status: "Approved" },
  { id: 4, product: "Fossil Gen 6 Smartwatch", user: "Sarah L.", rating: 3, comment: "Battery life is mediocre, but design is premium.", date: "2026-06-12", status: "Pending" },
  { id: 5, product: "Philips 5000 Series Blender", user: "David K.", rating: 2, comment: "Blades stopped rotating after 2 weeks. Disappointed.", date: "2026-06-10", status: "Flagged" },
  { id: 6, product: "Sony WH-1000XM5", user: "Olivia R.", rating: 5, comment: "Best noise cancellation I've ever experienced.", date: "2026-06-08", status: "Approved" }
];

export const initialOrders = [
  { id: 1, orderId: "#ORD-87612", customer: "James Harrison", date: "2026-06-18", products: "iPhone 15 Pro x1", amount: "$999.00", payment: "Credit Card", status: "Delivered" },
  { id: 2, orderId: "#ORD-87611", customer: "Sophia Martinez", date: "2026-06-18", products: "Nike Air Max x2", amount: "$298.00", payment: "PayPal", status: "Shipped" },
  { id: 3, orderId: "#ORD-87610", customer: "Liam Jenkins", date: "2026-06-17", products: "MacBook Air x1", amount: "$1,199.00", payment: "Credit Card", status: "Processing" },
  { id: 4, orderId: "#ORD-87609", customer: "Mia Wong", date: "2026-06-16", products: "Fossil Gen 6 x1", amount: "$199.00", payment: "Apple Pay", status: "Processing" },
  { id: 5, orderId: "#ORD-87608", customer: "Noah Patel", date: "2026-06-15", products: "Sony XM5 x1", amount: "$399.99", payment: "Google Pay", status: "Delivered" },
  { id: 6, orderId: "#ORD-87607", customer: "Emma Watson", date: "2026-06-14", products: "Blender 5000 x1", amount: "$89.99", payment: "Credit Card", status: "Cancelled" }
];
