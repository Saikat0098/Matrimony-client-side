import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FiEye, FiMapPin, FiCalendar, FiBriefcase, FiFilter, FiX } from 'react-icons/fi';
import useBiodata from '../../Hooks/useBiodata';
import { Link } from 'react-router-dom';

const Biodata = () => {
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });
  const [biodataType, setBiodataType] = useState(null);
  const [division, setDivision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    divisions: [],
    biodataTypes: [],
    occupations: []
  });

  console.log(biodataType?.value);
  console.log(division?.value);
 
  const [biodatas] = useBiodata() 
  console.log(biodatas);

  // Simulated API call to fetch filter options
  useEffect(() => {
    const fetchFilters = async () => {
      // Replace with your actual API call
      setFilters({
        divisions: [
          { value: 'dhaka', label: 'Dhaka' },
          { value: 'chittagong', label: 'Chittagong' },
          { value: 'rangpur', label: 'Rangpur' },
          { value: 'barisal', label: 'Barisal' },
          { value: 'khulna', label: 'Khulna' },
          { value: 'mymensingh', label: 'Mymensingh' },
          { value: 'sylhet', label: 'Sylhet' }
        ],
        biodataTypes: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ],
        occupations: [
          { value: 'doctor', label: 'Doctor' },
          { value: 'engineer', label: 'Engineer' },
          { value: 'teacher', label: 'Teacher' }
        ]
      });
    };

    fetchFilters();
  }, []);

  // const biodatas = [
  //   {
  //     id: 1677,
  //     type: 'Male',
  //     division: 'Rajshahi',
  //     age: 32,
  //     occupation: 'Software Engineer',
  //     imageUrl: '/api/placeholder/80/80',
  //     views: 245
  //   },
  //   {
  //     id: 1676,
  //     type: 'Female',
  //     division: 'Dhaka',
  //     age: 28,
  //     occupation: 'Doctor',
  //     imageUrl: '/api/placeholder/80/80',
  //     views: 189
  //   },
  //   {
  //     id: 1666,
  //     type: 'Male',
  //     division: 'Khulna',
  //     age: 30,
  //     occupation: 'Teacher',
  //     imageUrl: '/api/placeholder/80/80',
  //     views: 156
  //   }
  // ];

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: '42px',
      border: '1px solid #e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #cbd5e1',
      }
    })
  };

  const handleFilterSubmit = () => {
    // Handle filter submission
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowFilters(false); // Close filter on mobile after submission
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 bg-gray-50">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
        >
          {showFilters ? <FiX /> : <FiFilter />}
          <span>{showFilters ? 'Close Filters' : 'Show Filters'}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Section */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'} transition-all duration-300`}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Filter Biodatas</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Age Range</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="18"
                    max="80"
                    value={ageRange.min}
                    onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
                    className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    min="18"
                    max="80"
                    value={ageRange.max}
                    onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
                    className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Biodata Type</label>
                <Select
                  value={biodataType}
                  onChange={setBiodataType}
                  options={filters.biodataTypes}
                  styles={customSelectStyles}
                  placeholder="Select Type"
                  isClearable
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Division</label>
                <Select
                  value={division}
                  onChange={setDivision}
                  options={filters.divisions}
                  styles={customSelectStyles}
                  placeholder="Select Division"
                  isClearable
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleFilterSubmit}
                  className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

 
        {/* Biodatas Display Section */}
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {biodatas.map((biodata) => (
              <div
                key={biodata._id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex space-x-4">
                  <img
                    src={biodata.ProfileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">#{biodata.BiodataId}</h3>
                      <span className="text-sm px-3 py-1 bg-pink-50 text-pink-600 rounded-full font-medium">
                        {biodata.Gender}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4 mr-2" />
                        <span>{biodata.PermanentDivision}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="w-4 h-4 mr-2" />
                        <span>{biodata.Age} years</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FiBriefcase className="w-4 h-4 mr-2" />
                        <span>{biodata.Occupation}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  {/* <div className="flex items-center">
                    <FiEye className="w-4 h-4 mr-1" />
                    <span>{biodata.views} views</span>
                  </div> */}
                <Link to={`/biodataDetails/${biodata._id}`}>
                <button 
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center"
                  >
                    View Profile
                  </button>
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodata;