import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#6B49F4] to-[#FF69B4] text-white py-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-lg mb-4">Explore</h3>
          <ul>
            <li><Link to="/" className="hover:text-purple-50 transition-colors duration-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-purple-50 transition-colors duration-300">About</Link></li>
            <li><Link to="/services" className="hover:text-purple-50 transition-colors duration-300">Services</Link></li>
            <li><Link to="/contact" className="hover:text-purple-50 transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg mb-4">Connect</h3>
          <ul>
            <li><Link to="/testimonials" className="hover:text-purple-50 transition-colors duration-300">Testimonials</Link></li>
            <li><Link to="/blog" className="hover:text-purple-50 transition-colors duration-300">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-purple-50 transition-colors duration-300">FAQs</Link></li>
            <li><Link to="/community" className="hover:text-purple-50 transition-colors duration-300">Community</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg mb-4">Join Us</h3>
          <p className="mb-4 text-purple-50">Sign up for our newsletter and stay updated.</p>
          <form className="flex items-center">
            <input type="email" placeholder="Enter your email" className="bg-purple-50 border-none text-[#1C1C1E] py-3 px-4 rounded-l-full flex-grow focus:outline-none" />
            <button type="submit" className="bg-white text-[#6B49F4] py-3 px-4 rounded-r-full hover:bg-[#FF69B4] hover:text-white transition-colors duration-300 focus:outline-none">Subscribe</button>
          </form>
        </div>
        <div>
          <h3 className="text-white text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-purple-50 transition-colors duration-300"><FaFacebookF size={20} /></a>
            <a href="#" className="text-white hover:text-purple-50 transition-colors duration-300"><FaTwitter size={20} /></a>
            <a href="#" className="text-white hover:text-purple-50 transition-colors duration-300"><FaInstagram size={20} /></a>
            <a href="#" className="text-white hover:text-purple-50 transition-colors duration-300"><FaYoutube size={20} /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-purple-50">
        <p>&copy; {new Date().getFullYear()} Savvy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;