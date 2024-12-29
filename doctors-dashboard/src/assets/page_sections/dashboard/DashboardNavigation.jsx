import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing FontAwesome search icon

function DashboardNavigation() {
  return (
    <div className='flex justify-between w-full h-[10%] gap-2 bg-white items-center px-1 py-1'>
        <div className='w-full h-full flex flex-col items-start justify-center px-4'>
          <p className="text-[#1a237e] font-bold">Hi, <span className="text-[#82b1ff]">Dr. Bessie</span></p>
          <p className="text-[#1a237e] font-bold">Today is Monday, 20th November 2024</p>
        </div>
        <div className='w-full h-full flex items-center justify-center px-4'>
          <div className="flex items-center w-full h-3/4 bg-[#82b1ff] rounded-lg px-4">
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
        <div className='bg-[#643a3a] w-full h-full flex items-center justify-center'><p>Section 03</p></div>
    </div>
  );
}

export default DashboardNavigation;
