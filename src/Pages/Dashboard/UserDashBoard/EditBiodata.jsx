import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Heart } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useBiodata from '../../../Hooks/useBiodata';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const EditBiodata = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({

  });

  const [biodata] = useBiodata() ; 
 
  
   // user already existingUser or no 
 
   const { data: viewBioData = [] } = useQuery({
     queryKey: [user?.email, "viewBioData"],
     queryFn: async () => {
       const res = await axiosSecure.get(
         `/view-bioData?ContactEmail=${user?.email}`
       );
 
       return res.data;
     },
   });

   const id  = viewBioData.map(item => item._id)
 
  //  console.log( 'viewBioData' , viewBioData.Name);
   const existingUser = viewBioData.length > 0;
 

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

 
  const handleSubmit = (e) => {
   e.preventDefault()
   const formData = new FormData(e.target);
   const biodataInfo = Object.fromEntries(formData.entries());
 
   const newBiodataInfo = {...biodataInfo , email : 'pending'} ; 
 

    axiosSecure.put( `/biodataUpdate/${id}` , biodataInfo    )
    .then((res) =>{
      toast.success('BioData Edit success')
      navigate('/dashboard/view-biodata')
    
    })

  };
  const handleButtonClick = () => {
    navigate(existingUser ? '/dashboard/edit-biodata' : '/dashboard/create-biodata');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-2">
            <Heart className="text-purple-500" size={28} />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {existingUser ? 'Edit Your Biodata' : 'Create Your Biodata'}
            </h2>
          </div>
          {!existingUser &&  <button
            onClick={handleButtonClick}
            className="w-full py-2 px-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md rounded-lg"
            
          >
            Create Your Biodata
          </button>
          
          }
          {existingUser && (
      
              <div>
                {
                  viewBioData.map(member =>  <form key={member._id} onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Biodata Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Biodata Type*</label>
                        <select
                          name="Gender"
                          // onChange={handleChange}
                          defaultValue={member.Gender}
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
                          name="Name"
                          defaultValue={member.Name}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
        
                      {/* Profile Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                        <input
                          type="text"
                          name="ProfileImage"
                          defaultValue={member?.ProfileImage}
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
                          name='DateOfBirth'
                          // value={member?.DateOfBirth}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select date"
                          maxDate={new Date()}
                          showYearDropdown
                          dropdownMode="select"
                          required
                        />
                      </div>
        
                      {/* Age */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                          type="text"
                          name="Age"
                          defaultValue={member.Age}
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                          required
                        />
                      </div>
        
                      {/* Height */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Height*</label>
                        <select
                          name="Height"
                          value={formData.height}
                          defaultValue={member.Height}
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
                          name="Weight"
                          defaultValue={member?.Weight}

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
                          name="Occupation"
                          defaultValue={member?.Occupation}

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
                          name="Race"
                          defaultValue={member?.Race}

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
                          name="FathersName"
                          value={formData.fathersName}
                          defaultValue={member?.FathersName}

                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
        
                      {/* Mother's Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                        <input
                          type="text"
                          name="MothersName"
                          defaultValue={member?.MothersName}

                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
        
                      {/* Permanent Division */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Permanent Division*</label>
                        <select
                          name="PermanentDivision"
                          defaultValue={member?.PermanentDivision}

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
                          name="PresentDivision"
                          defaultValue={member?.PresentDivision}

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
                          name="ExpectedPartnerAge"
                          defaultValue={member?.ExpectedPartnerAge}

                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
        
                      {/* Expected Partner Height */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expected Partner Height*</label>
                        <select
                          name="ExpectedPartnerHeight"
                          defaultValue={member?.ExpectedPartnerHeight}

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
                          name="ExpectedPartnerWeight"
                          defaultValue={member?.ExpectedPartnerWeight}

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
                        name="ContactEmail"
                        defaultValue={user?.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      />
                    </div>
        
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mobile Number*</label>
                      <input
                        type="tel"
                        name="MobileNumber"
                        defaultValue={member?.MobileNumber}

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
                  </form>  )
                }
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBiodata;
