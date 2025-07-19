import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleOrder = (e) => {
    e.preventDefault();
    if (!address) {
      setError("Please enter your shipping address.");
      return;
    }
    // Simulate order placement
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6 text-giigli-blue">Checkout</h2>
      <form onSubmit={handleOrder} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Shipping Address</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Payment Method</label>
          <select
            className="w-full border rounded p-2"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Order Summary</label>
          <div className="bg-gray-50 rounded p-4">
            {items.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              <ul className="mb-2">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between py-1">
                    <span>{item.title}</span>
                    <span>${item.price?.toFixed(2) || "0.00"}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="font-bold flex justify-between border-t pt-2 mt-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded text-lg"
          disabled={items.length === 0}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
