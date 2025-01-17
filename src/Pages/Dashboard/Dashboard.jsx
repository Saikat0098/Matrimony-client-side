import React, { useState } from 'react';
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
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = ({ role = 'admin' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const userMenuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Settings, label: 'Edit Biodata', href: '/dashboard/edit-biodata' },
    { icon: User, label: 'View Biodata', href: '/dashboard/view-biodata' },
    { icon: Phone, label: 'My Contact Request', href: '/dashboard/contact-requests' },
    { icon: Heart, label: 'Favourites Biodata', href: '/dashboard/favorites' }
  ];

  const adminMenuItems = [
    { icon: Home, label: 'Admin Dashboard', href: '/dashboard', active: true },
    { icon: Users, label: 'Manage Users', href: '/dashboard/manage-users' },
    { icon: Shield, label: 'Approve Premium', href: '/dashboard/approve-premium' },
    { icon: MessageCircle, label: 'Approve Contact Requests', href: '/dashboard/approve-contacts' }
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-lg border-r border-purple-100
        transform transition-transform duration-200 ease-in-out shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-purple-100">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Matrimony
            </h1>
            <p className="text-xs text-gray-600">
              {role === 'admin' ? 'Admin Portal' : 'Member Dashboard'}
            </p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) => `
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-purple-50'
                }
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}

          {/* Logout Button */}
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 mt-4">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Navigation */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="search"
                  placeholder="Search profiles..."
                  className="w-full px-10 py-2 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-sm">
                  {role === 'admin' ? 'A' : 'M'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {role === 'admin' ? 'Admin User' : 'Member Name'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
            <p className="mt-1 text-gray-500">Here's your profile overview for today.</p>
          </div>

          {/* Stats Grid */}
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

          {/* Content Area */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-purple-100 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;