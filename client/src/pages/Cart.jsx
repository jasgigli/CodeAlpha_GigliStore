import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const Cart = () => {
  const { items, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6 text-giigli-blue">
        Shopping Cart
      </h2>
      {items.length === 0 ? (
        <div className="text-center py-16 text-lg">
          Your cart is empty.
          <br />
          <Link to="/products" className="text-giigli-blue underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 flex items-center gap-4">
                      <img
                        src={item.image || "https://via.placeholder.com/60"}
                        alt={item.title}
                        className="h-12 w-12 object-contain rounded"
                      />
                      <span>{item.title}</span>
                    </td>
                    <td className="py-2 font-bold">
                      ${Number(item.price || 0).toFixed(2)}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-xl font-bold">
              Subtotal: ${subtotal.toFixed(2)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => clearCart()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
