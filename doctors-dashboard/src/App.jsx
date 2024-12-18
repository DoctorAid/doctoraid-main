import React from 'react'
import DashboardNavigation from './assets/page_sections/dashboard/DashboardNavigation'

function App() {
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full  px-2 py-2 items-start justify-start text-black'>
      
      <DashboardNavigation/>

      <div className='flex justify-around gap-2 w-full h-[40%] bg-[#93b1ec] items-center px-1 py-1'>
        <div className='bg-[#b7f877] w-full h-full'><p>Section 01</p></div>
        <div className='bg-[#3bcf3b] w-full h-full'><p>Section 02</p></div>
       
      </div>

      <div className='flex justify-around gap-2 w-full h-[60%] bg-[#93b1ec] items-center px-1 py-1'>
        <div className='bg-[#2e38f8] w-full h-full'><p>Section 01</p></div>
        <div className='bg-[#7da4f2] w-full h-full'><p>Section 02</p></div>
        <div className='bg-[#2761a8] w-full h-full'><p>Section 03</p></div>
       
      </div>
      
      
    </div>
  )
}

export default App
