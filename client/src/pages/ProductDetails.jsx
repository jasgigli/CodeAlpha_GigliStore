import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const fetchProduct = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });
  const [fallbackProduct, setFallbackProduct] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (error) {
      // Try fallback API
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.id) {
            setFallbackProduct(data);
            setUsingFallback(true);
          }
        });
    } else {
      setUsingFallback(false);
    }
  }, [error, id]);

  const displayProduct = usingFallback ? fallbackProduct : product;

  if (isLoading && !usingFallback)
    return <div className="text-center py-16 text-lg">Loading product...</div>;
  if (!displayProduct)
    return (
      <div className="text-center py-16 text-red-500">
        Failed to load product.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={
            displayProduct.image ||
            displayProduct.thumbnail ||
            "https://via.placeholder.com/300"
          }
          alt={displayProduct.title}
          className="object-contain h-64 w-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300";
          }}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-bold mb-2">{displayProduct.title}</h2>
        <div className="text-yellow-500 text-lg mb-2">
          {"★".repeat(Math.round(displayProduct.rating || 4))}
          {"☆".repeat(5 - Math.round(displayProduct.rating || 4))}
        </div>
        <div className="font-bold text-2xl mb-4">
          ${displayProduct.price?.toFixed(2) || "0.00"}
        </div>
        <p className="mb-6 text-gray-700">{displayProduct.description}</p>
        <button
          onClick={() => addToCart(displayProduct)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded w-full md:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
