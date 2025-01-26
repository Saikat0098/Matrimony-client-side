import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search , setSearch] = useState('')
   const { data: users = [], refetch, isLoading ,   } = useQuery({
    
    queryKey: ['users' , search],
    queryFn: async () => {
      const data = await axiosSecure.get(`/users?search=${search}`);
      return data.data;
    },
  });

  const toggleAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`).then((data) => {
      refetch();
  
    });
  };

  const togglePremium = (id) => {
    axiosSecure.patch(`/user/premium/${id}`)
    .then((res) =>{
       
      refetch()
    })
    
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">User Management</h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
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
                  User Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Admin Status
                </th>
                <th className="px-4 md:px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Premium Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => toggleAdmin(user._id)}
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role ? 'Admin' : 'MakeAdmin'}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center space-x-2">
                    <button
                     disabled = {user.PremiumUser}
                        onClick={() => togglePremium(user._id)}
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          user.PremiumUser === 'isPremium'
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.PremiumUser ? 'Premium' : 'Basic'}
                      </button>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                        disabled = {user.PremiumUser}
                          type="checkbox"
                          className="sr-only peer"
                          checked={user.PremiumUser}
                          onChange={() => togglePremium(user._id)}
                        />
                        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
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

export default ManageUsers;
