import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { FiMapPin, FiCalendar, FiBriefcase, FiFilter, FiX } from 'react-icons/fi';
import useBiodata from '../../Hooks/useBiodata';
import { Link } from 'react-router-dom';

const Biodata = () => {
  // State for filters
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });
  const [biodataType, setBiodataType] = useState(null);
  const [division, setDivision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredBiodatas, setFilteredBiodatas] = useState([]);

  // Fetch biodatas
  const [biodatas, isLoading] = useBiodata();

  // Predefined filter options
  const [filters] = useState({
    divisions: [
      { value: 'dhaka', label: 'Dhaka' },
      { value: 'chattagra', label: 'Chattagra' },
      { value: 'rangpur', label: 'Rangpur' },
      { value: 'barisal', label: 'Barisal' },
      { value: 'khulna', label: 'Khulna' },
      { value: 'mymensingh', label: 'Mymensingh' },
      { value: 'sylhet', label: 'Sylhet' }
    ],
    biodataTypes: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ]
  });

  // Custom select styles
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

  // Filtering logic
  const handleFilterSubmit = () => {
    setLoading(true);
    
    // Apply filters
    const filtered = biodatas.filter(biodata => {
      // Age range filter
      const ageMatch = 
        biodata.Age >= parseInt(ageRange.min) && 
        biodata.Age <= parseInt(ageRange.max);

      // Biodata type filter
      const typeMatch = 
        !biodataType || 
        biodata.Gender.toLowerCase() === biodataType.value;

      // Division filter  
      const divisionMatch = 
        !division || 
        biodata.PermanentDivision.toLowerCase() === division.value;

      return ageMatch && typeMatch && divisionMatch;
    });

    setFilteredBiodatas(filtered);
    setLoading(false);
    setShowFilters(false);
  };

  // Reset filters
  const handleResetFilters = () => {
    setAgeRange({ min: 18, max: 60 });
    setBiodataType(null);
    setDivision(null);
    setFilteredBiodatas([]);
  };

   const displayBiodatas = filteredBiodatas.length > 0 ? filteredBiodatas : biodatas;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

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
              {/* Age Range Filter */}
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

              {/* Biodata Type Filter */}
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

              {/* Division Filter */}
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

              {/* Filter Buttons */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={handleFilterSubmit}
                  className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Biodatas Display Section */}
        <div className="md:w-3/4">
          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Showing {displayBiodatas.length} results
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayBiodatas.map((biodata) => (
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

          {/* No Results Message */}
          {displayBiodatas.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No biodatas match your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Biodata;