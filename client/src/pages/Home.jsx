import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div>
      {/* Hero Banner Placeholder */}
      <div className="w-full h-48 md:h-64 bg-gradient-to-r from-yellow-200 to-yellow-400 flex items-center justify-center mb-8 rounded-lg shadow">
        <h1 className="text-3xl md:text-5xl font-bold text-giigli-blue">
          Welcome to Gigli-Store
        </h1>
      </div>
      {/* Product Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-lg">Loading products...</div>
      ) : error ? (
        <div className="text-center py-16 text-red-500">
          Failed to load products.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {(Array.isArray(products) ? products : []).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
