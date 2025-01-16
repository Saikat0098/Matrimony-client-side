import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 shadow-md">
      <div className="px-4 py-3 mx-auto flex items-center justify-between">
        {/* Logo + Website Name */}
        <div className="flex items-center gap-2">
          <Heart className="text-purple-500" size={28} />
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Matrimony
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8">
            <Link to="/" className="text-gray-700 hover:text-purple-500 transition">
              Home
            </Link>
            <Link to="/biodatas" className="text-gray-700 hover:text-purple-500 transition">
              Biodatas
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-500 transition">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-500 transition">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <div className="hidden md:flex items-center w-32 justify-end">
          <Link to="/login">
            <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-purple-700 hover:to-pink-600 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 border-t">
          <div className="flex flex-col p-4 space-y-3">
            <Link to="/" className="text-gray-700 hover:text-purple-500 transition">
              Home
            </Link>
            <Link to="/biodatas" className="text-gray-700 hover:text-purple-500 transition">
              Biodatas
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-500 transition">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-500 transition">
              Contact Us
            </Link>
            <div className="pt-3">
              <Link to="/login" className="block">
                <button className="w-full px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-purple-700 hover:to-pink-600 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
