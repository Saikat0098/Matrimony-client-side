import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaHeart, FaStar } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PremiumCards = ( ) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('ascending');
  const axiosPublic = useAxiosPublic();

  const { data: viewBioData = [] } = useQuery({
    queryKey: ["viewBioData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/premium-request-bioData`);
      return res.data;
    },
  });

  const sortedProfiles = useMemo(() => {
    const approvedProfiles = viewBioData.filter(item => item.status === 'approved');
    return [...approvedProfiles].sort((a, b) => {
      const ageA = Number(a.Age) || 0;
      const ageB = Number(b.Age) || 0;
      return sortOrder === 'ascending' ? ageA - ageB : ageB - ageA;
    });
  }, [viewBioData, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-16 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-block">
          <span className="text-sm font-medium text-purple-500 bg-purple-100 px-4 py-1 rounded-full">
            Premium Profiles
          </span>
        </div>
        <h2 className="mt-4 text-4xl font-serif font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Find Your Soulmate
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Discover handpicked profiles that match your preferences
        </p>
      </div>

      {/* Sort Control */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white px-4 py-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-300"
          >
            <option value="ascending">Age: Low to High</option>
            <option value="descending">Age: High to Low</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProfiles.slice(0-6).map((profile) => (
          <div key={profile._id} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-80">
                <img
                  src={profile.ProfileImage}
                  alt={`Profile ${profile._id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Premium Badge */}
                {profile.premium && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <FaStar className="text-white text-sm" />
                    <span className="text-white text-sm font-medium">Premium</span>
                  </div>
                )}

                {/* Bottom Info Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-sm px-3 py-1 rounded-full font-medium ${
                        profile.Gender === 'Male'
                          ? 'bg-purple-100/90 text-purple-500'
                          : 'bg-pink-100/90 text-pink-500'
                      }`}
                    >
                      {profile.type}
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-serif mb-1">{profile.Name}</h3>
                  <p className="text-white/80 text-sm">Biodata #{profile.BiodataId}</p>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase">Location</p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-pink-500" />
                      {profile.PermanentDivision}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase">Age</p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-pink-500" />
                      {profile.Age} Years
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase">Profession</p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <FaBriefcase className="text-pink-500" />
                    {profile.Occupation}
                  </p>
                </div>

                <Link to={`/biodataDetails/${profile.infoId}`}>
                  <button
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group-hover:from-purple-600 group-hover:to-pink-600"
                  >
                    <FaHeart className="text-sm" />
                    View Full Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumCards;