import { LogOut } from 'lucide-react';
import React from 'react'
import NavigationTabs from './NavigationTabs';

function Navigation() {
  return (
    <div>
      <div className="flex flex-col w-[266px] h-[860px] py-8 gap-20 bg-[#295567] rounded-[30px]">
        
        <div className='flex flex-col items-center justify-center'>
          <div className="flex items-center absolute">
            <img src="/Images/logo.png" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className='flex flex-col gap-2 justify-center items-center'>
          <div className="w-[179px] h-[179px] bg-[#c4c4c4] rounded-full" />
          <div className='font-semibold text-yellow-50'>
            <p>Dr.Blah Blah</p>
          </div>
        </div>

        <NavigationTabs/>

        <div className='flex items-center text-white justify-center'>
          <div className='flex justify-between gap-2 cursor-pointer'>
            <LogOut/>
            Log Out
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navigation
