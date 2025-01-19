import React, { useState } from 'react';
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
  Mail,
  Phone,
  Users,
  Home,
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePremiumUser from '../../../Hooks/usePremiumUser';

const ViewBioDataDetails = ({ item ,  }) => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const {
    ProfileImage,
    Name,
    BiodataType,
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
    Gender,
 
    _id,
    BiodataId ,
  
  } = item;
  const [isPremium] = usePremiumUser()

  const PremiumMember =  isPremium?.find((item) => item.status )
  
  const isPremiumMember = PremiumMember?.status ; 

  console.log( 'ispremiumDetasils' , isPremiumMember);
  
 const axiosSecure = useAxiosSecure()
  const handlePremiumRequest = async(email , BiodataId , Name ) => {


    const premiumInfo = {email , BiodataId , Name ,  status:"pending"} 
    console.table(premiumInfo);
    // onPremiumRequest(_id);
    const PremiumRequest  = await axiosSecure.post('/premium-request-bioData' , premiumInfo)
    .then(res =>{
      //  console.log('premium request' , PremiumRequest);
      console.log(res.data);
    })
    setShowPremiumModal(false);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
        <div className="relative h-48 bg-gradient-to-r from-pink-500 to-rose-500">
          {isPremiumMember ==='approved' && (
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
              <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-pink-50 transition-colors duration-200">
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
                    <span>{PresentDivision}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{Occupation}</span>
                  </div>
                </div>
              </div>

              <div className="space-x-3">
                {!isPremiumMember  && (
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="inline-block py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors duration-300 shadow-lg shadow-pink-500/30"
                  >
                    Make Premium
                  </button>
                )}
                {
                  isPremiumMember ==='pending'  && <div className="flex flex-col justify-center items-center space-y-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                  <p className="text-blue-500 text-sm font-medium">Pending...</p>
                </div>
                }
              </div>
            </div>

            {/* Detailed Information */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Biodata Type: {BiodataType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Birth Date: {new Date(DateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>Age: {Age} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Ruler className="w-4 h-4" />
                    <span>Height: {Height}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <WeightIcon className="w-4 h-4" />
                    <span>Weight: {Weight}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Palette className="w-4 h-4" />
                    <span>Race: {Race}</span>
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Father's Name: {FathersName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Mother's Name: {MothersName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Home className="w-4 h-4" />
                    <span>Permanent Division: {PermanentDivision}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Present Division: {PresentDivision}</span>
                  </div>
                </div>
              </div>

              {/* Partner Preferences */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Partner Preferences</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>Expected Age: {ExpectedPartnerAge}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Ruler className="w-4 h-4" />
                    <span>Expected Height: {ExpectedPartnerHeight}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <WeightIcon className="w-4 h-4" />
                    <span>Expected Weight: {ExpectedPartnerWeight}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>Email: {ContactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>Mobile: {MobileNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Confirmation Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Make Profile Premium</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to make your profile premium? This will send a request to the admin for approval.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={()=>handlePremiumRequest(ContactEmail , BiodataId , Name)}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-colors"
              >
                Yes, Make Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBioDataDetails;