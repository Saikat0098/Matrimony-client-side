import React, { useState } from "react";
import { FaHeart, FaLink, FaImage, FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GotMarriedPage = () => {
  const [rating, setRating] = useState(0);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const successStoryData = Object.fromEntries(formData.entries());
    
      successStoryData.platformRating = rating;
    
    console.log(successStoryData);
    const data = await axiosPublic.post('/success-story-post', successStoryData); 
  
    if(data.data.insertedId) {
      toast.success('Your success story published');
      navigate('/');
    }
    console.log(data.data);
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-16 px-4">
      <div className="max-w-3xl mx-auto relative">
        {/* Decorative Background Elements */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-200 rounded-full opacity-30 blur-2xl"></div>

        <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 text-center">
            <FaHeart className="mx-auto text-5xl mb-4" />
            <h1 className="text-3xl font-bold">Share Your Love Story</h1>
            <p className="text-white/80 mt-2">
              Inspire others with your journey of eternal love
            </p>
          </div>

          {/* Form Container */}
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaHeart className="mr-2 text-purple-500" />
                    Self Biodata ID
                  </label>
                  <input
                    type="text"
                    name="selfBiodataId"
                    placeholder="Your Biodata ID"
                    required
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaHeart className="mr-2 text-pink-500" />
                    Partner Biodata ID
                  </label>
                  <input
                    type="text"
                    name="partnerBiodataId"
                    placeholder="Partner's Biodata ID"
                    required
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 flex items-center">
                  <FaLink className="mr-2 text-purple-500" />
                  Couple Image URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="coupleImageUrl"
                    placeholder="Paste your couple image URL"
                    required
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaHeart className="mr-2 text-pink-500" />
                    Marriage Date
                  </label>
                   <input type="date" name="date"/>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <FaStar className="mr-2 text-yellow-500" />
                    Rate Our Platform
                  </label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer text-3xl ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 flex items-center">
                  <FaImage className="mr-2 text-pink-500" />
                  Success Story Review
                </label>
                <textarea
                  name="successStory"
                  placeholder="Share your feelings about finding love through our platform..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl hover:opacity-90 transition flex items-center justify-center space-x-3 text-lg font-semibold"
              >
                <FaHeart />
                <span>Submit Love Story</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GotMarriedPage;