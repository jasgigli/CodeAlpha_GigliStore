import React from "react";

// Mock orders data
const orders = [
  {
    id: "ORD123456",
    date: "2024-06-01",
    total: 129.99,
    items: [
      { title: "Wireless Headphones", price: 59.99 },
      { title: "Smart Watch", price: 70.0 },
    ],
    status: "Delivered",
  },
  {
    id: "ORD123457",
    date: "2024-05-20",
    total: 39.99,
    items: [{ title: "Bluetooth Speaker", price: 39.99 }],
    status: "Shipped",
  },
];

const Orders = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6 text-giigli-blue">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center py-16 text-lg">You have no orders yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded p-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div>
                  <div className="font-bold">Order #{order.id}</div>
                  <div className="text-sm text-gray-500">
                    Placed on {order.date}
                  </div>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <div className="font-bold text-lg">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    {order.status}
                  </div>
                </div>
              </div>
              <ul className="pl-4 list-disc text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title}{" "}
                    <span className="text-gray-500">
                      - ${item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
