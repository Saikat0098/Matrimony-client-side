import React from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ApprovedContactRequests = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      biodataId: "BIO001",
      status: "Approved"
    }
  ]);
const axiosSecure = useAxiosSecure()
  const {data : contactRequest = []} = useQuery({
    queryKey : ['contactRequest'] , 
    queryFn : async()=>{
        const res = await axiosSecure.get('/request-user-info')
        return res.data
    }
  })

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Approved Contact Requests</h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contactRequest.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.Name}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {contact.ContactEmail}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {contact.BiodataId}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex items-center justify-center">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {contact.status}
                      </span>
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

export default ApprovedContactRequests;