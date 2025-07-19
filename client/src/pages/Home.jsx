import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
  const { data: products, isLoading, error } = useProducts();
  const [fallbackProducts, setFallbackProducts] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    if (Array.isArray(products) && products.length === 0) {
      axios.get("https://dummyjson.com/products?limit=30").then((res) => {
        setFallbackProducts(res.data.products || []);
        setUsingFallback(true);
      });
    } else {
      setUsingFallback(false);
    }
  }, [products]);

  const safeProducts = usingFallback
    ? fallbackProducts
    : Array.isArray(products)
    ? products
    : [];

  // Helper to generate random products
  function getRandomProducts(count = 8) {
    const names = [
      "Mystery Gadget",
      "Cool Widget",
      "Super Tool",
      "Fun Toy",
      "Smart Device",
      "Trendy Wearable",
      "Classic Camera",
      "Mini Speaker",
      "Eco Bottle",
      "Urban Backpack",
    ];
    return Array.from({ length: count }).map((_, i) => ({
      id: `sample-${i}`,
      title: names[Math.floor(Math.random() * names.length)],
      price: (Math.random() * 100 + 10).toFixed(2),
      image: `https://picsum.photos/seed/sample${i}/300/200`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      isSample: true,
    }));
  }

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
      ) : error && !usingFallback ? (
        <div className="text-center py-16 text-red-500">
          Failed to load products.
        </div>
      ) : safeProducts.length === 0 ? (
        <div>
          <div className="text-center text-gray-500 mb-6 text-lg">
            No products available. Showing sample products:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {getRandomProducts().map((product) => (
              <div key={product.id} className="relative">
                <span className="absolute top-2 left-2 bg-yellow-300 text-xs px-2 py-1 rounded z-10">
                  Sample Product
                </span>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {safeProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
