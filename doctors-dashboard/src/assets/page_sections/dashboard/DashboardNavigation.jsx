import React from 'react';
import { Bell, Settings, Plus, Search } from 'lucide-react';
import { UserButton } from "@clerk/clerk-react";

function DashboardNavigation() {
  return (
    <div className='flex justify-between w-full items-center px-6 py-3 bg-white'>
      {/* Left: Doctor greeting and date */}
      <div className='flex flex-col'>
        <p className="text-gray-800 font-medium">
          Hi, <span className="text-blue-500 font-semibold">Dr. Bessie</span>
        </p>
        <p className="text-gray-800 font-medium">
          Today is Monday, 20th November 2024
        </p>
      </div>
      
      {/* Middle: Search */}
      <div className='flex-grow flex justify-center max-w-md mx-8'>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute inset-y-0 left-12 flex items-center">
            <span className="text-gray-500 text-sm border-r pr-2">
              Search a patient
            </span>
          </div>
          <input
            type="text"
            className="block w-full pl-28 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder=""
          />
        </div>
      </div>
      
      {/* Right: Actions */}
      <div className='flex items-center gap-4'>
        {/* Add new patient button */}
        <button className='flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors'>
          <span className='mr-2 text-sm font-medium'>Add a new patient</span>
          <Plus className='w-4 h-4' />
        </button>
        
        {/* Notification bell */}
        <button className='text-gray-600 hover:text-gray-800'>
          <Bell className='w-6 h-6' />
        </button>
        
        {/* User profile button */}
        <UserButton />
        
        {/* Settings */}
        <button className='text-gray-600 hover:text-gray-800'>
          <Settings className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}

export default DashboardNavigation;