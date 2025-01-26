import React, { useState } from 'react';
import { FaHeart, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Artistic Left Section */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-10 flex flex-col justify-center relative">
          <FaHeart className="absolute top-6 left-6 text-white/20 text-6xl" />
          <div className="text-white z-10">
            <h2 className="text-2xl font-bold mb-4">Connect Your Story</h2>
            <p className="text-sm text-white/80 mb-6">
              Share your journey. Let's create something beautiful together.
            </p>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-white/70">123 Love Lane, Romance City</p>
              </div>
              <div>
                <h3 className="font-semibold">Contact</h3>
                <p className="text-white/70">(555) LOVE-NOW</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div>
            <label className="block text-xs font-bold text-purple-900 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 text-sm border-b-2 border-purple-200 focus:border-pink-500 outline-none"
              placeholder="Your Name"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-purple-900 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 text-sm border-b-2 border-purple-200 focus:border-pink-500 outline-none"
              placeholder="Your Email"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-purple-900 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-3 py-2 text-sm border-b-2 border-purple-200 focus:border-pink-500 outline-none h-24 resize-none"
              placeholder="Your Story"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-full text-sm flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <span>Send Message</span>
            <FaPaperPlane className="text-xs" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;