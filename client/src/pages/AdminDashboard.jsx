import React, { useState } from "react";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tab, setTab] = useState("products");
  if (!user?.isAdmin) return <div>Access denied. Admins only.</div>;
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab("products")}>Products</button>
        <button onClick={() => setTab("orders")}>Orders</button>
      </div>
      {tab === "products" && <AdminProducts />}
      {tab === "orders" && <AdminOrders />}
    </div>
  );
}
