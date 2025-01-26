import React from 'react';
import { 
  FaUserFriends, 
  FaMale, 
  FaFemale, 
  FaCrown 
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
const AdminDashboard = () => {
 const axiosSecure = useAxiosSecure()
 
  const {data : AdminStats = [] , refetch} = useQuery({
    queryKey : ['admin-stats'] , 
    queryFn : async()=>{
        const res = await axiosSecure.get('/admin-stats')
        return res.data
    }
  })


    const stats = [
      {
        title: 'Total Bio Data',
        value:  AdminStats.totalBioData ,
        trend: '+15.3%',
        icon: FaUserFriends,
        color: '#6366F1'
      },
      {
        title: 'Total Male Data',
        value:  AdminStats.totalMale,
        trend: '+12.7%', 
        icon: FaMale,
        color: '#3B82F6'
      },
      {
        title: 'Total Female Data',
        value:  AdminStats.totalFemale,
        trend: '+18.2%',
        icon: FaFemale, 
        color: '#EC4899'
      },
      {
        title: 'Total Premium Users',
        value:  AdminStats.PremiumBioData,
        trend: '+22.5%',
        icon: FaCrown,
        color: '#F59E0B'
      }
    ];
    return (
        <div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-purple-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                    <p className="text-sm text-green-500 mt-1">{stat.trend}</p>
                  </div>
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default AdminDashboard;