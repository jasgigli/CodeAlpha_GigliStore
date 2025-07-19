import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col p-4 h-full">
      <div className="flex-1 flex items-center justify-center mb-4">
        <Link to={`/products/${product.id}`} className="block w-full">
          <img
            src={product.image || "https://via.placeholder.com/150"}
            alt={product.title}
            className="object-contain h-32 w-full"
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        <Link to={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-base mb-1 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="text-yellow-500 text-sm mb-1">
          {/* Placeholder for rating */}
          {"★".repeat(Math.round(product.rating || 4))}
          {"☆".repeat(5 - Math.round(product.rating || 4))}
        </div>
        <div className="font-bold text-lg mb-2">
          ${product.price?.toFixed(2) || "0.00"}
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
