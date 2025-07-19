import React from "react";

const Footer = () => (
  <footer className="w-full py-6 bg-giigli-blue text-white text-center mt-8">
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <a href="/" className="hover:underline">
        Home
      </a>
      <a href="/products" className="hover:underline">
        Products
      </a>
      <a href="/orders" className="hover:underline">
        Orders
      </a>
      <a href="/profile" className="hover:underline">
        Profile
      </a>
    </div>
    <div className="mt-2 text-sm">
      &copy; {new Date().getFullYear()} Gigli-Store. All rights reserved.
    </div>
  </footer>
);

export default Footer;
