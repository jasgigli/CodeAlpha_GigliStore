import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const NavBar = () => {
  const cartCount = useCartStore((state) => state.getCartCount());

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-giigli-blue text-white">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        {/* Placeholder for Gigli-Store logo */}
        <span className="font-bold text-2xl tracking-tight">Gigli-Store</span>
      </Link>
      {/* Search Bar */}
      <div className="flex-1 mx-4 max-w-2xl">
        <form className="flex">
          <input
            type="text"
            placeholder="Search Gigli-Store..."
            className="w-full px-3 py-2 rounded-l-md border-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-r-md text-black font-bold"
          >
            {/* Search icon placeholder */}
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </form>
      </div>
      {/* Account, Orders, Cart */}
      <div className="flex items-center gap-6">
        <Link
          to="/profile"
          className="flex flex-col items-center hover:underline"
        >
          <span className="text-xs">Hello, Sign in</span>
          <span className="font-bold text-sm">Account & Lists</span>
        </Link>
        <Link
          to="/orders"
          className="flex flex-col items-center hover:underline"
        >
          <span className="text-xs">Returns</span>
          <span className="font-bold text-sm">& Orders</span>
        </Link>
        <Link to="/cart" className="relative flex items-center">
          {/* Cart icon placeholder */}
          <span role="img" aria-label="cart" className="text-2xl">
            🛒
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full px-2 text-xs font-bold">
              {cartCount}
            </span>
          )}
          <span className="ml-1 font-bold text-sm hidden md:inline">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

// Tailwind custom color for Amazon blue
// Add to tailwind.config.js:
// colors: { 'amazon-blue': '#131921', ... }
