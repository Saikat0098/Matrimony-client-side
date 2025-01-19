import React from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();
  const { data: premiumRequests = [], refetch, isLoading } = useQuery({
    queryKey: ['premium-request-bioData'],
    queryFn: async () => {
      const data = await axiosSecure.get('/premium-request-bioData');
      return data.data;
    },
  });

  const handleMakePremium = async (email , prefStatus , status ) => {
      console.log(email , prefStatus , status);
      axiosSecure.patch(`/premium-bioData-update/${email}` , {status})
      .then(res =>{
        console.log(res.data.data);
        refetch()
      })
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Premium Approval Requests
        </h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests..."
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
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Biodata ID
                </th>
                <th className="px-4 md:px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {premiumRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.Name}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {request.email}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {request.BiodataId}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={() => handleMakePremium(request.email ,
                        request.status ,  'approved' )}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                        request.status === 'approved'
                          ?`  bg-green-100 text-green-800 cursor-not-allowed`
                          : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                      }`}
                      disabled={request.isPremium}
                    >
                      {request.isPremium ? 'Already Premium' : 'Make Premium'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {premiumRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No premium requests found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovedPremium;