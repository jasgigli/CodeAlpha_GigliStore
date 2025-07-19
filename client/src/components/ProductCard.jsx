import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  // Support both backend (_id/name) and fallback (id/title) fields
  const id = product._id || product.id;
  const title = product.name || product.title;
  const rating = product.rating || 4;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col p-4 h-full">
      <div className="flex-1 flex items-center justify-center mb-4">
        <Link to={`/products/${id}`} className="block w-full">
          <img
            src={
              product.image ||
              product.thumbnail ||
              "https://via.placeholder.com/150"
            }
            alt={title}
            className="object-contain h-32 w-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <Link to={`/products/${id}`} className="hover:underline">
          <h3 className="font-semibold text-base mb-1 line-clamp-2">{title}</h3>
        </Link>
        <div className="text-yellow-500 text-sm mb-1">
          {"★".repeat(Math.round(rating))}
          {"☆".repeat(5 - Math.round(rating))}
        </div>
        <div className="font-bold text-lg mb-2">
          ${Number(product.price || 0).toFixed(2)}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
