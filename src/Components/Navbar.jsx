import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, LogOut, User } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const {user , logOut} = useAuth()
 ;
 

  const handleSignOut = () => {
  
    logOut() ,
    toast.success('LogOut')
    navigate('/login');
  };

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

        {/* Login Button or User Avatar */}
        <div className="hidden md:flex items-center w-32 justify-end">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-purple-700 hover:to-pink-600 transition">
                Login
              </button>
            </Link>
          )}
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
            {user && (
              <div className="flex items-center gap-3 pb-3 border-b border-purple-200">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
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
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-purple-700 hover:to-pink-600 transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              ) : (
                <Link to="/login" className="block">
                  <button className="w-full px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:from-purple-700 hover:to-pink-600 transition">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;