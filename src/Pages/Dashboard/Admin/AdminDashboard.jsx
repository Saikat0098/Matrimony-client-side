import React from 'react';
import {
  Home,
  User,
  Heart,
  Phone,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Users,
  Shield,
  MessageCircle
} from 'lucide-react';
const AdminDashboard = () => {
    const stats = [
        {
          title: 'Total Views',
          value: '2,847',
          trend: '+12.5%',
          icon: Users,
          color: '#9333EA'
        },
        {
          title: 'Contact Requests',
          value: '45',
          trend: '+3.2%',
          icon: MessageCircle,
          color: '#EC4899'
        },
        {
          title: 'Matches',
          value: '128',
          trend: '+8.1%',
          icon: Heart,
          color: '#EF4444'
        }
      ];
    return (
        <div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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