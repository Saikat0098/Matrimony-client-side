import React from 'react';
import {
  FaUserFriends,
  FaMale,
  FaFemale,
  FaCrown
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: AdminStats = [], refetch } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  });

  const stats = [
    {
      title: 'Total Bio Data',
      value: AdminStats.totalBioData,
      trend: '+15.3%',
      icon: FaUserFriends,
      color: '#6366F1'
    },
    {
      title: 'Total Male Data',
      value: AdminStats.totalMale,
      trend: '+12.7%',
      icon: FaMale,
      color: '#3B82F6'
    },
    {
      title: 'Total Female Data',
      value: AdminStats.totalFemale,
      trend: '+18.2%',
      icon: FaFemale,
      color: '#EC4899'
    },
    {
      title: 'Total Premium Users',
      value: AdminStats.PremiumBioData,
      trend: '+22.5%',
      icon: FaCrown,
      color: '#F59E0B'
    }
  ];

  const data = [
    { name: 'Total Bio Data', value: AdminStats.totalBioData || 0 },
    { name: 'Total Male', value: AdminStats.totalMale || 0 },
    { name: 'Total Female', value: AdminStats.totalFemale || 0 },
    { name: 'Premium Bio Data', value: AdminStats.PremiumBioData || 0 },
    { name: 'Total Revenue', value: AdminStats.totalRevenue || 0 }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-sm border border-purple-100"
          >
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
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;