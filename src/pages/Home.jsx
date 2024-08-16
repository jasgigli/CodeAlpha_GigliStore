import React from "react";
import Watch from "../components/menProducts/electronics/Watch";
import Comb from "../components/womenProducts/Comb";
import Toys from "../components/childProducts/Toys";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      {/* Search Bar Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <form className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search for products..."
            className="flex-1 px-6 py-3 border border-transparent rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Search
          </button>
        </form>
      </div>

      {/* Featured Products Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 animate-fadeIn">
          Featured Products
        </h2>
        <p className="text-gray-600 text-lg">
          Discover our exclusive range of products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Men's Products */}
        <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Men's Products
          </h3>
          <div className="hover:opacity-90 transition-opacity duration-300">
            <Watch />
          </div>
        </div>

        {/* Women's Products */}
        <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Women's Products
          </h3>
          <div className="hover:opacity-90 transition-opacity duration-300">
            <Comb />
          </div>
        </div>

        {/* Children's Products */}
        <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 hover:shadow-2xl transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Children's Products
          </h3>
          <div className="hover:opacity-90 transition-opacity duration-300">
            <Toys />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
