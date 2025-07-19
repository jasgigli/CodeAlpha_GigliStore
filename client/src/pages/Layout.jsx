import React from "react";
import { Outlet } from "react-router-dom";
import CategorySidebar from "../components/CategorySidebar";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 shadow bg-white">
        <NavBar />
      </header>
      <div className="flex flex-1 w-full max-w-screen-2xl mx-auto">
        {/* Sidebar placeholder for categories */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <CategorySidebar />
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200 mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
