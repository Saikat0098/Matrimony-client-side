import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserEdit, 
  FaHeart, 
  FaShieldAlt, 
  FaChartLine, 
  FaSearch, 
  FaUserPlus 
} from 'react-icons/fa';

const BiodataSection = () => {
  const [profileStatus, setProfileStatus] = useState({
    completionRate: 65,
    verificationLevel: 'Intermediate',
    matchPotential: 'High'
  });

  const profileFeatures = [
    {
      icon: FaSearch,
      title: "Smart Matching",
      description: "AI-powered compatibility analysis"
    },
    {
      icon: FaShieldAlt,
      title: "Secure Verification",
      description: "Multi-layer profile authentication"
    },
    {
      icon: FaChartLine,
      title: "Match Analytics",
      description: "Detailed compatibility insights"
    },
    {
      icon: FaUserPlus,
      title: "Profile Optimization",
      description: "Dynamic recommendation boosting"
    }
  ];

  return (
    <div className="   bg-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
         
         <div className='text-center text-2xl text-purple-600 uppercase font-bold'>
            how it work section
         </div>
       

        {/* Professional Features Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {profileFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 text-center 
                         shadow-lg hover:shadow-2xl 
                         transform transition-all hover:-translate-y-3"
            >
              <feature.icon className="mx-auto text-5xl text-pink-500 mb-4 
                                       transform group-hover:rotate-12 
                                       transition-transform" />
              <h3 className="text-xl font-semibold text-purple-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataSection;