import React from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Briefcase,
  User,
  Ruler,
  Weight,
  Target,
  Crown,
  Heart,
  Mail,
  Phone,
  Shield,
  Palette,
  Home,
  Users,
  WeightIcon,
} from "lucide-react";
import usePremiumUser from "../../Hooks/usePremiumUser";
import useDirectPremiumUsers from "../../Hooks/useDirectPremiumUsers";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const BiodataDetails = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const data = useLoaderData();
 
  const { id } = useParams();
  const [isPremium] = usePremiumUser();
  const [PremiumUser, refetch, isLoading] = useDirectPremiumUsers();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

 
  if (!data || !id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">No data available</div>
      </div>
    );
  }

  // Filter the selected biodata details
  const biodataDetails = data.find((item) => item._id === id);

  
  if (!biodataDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Biodata not found</div>
      </div>
    );
  }

  const gender = biodataDetails.Gender;

  // Find similar biodatas based on gender
  const similarBiodatas = data
    .filter((item) => item._id !== id && item.Gender === gender)
    .slice(0, 3);

  // Handle favorite
  const handleAddToFavourites = async(name , bioDataId , address , occupation) => {
    
    const myFavoritePerson = {name , bioDataId , address , occupation , email : user?.email}
    
      await axiosSecure.post('/my-favorite' , myFavoritePerson)
     .then(res => {
      if(res.data.insertedId){
        toast.success('favorite person added')
      }
      console.log(res.data);
     })
  };

  const isPremiumApproved = Array.isArray(isPremium) && 
    isPremium.some(item => item?.status === "approved");

  const showContactInfo = isPremiumApproved || PremiumUser;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-pink-500 to-rose-500" />

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
                  onClick={()=>handleAddToFavourites(biodataDetails.Name , biodataDetails.BiodataId , biodataDetails.PermanentDivision , biodataDetails.Occupation , )}
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    {biodataDetails.Name}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{biodataDetails.PresentDivision}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{biodataDetails.Occupation}</span>
                    </div>
                  </div>
                </div>

                <div className="space-x-3">
                  {!showContactInfo && (
                    <Link
                      to={`/checkout/${biodataDetails._id}`}
                      className="inline-block text-xs md:text-[16px] py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors duration-300 shadow-lg shadow-pink-500/30"
                    >
                      Request Contact Info
                    </Link>
                  )}
                </div>
              </div>

              {/* Contact Information Card for Premium Users */}
              {showContactInfo && (
                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-yellow-800 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Premium Contact Information
                    </h2>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      Verified Details
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                      <Mail className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="text-gray-900">
                          {biodataDetails.ContactEmail}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                      <Phone className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="text-gray-900">
                          {biodataDetails.MobileNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Age: {biodataDetails.Age} years</span>
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
                    <div className="flex items-center gap-2 text-gray-600">
                      <Palette className="w-4 h-4" />
                      <span>Race: {biodataDetails.Race}</span>
                    </div>
                  </div>
                </div>

                {/* Family Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Family Information
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Father's Name: {biodataDetails.FathersName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Mother's Name: {biodataDetails.MothersName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Home className="w-4 h-4" />
                      <span>
                        Permanent Division: {biodataDetails.PermanentDivision}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>
                        Present Division: {biodataDetails.PresentDivision}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Partner Preferences */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Partner Preferences
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span>
                        Expected Age: {biodataDetails.ExpectedPartnerAge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ruler className="w-4 h-4" />
                      <span>
                        Expected Height: {biodataDetails.ExpectedPartnerHeight}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <WeightIcon className="w-4 h-4" />
                      <span>
                        Expected Weight: {biodataDetails.ExpectedPartnerWeight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Profiles Section */}
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
                <div className="flex justify-between items-start mb-3">
                  <span className="text-gray-600 font-medium">
                    #{profile.BiodataId}
                  </span>
                  <span className="text-pink-500 font-medium">
                    {profile.Gender}
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={profile.ProfileImage}
                      alt={profile.Name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    {profile.isPremiumMember === "approved" && (
                      <div className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{profile.PresentDivision}</span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{profile.Age} years</span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{profile.Occupation}</span>
                    </div>
                  </div>
                </div>

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