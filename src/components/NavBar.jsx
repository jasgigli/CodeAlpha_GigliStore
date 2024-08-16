import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 flex flex-wrap items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Giigli-Store Logo"
        />
        <span className="text-3xl text-yellow-600 font-bold tracking-wide animate-pulse hover:animate-none transition-all duration-500">
          Giigli-Store
        </span>
      </div>

      <button
        className="text-white md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      <ul
        className={`md:flex md:space-x-6 md:items-center ${
          isOpen ? "block" : "hidden"
        } w-full md:w-auto mt-4 md:mt-0`}
      >
        <li>
          <Link
            to="/"
            className="block px-4 py-2 text-white hover:text-gray-400 rounded-md"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/Products"
            className="block px-4 py-2 text-white hover:text-gray-400 rounded-md"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/Categories"
            className="block px-4 py-2 text-white hover:text-gray-400 rounded-md"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            to="/Contact"
            className="block px-4 py-2 text-white hover:text-gray-400 rounded-md"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="block px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          >
            Log In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
