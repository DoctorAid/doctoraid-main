import React from 'react'
import Navigation from './assets/components/Navigation'

function App() {
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full  px-2 py-2 items-start justify-start text-black'>
      
      <div className='flex justify-between w-full h-[10%] bg-[#93b1ec] items-center px-1 py-1'>
        <div className='bg-[#ed7e7e] w-full h-full'><p>ssssssss</p></div>
        <div className='bg-[#f72626]'><p>ssssssss</p></div>
        <p>ssssssss</p>
      </div>

      <div className='flex justify-around w-full h-[40%] bg-[#93b1ec] items-center'>
        <div className='bg-[#b7f877]'><p>Section 01</p></div>
        <div className='bg-[#3bcf3b]'><p>Section 02</p></div>
       
      </div>

      <div className='flex justify-around w-full h-[60%] bg-[#93b1ec] items-center'>
        <div className='bg-[#FFFF]'><p>Section 01</p></div>
        <div><p>Section 02</p></div>
        <div><p>Section 03</p></div>
       
      </div>
      
      
    </div>
  )
}

export default App
