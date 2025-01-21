import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const MyFavorite = () => {
 
  const [search, setSearch] = useState('');
  
const {user} = useAuth()
const axiosSecure = useAxiosSecure()
  const {data : favoritePerson = [] , isLoading , refetch} = useQuery({
    queryKey : [ user?.email , 'favoritePerson'] , 
    queryFn: async() =>{
      const res = await axiosSecure.get(`/my-favorite-person/${user?.email}`) ; 
      console.log(res.data);
      return res.data
    }
  })
console.log('favoritePerson' , favoritePerson);
  // Filter favorites based on search term
  const filteredFavorites = favoritePerson.filter(favorite =>
    favorite.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async(id) => {
    const res = await axiosSecure.delete(`/my-favorite-delete/${id}`) 
    console.log(res.data);
    if(res.data.deletedCount){
        refetch()
        toast.success('my favorite person delete 😢')
    }
   
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">My Favourites Biodata</h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Table Section */
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Biodata ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Permanent Address
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Occupation
                </th>
                <th className="px-4 md:px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFavorites.map((favorite) => (
                <tr key={favorite._id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {favorite.name}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {favorite.bioDataId}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {favorite.address}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {favorite.occupation}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={() => handleDelete(favorite._id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavorite;