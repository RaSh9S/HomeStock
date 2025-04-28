import React from "react";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-white text-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and brand */}
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2">
                <img
                  src="https://www.shutterstock.com/image-vector/house-logo-template-design-vector-600nw-741515455.jpg"
                  alt="Logo"
                  className="h-8 w-8 rounded"
                />
                <span className="text-xl font-bold">Shopping List</span>
              </a>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex space-x-6">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700">
                  Home
                </a>
                <a href="/addItem" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-200">
                  Add Item
                </a>
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-blue-100 hover:bg-blue-200 flex items-center">
                    <span>More</span>
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block origin-top-right z-10">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About Us</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
                      <div className="border-t border-gray-200"></div>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pricing</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-blue-100 text-gray-800 px-4 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-64 placeholder-gray-500"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;