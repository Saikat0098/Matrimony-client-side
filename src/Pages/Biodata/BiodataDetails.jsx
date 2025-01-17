import React from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Briefcase, User, Ruler, Weight, Target, Crown, Heart } from 'lucide-react';

const BiodataDetails = () => {
  const data = useLoaderData();
  const { id } = useParams();

  // Filter the selected biodata details
  const biodataDetails = data.filter((item) => item._id === id)[0];
  const gender = biodataDetails.Gender;

  // Find similar biodatas based on gender
  const similarBiodatas = data
    .filter((item) => item._id !== id && item.Gender === gender)
    .slice(0, 3);
    console.log(similarBiodatas);

  // Handle favorite
  const handleAddToFavourites = () => {
    console.log('Added to favorites:', biodataDetails._id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-pink-500 to-rose-500">
            {biodataDetails.isPremium && (
              <div className="absolute top-4 right-4 px-4 py-2 bg-yellow-400 text-white rounded-full flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Premium</span>
              </div>
            )}
          </div>

          <div className="relative px-6 pb-8">
            {/* Profile Image */}
            <div className="absolute -top-32 left-5">
              <div className="relative">
                <img
                  src={biodataDetails.ProfileImage}
                  alt={biodataDetails.Name}
                  className="w-56 h-56 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <button
                  onClick={handleAddToFavourites}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 text-pink-500" />
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="pt-28">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {biodataDetails.Name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{biodataDetails.Location || 'Location'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{biodataDetails.Occupation}</span>
                    </div>
                  </div>
                </div>

                <div className="space-x-3">
                  {!biodataDetails.isPremium && (
                    <Link
                      to={`/checkout/${biodataDetails._id}`}
                      className="inline-block py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors duration-300 shadow-lg shadow-pink-500/30"
                    >
                      Request Contact Info
                    </Link>
                  )}
                </div>
              </div>

              {/* Detailed Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Birth Date: {new Date(biodataDetails.DateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ruler className="w-4 h-4" />
                      <span>Height: {biodataDetails.Height}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Weight className="w-4 h-4" />
                      <span>Weight: {biodataDetails.Weight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>Gender: {biodataDetails.Gender}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Partner Preferences
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span>Expected Age: {biodataDetails.ExpectedPartnerAge}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ruler className="w-4 h-4" />
                      <span>Expected Height: {biodataDetails.ExpectedPartnerHeight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Weight className="w-4 h-4" />
                      <span>Expected Weight: {biodataDetails.ExpectedPartnerWeight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Profiles Section*/}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Similar Profiles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBiodatas.map((profile) => (
              <div 
                key={profile._id}
                className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-300"
              >
                {/* Header with ID and Gender */}
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-600 font-medium">
                    #{profile.BiodataId}
                  </span>
                  <span className="text-pink-500 font-medium">
                    {profile.Gender}
                  </span>
                </div>

                {/* Profile Info with Image */}
                <div className="flex gap-4">
                  <img
                    src={profile.ProfileImage}
                    alt={profile.Name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  {/* Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{profile.PresentDivision}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">
                        
                        {profile.DateOfBirth}
                         years
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{profile.Occupation}</span>
                    </div>
                  </div>
                </div>

                {/* View Profile Button */}
                <Link 
                  to={`/biodataDetails/${profile._id}`}
                  className="mt-4 block w-full text-center py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;