import React from 'react';
import { Bell, Settings, Plus } from 'lucide-react'; // importing bell icon, setting icon and plus icon from luicde react
import { FaSearch } from 'react-icons/fa'; // Importing FontAwesome search icon

function DashboardNavigation() {
  return (
    <div className='flex justify-between w-full h-[10%] gap-2 bg-white items-center px-6 py-3'>
        <div className='flex flex-col justify-center'>
          <p className="text-[#1a237e] font-bold">Hi, <span className="text-[#82b1ff]">Dr. Bessie</span></p>
          <p className="text-[#1a237e] font-bold">Today is Monday, 20th November 2024</p>
        </div>
        <div className='flex-grow flex items-center justify-center mx-6'>
          <div className="flex items-center w-full max-w-md h-10 bg-[#82b1ff] rounded-lg px-4 shadow-md">
            <div className="flex flex-col justify-center items-end gap-[2px]">
              <div className="w-5 h-[2px] bg-black"></div>
              <div className="w-5 h-[2px] bg-black"></div>
              <div className="w-5 h-[2px] bg-black"></div>
            </div>
            <input 
              type="text" 
              className="w-full bg-transparent text-black text-sm focus:outline-none placeholder-black px-2" 
              placeholder="Search a patient" 
            />
            <FaSearch className="text-black text-sm ml-2" />
          </div>
        </div>
        <div className='flex items-center gap-4'>
          {/* adding a new patient*/}
          <button className='flex items-center bg-[#5c9df6] text-white px-4 py-2 rounded-full hover:bg-[#4a8be1] focus:outline-none focus:ring-2 focus:ring-[#5c9df6]/50 shadow-md'>
            <span className='text-sm font-semibold mr2'>Add a new Patient</span>
            <Plus className='w-5 h-5'/>
          </button>

          {/* Bell icon */}
          <button className='p-2 text-gray-600 hover:text-gray-800 focus:outline-none'>
            <Bell className='w-6 h-6'/>
          </button>

          {/* Settings icon */}
          <button className='p-2 text-gray-600 hover:text-gray-800 focus:outline-none'>
            <Settings className='w-6 h-6'/>
          </button>
        </div>

    </div>
  );
}

export default DashboardNavigation;
