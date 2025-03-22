import React from 'react';
import { Bell, Settings, Plus, Search, Calendar, MoreHorizontal } from 'lucide-react';
import { UserButton } from "@clerk/clerk-react";

function DashboardNavigation() {
  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className='flex justify-between w-full items-center px-6 py-4 bg-white border-b border-gray-100 shadow-sm'>
      {/* Left: Doctor greeting and date */}
      <div className='flex items-center gap-3'>
        <div className="flex items-center justify-center w-10 h-10 bg-[#295567]/10 rounded-lg">
          <Calendar size={20} className="text-[#295567]" />
        </div>
        <div className='flex flex-col'>
          <p className="text-gray-900 font-semibold">
            Welcome back, <span className="text-[#295567]">Dr. Bessie</span>
          </p>
          <p className="text-gray-500 text-sm">
            {formattedDate}
          </p>
        </div>
      </div>
      
      {/* Middle: Search */}
      <div className='flex-grow flex justify-center max-w-md mx-8'>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#295567]/20 focus:border-transparent text-sm"
            placeholder="Search for patients, appointments, or medicines..."
          />
        </div>
      </div>
      
      {/* Right: Actions */}
      <div className='flex items-center gap-3'>
        {/* Add new patient button */}
        <button className='flex items-center bg-[#295567] hover:bg-[#295567]/90 text-white px-4 py-2 rounded-lg transition-colors shadow-sm'>
          <span className='mr-2 text-sm font-medium'>New Patient</span>
          <Plus className='w-4 h-4' />
        </button>
        
        {/* Notification bell */}
        <button className='text-gray-600 hover:text-gray-900 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors relative'>
          <Bell className='w-5 h-5' />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Settings */}
        <button className='text-gray-600 hover:text-gray-900 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors'>
          <Settings className='w-5 h-5' />
        </button>
        
        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 mx-1"></div>
        
        {/* User profile button */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default DashboardNavigation;