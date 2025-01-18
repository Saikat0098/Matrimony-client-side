import React from 'react';
import {
  Briefcase,
  Calendar,
  Crown,
  Heart,
  MapPin,
  Ruler,
  Target,
  User,
  Weight as WeightIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ViewBioDataDetails = ({ item }) => {
  const {
    ProfileImage,
    Name,
    BiodataId,
    Gender,
    DateOfBirth,
    Weight,
    Height,
    Age,
    Occupation,
    Race,
    FathersName,
    MothersName,
    PermanentDivision,
    PresentDivision,
    ExpectedPartnerAge,
    ExpectedPartnerHeight,
    ExpectedPartnerWeight,
    ContactEmail,
    MobileNumber,
    _id,
  } = item;

  console.log('Item Details:', item);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
      <div className="relative h-48 bg-gradient-to-r from-pink-500 to-rose-500">
        {/* Uncomment if premium feature is required */}
        {item.isPremium && (
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
              src={ProfileImage}
              alt={Name}
              className="w-56 h-56 rounded-2xl object-cover border-4 border-white shadow-lg"
            />
            <button
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{Name}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{PresentDivision || 'Location'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{Occupation || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Uncomment if contact feature is required */}
            <div className="space-x-3">
              {!item.isPremium && (
                <Link
                  to={`/checkout/${_id}`}
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
                  <span>
                    Birth Date:{' '}
                    {DateOfBirth
                      ? new Date(DateOfBirth).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Ruler className="w-4 h-4" />
                  <span>Height: {Height || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <WeightIcon className="w-4 h-4" />
                  <span>Weight: {Weight || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>Gender: {Gender || 'N/A'}</span>
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
                  <span>Expected Age: {ExpectedPartnerAge || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Ruler className="w-4 h-4" />
                  <span>
                    Expected Height: {ExpectedPartnerHeight || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <WeightIcon className="w-4 h-4" />
                  <span>
                    Expected Weight: {ExpectedPartnerWeight || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBioDataDetails;
