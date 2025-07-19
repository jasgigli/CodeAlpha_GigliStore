import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Products = () => {
  const query = useQuery();
  const category = query.get("category");
  const { data: products, isLoading, error } = useProducts();
  const [fallbackProducts, setFallbackProducts] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch fallback products if backend returns empty
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

  const filteredProducts =
    category && safeProducts.length > 0
      ? safeProducts.filter((p) => p.category === category)
      : safeProducts;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-giigli-blue">
        {category ? `${category} Products` : "All Products"}
      </h2>
      {isLoading ? (
        <div className="text-center py-16 text-lg">Loading products...</div>
      ) : error && !usingFallback ? (
        <div className="text-center py-16 text-red-500">
          Failed to load products.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
