import React from 'react';
import { FaSearch } from 'react-icons/fa';

function DashboardNavigation(){
  return(
    <div className='flex justify-between w-full h-[10%] gap-2 bg bg-white items-center px-1 py-1'>
      <div className='w-full h-full flex flex-col items-start justify-center px-4'>
        <p className="text-[#1a237e] font-bold">Hi, <span className="text-[#82b1ff]">Dr.Bessie</span></p>
        <p className="text-[#1a237e] font-bold">Today is Monday, 20th November 2024</p>
      </div>

      <div className='w-full h-full flex items-center justify-center px-4'>
        <div className="flex items-center w-full h-3/4 bg-[#82b1ff] rounded-lg px-4">
          <FaSearch className="text-white text-sm mr-2"/>
          <input type="text" className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white" placeholder="Search a patient"></input>
          <div className="flex flex-col justify-center items-end gap-[2px]">
            <div className="w-6 h-[2px] bg-white"></div>
            <div className="w-4 h-[2px] bg-white"></div>
            <div className="w-2 h-[2px] bg-white"></div>
          </div>
        </div>
      </div>

      <div className='bg-[#643a3a] w-full h-full flex items-center justify-center'><p>Section 03</p></div>
    </div>
  );
}

export default DashboardNavigation