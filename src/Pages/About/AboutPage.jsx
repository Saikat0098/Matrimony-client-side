import React from 'react';
import { FaHeart, FaUsers, FaRing, FaSmile, FaArrowRight } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-500">
      {/* Hero Section with Unique Layout */}
      <div className="container mx-auto px-4 py-12 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <FaHeart className="absolute top-10 left-20 text-purple-300 text-5xl" />
          <FaRing className="absolute bottom-10 right-20 text-purple-300 text-5xl" />
        </div>
        
        <div className="relative z-10 text-center bg-white/70 backdrop-blur-lg rounded-2xl p-10 shadow-2xl">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
            Crafting Eternal Love Stories
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-8">
            Weaving dreams, celebrating connections, and nurturing bonds that transcend time.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white/80 backdrop-blur-lg rounded-2xl p-10 shadow-xl">
          <div>
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              Our Heartfelt Mission
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Beyond ceremonies and celebrations, we're dedicated to empowering couples with wisdom, support, and inspiration to build extraordinary, lasting relationships.
            </p>
            <div className="flex items-center space-x-3 group cursor-pointer">
              <span className="text-purple-600 font-semibold text-sm">Learn More</span>
              <FaArrowRight className="text-purple-600 group-hover:translate-x-2 transition-transform text-sm" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-purple-200 to-pink-300 p-2">
              <FaHeart size={160} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Our Core Essence
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: FaUsers, title: "Unity", description: "Celebrating partnerships built on mutual respect and shared dreams." },
            { icon: FaRing, title: "Commitment", description: "Nurturing connections that grow stronger with every challenge." },
            { icon: FaSmile, title: "Joy", description: "Embracing love's spontaneity and life's beautiful moments." },
            { icon: FaHeart, title: "Compassion", description: "Supporting each other's journey with empathy and understanding." }
          ].map(({ icon: Icon, title, description }, index) => (
            <div 
              key={title} 
              className="text-center bg-white/70 backdrop-blur-lg rounded-2xl p-6 transform hover:-translate-y-4 transition-all duration-300 shadow-xl"
            >
              <Icon size={48} className="mx-auto text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold mb-3 text-purple-800">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Your Love, Our Passion
          </h2>
          <p className="text-base mb-8 max-w-2xl mx-auto text-white/90">
            Begin an extraordinary journey of love, connection, and shared dreams.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-base font-bold hover:bg-purple-100 transition-all flex items-center space-x-3 mx-auto">
            <span>Start Your Journey</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;