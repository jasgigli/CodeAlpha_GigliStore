import React from "react";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Electronics",
  "Computers",
  "Smart Home",
  "Arts & Crafts",
  "Toys",
  "Fashion",
  "Beauty",
  "Home & Kitchen",
  "Sports",
  "Automotive",
  "Grocery",
];

const CategorySidebar = () => {
  return (
    <nav className="space-y-2">
      {categories.map((cat) => (
        <Link
          key={cat}
          to={
            cat === "All"
              ? "/products"
              : `/products?category=${encodeURIComponent(cat)}`
          }
          className="block px-3 py-2 rounded hover:bg-yellow-100 text-gray-800 font-medium transition"
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
};

export default CategorySidebar;
