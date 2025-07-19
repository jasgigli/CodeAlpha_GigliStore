import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Optionally, add mark as delivered (if backend supports it)
  // const markDelivered = async (id) => { ... }

  return (
    <div>
      <h2>Manage Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
            >
              <div>Order ID: {order._id}</div>
              <div>
                User: {order.user?.name} ({order.user?.email})
              </div>
              <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
              <div>Total: ${order.totalPrice.toFixed(2)}</div>
              <div>
                Status: {order.isPaid ? "Paid" : "Unpaid"} /{" "}
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </div>
              <div>
                Items:
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      {item.name} x {item.qty}
                    </li>
                  ))}
                </ul>
              </div>
              {/* <button onClick={() => markDelivered(order._id)}>Mark as Delivered</button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
