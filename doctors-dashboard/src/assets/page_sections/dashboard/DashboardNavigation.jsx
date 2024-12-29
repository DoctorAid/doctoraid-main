import React from 'react';

function DashboardNavigation(){
  return(
    <div className='flex justify-between w-full h-[10%] gap-2 bg bg-white items-center px-1 py-1'>
      <div className='w-full h-full flex flex-col items-start justify-center px-4'>
        <p className="text-[#1a237e] font-bold">Hi, <span className="text-[#82b1ff]">Dr.Bessie</span></p>
      </div>

      <div className='bg-[#f72626] w-full h-full flex items-center justify-center'>
        <p className="text-[#1a237e] font-bold">Section 02</p>
      </div>

      <div className='bg-[#643a3a] w-full h-full flex items-center justify-center'>
        <p className="text-[#1a237e] font-bold">Section 03</p>
      </div>
    </div>
  );
}

export default DashboardNavigation