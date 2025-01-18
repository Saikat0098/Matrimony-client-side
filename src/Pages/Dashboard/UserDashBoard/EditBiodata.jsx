import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Heart } from 'lucide-react';

const EditBiodata = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

  });

  const [errors, setErrors] = useState({});

  const divisions = [
    'Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'
  ];


  // height Options 
  const heightOptions = Array.from({ length: 56 }, (_, i) => {
    const feet = Math.floor((4 * 12 + i) / 12);
    const inches = (4 * 12 + i) % 12;
    return `${feet}'${inches}"`;
  });

  const weightOptions = Array.from({ length: 151 }, (_, i) => `${i + 40} kg`);

  const occupations = [
    'Student', 'Business', 'Private Job', 'Government Job',
    'Doctor', 'Engineer', 'Teacher', 'Others'
  ];

  const races = ['Fair', 'Light', 'Medium', 'Olive', 'Brown', 'Dark'];


  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
      age: date ? calculateAge(date) : ''
    }));
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age.toString();
  };

  const validateForm = () => {
    const newErrors = {};
    // const requiredFields = [
    //   'biodataType', 'height', 'weight', 'occupation', 'race', 'permanentDivision', 'presentDivision', 'expectedPartnerHeight', 'expectedPartnerWeight', 'mobileNumber'
    // ];

    // requiredFields.forEach((field) => {
    //   if (!formData[field]) {
    //     newErrors[field] = 'This field is required';
    //   }
    // });

    const mobileRegex = /^[\d+]{11,}$/;
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 11-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signUpData = Object.fromEntries(formData.entries());
    console.log(signUpData);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-2">
          <Heart className="text-purple-500" size={28} />
          <h2 to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Edit Your Biodata
          </h2>
        </div>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Biodata Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Biodata Type*</label>
                <select
                  name="biodataType"
                  value={formData.biodataType}
                  // onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  <option value="">Select Type</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  // onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  // onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleDateChange}
                  name='dateOfBirth'
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  maxDate={new Date()}
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="text"
                  name="age"
                  defaultValue={formData.age}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Height*</label>
                <select
                  name="height"
                  value={formData.height}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 `}
                >
                  <option value="">Select Height</option>
                  {heightOptions.map((height) => (
                    <option key={height} value={height}>{height}</option>
                  ))}
                </select>
              
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight*</label>
                <select
                  name="weight"
                  value={formData.weight}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 `}
                >
                  <option value="">Select Weight</option>
                  {weightOptions.map((weight) => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
                
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation*</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                 
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 `}
                >
                  <option value="">Select Occupation</option>
                  {occupations.map((occupation) => (
                    <option key={occupation} value={occupation}>{occupation}</option>
                  ))}
                </select>
               
              </div>

              {/* Race */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Race*</label>
                <select
                  name="race"
                  value={formData.race}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 `}
                >
                  <option value="">Select Race</option>
                  {races.map((race) => (
                    <option key={race} value={race}>{race}</option>
                  ))}
                </select>
               
              </div>

              {/* Father's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                <input
                  type="text"
                  name="fathersName"
                  value={formData.fathersName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Mother's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                <input
                  type="text"
                  name="mothersName"
                  value={formData.mothersName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Permanent Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Permanent Division*</label>
                <select
                  name="permanentDivision"
                  value={formData.permanentDivision}
                  // onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>
               
              </div>

              {/* Present Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Present Division*</label>
                <select
                  name="presentDivision"
                  value={formData.presentDivision}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 `}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division} value={division}>{division}</option>
                  ))}
                </select>
             
              </div>

              {/* Expected Partner Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Partner Age</label>
                <input
                  type="text"
                  name="expectedPartnerAge"
                  value={formData.expectedPartnerAge}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Expected Partner Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Partner Height*</label>
                <select
                  name="expectedPartnerHeight"
                  value={formData.expectedPartnerHeight}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  <option value="">Select Height</option>
                  {heightOptions.map((height) => (
                    <option key={height} value={height}>{height}</option>
                  ))}
                </select>
                 
              </div>
                {/* Expected Partner Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Partner Weight*</label>
                <select
                  name="expectedPartnerWeight"
                  value={formData.expectedPartnerWeight}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500}`}
                >
                  <option value="">Select Weight</option>
                  {weightOptions.map((weight) => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
               
              </div>
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number*</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              />
             
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
              // bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md rounded-lg"
              >
                Save Biodata
              </button>
               
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBiodata;